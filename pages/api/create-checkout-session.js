import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export default async function handler(req, res) {
  if (req.method === 'POST') {
  const domainURL = "http://localhost:3000";

  const { quantity, locale } = req.body;

  const pmTypes = ["card"]

  const session = await stripe.checkout.sessions.create({
    payment_method_types: pmTypes,
    mode: 'payment',
    locale: locale,
    line_items: [
      {
        price: process.env.PRICE,
        quantity: quantity,
      },
    ],
    // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
    success_url: `${domainURL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainURL}/canceled`,
  });

  res.send({
    sessionId: session.id,
  })} else{
    res.send({
      error: "Method need to be POST",
    });
  }
}
