// add api code here
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { stripeClient } from '../../utils/client';

export type StripeSession = Stripe.Checkout.Session & { url: string };
export type EndpointResponse = { session: StripeSession } | { error: string };

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<EndpointResponse>,
) {
  if (request.method !== 'POST') {
    return response.status(400).json({ error: 'Method not Allowed' });
  }

  // Url to return on payment success
  const successUrl = `http://${request.headers.host}/success`;
  // Url to return on payment cancel
  const cancelUrl = `http://${request.headers.host}/canceled`;

  // get the data from the body of the request
  try {
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: request.body.mode,
      line_items: [
        { price: request.body.priceId, quantity: request.body.quantity },
      ],
      success_url: successUrl + '?sessionId={CHECKOUT_SESSION_ID}',
      cancel_url: cancelUrl,
    });

    if (!session.url) {
      return response.status(400).json({ error: 'Invalid Session URL' });
    }

    response.status(200).json({ session: { ...session, url: session.url } });
  } catch (err) {
    const error = err as Stripe.errors.StripeAPIError;
    return response.status(400).json({ error: error.message });
  }
}
