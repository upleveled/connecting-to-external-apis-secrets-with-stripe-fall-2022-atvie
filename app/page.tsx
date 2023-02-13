import Stripe from 'stripe';
import Products from './Products';

export const metadata = { title: 'upleveled' };

export default async function HomePage() {
  // Use SDK to connect to stripe using my SECRET
  const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-08-01',
  });
  // const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

  const tablet = await stripeClient.products.retrieve(process.env.TABLET_ID!);

  const tabletPrice = await stripeClient.prices.retrieve(
    tablet.default_price as string,
  );

  const magazine = await stripeClient.products.retrieve(
    process.env.MAGAZINE_ID!,
  );
  const magazinePrice = await stripeClient.prices.retrieve(
    magazine.default_price as string,
  );

  return (
    <Products
      tablet={JSON.stringify({
        price: tabletPrice,
        product: tablet,
      })}
      magazine={JSON.stringify({
        price: magazinePrice,
        product: magazine,
      })}
    />
  );
}
