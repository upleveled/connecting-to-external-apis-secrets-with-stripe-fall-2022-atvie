import { headers } from 'next/headers';
import { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { stripeClient } from '../../../util/stripe';

export type StripeSession = Stripe.Checkout.Session & { url: string };

export type SessionsResponseBody =
  | { session: StripeSession }
  | { error: string };

type RequestBody = {
  priceId: string;
  mode: 'subscription' | 'payment';
  quantity: number;
};

export async function POST(request: NextRequest) {
  const host = headers().get('host');

  const body: RequestBody = await request.json();

  try {
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: body.mode,
      line_items: [{ price: body.priceId, quantity: body.quantity }],
      success_url: `http://${host}/success?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://${host}/canceled`,
    });

    if (!session.url) {
      return new Response(JSON.stringify({ error: 'Invalid Session URL' }), {
        status: 400,
      });
    }

    return new Response(
      JSON.stringify({ session: { ...session, url: session.url } }),
    );
  } catch (err) {
    const error = err as Stripe.errors.StripeAPIError;
    return new Response(JSON.stringify({ error: error.message }), {
      status: 200,
    });
  }
}
