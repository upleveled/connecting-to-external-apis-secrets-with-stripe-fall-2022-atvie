// add api code here
import stripe from 'stripe';

// 1. connect with stripe
// auth with stripe
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(request, response) {
  console.log(request.method);

  if (request.method !== 'POST') {
    return response.status(400).json({ error: 'METHOD NOT ALLOWED' });
  }

  // Url to return on payment success
  const successUrl = `http://${request.headers.host}/success`;
  // Url to return on payment cancel
  const cancelUrl = `http://${request.headers.host}/canceled`;

  // get the data from the body of the request
  console.log('from api/sessions', request.body);

  const session = await stripeClient.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: request.body.mode,
    line_items: [
      { price: request.body.priceId, quantity: request.body.quantity },
    ],
    success_url: successUrl + '?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: cancelUrl,
  });

  console.log(session);

  response.status(200).json({ session: session });
}
