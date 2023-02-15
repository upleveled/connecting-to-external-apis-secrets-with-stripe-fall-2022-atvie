import Stripe from 'stripe';

// Use SDK to connect to stripe using my SECRET
export const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});
