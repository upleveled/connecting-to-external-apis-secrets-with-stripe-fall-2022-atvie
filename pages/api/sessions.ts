// add api code here
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

export type StripeSession = Stripe.Checkout.Session;
export type EndpointResponse = { session: StripeSession } | { error: string };

// 1. connect with stripe
// auth with stripe
const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-08-01',
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<EndpointResponse>,
) {
  if (request.method !== 'POST') {
    return response.status(400).json({ error: 'Method not Allowed' });
  }

  // Url to return on payment success
  const successUrl = `https://${request.headers.host}/success`;
  // Url to return on payment cancel
  const cancelUrl = `https://${request.headers.host}/canceled`;

  // get the data from the body of the request
  try {
    const session: StripeSession = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: request.body.mode,
      line_items: [
        { price: request.body.priceId, quantity: request.body.quantity },
      ],
      success_url: successUrl + '?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: cancelUrl,
    });
    response.status(200).json({ session: session });
  } catch (err) {
    const error = err as Stripe.errors.StripeAPIError;
    return response.status(400).json({ error: error.message });
  }
}
