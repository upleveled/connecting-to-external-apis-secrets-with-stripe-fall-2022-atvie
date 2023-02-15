import { stripeClient } from '../util/stripe';
import Products from './Products';

export const metadata = { description: 'Products Page' };

export default async function HomePage() {
  const magazine = await stripeClient.products.retrieve(
    process.env.MAGAZINE_ID!,
    {
      expand: ['default_price'],
    },
  );

  const tablet = await stripeClient.products.retrieve(process.env.TABLET_ID!, {
    expand: ['default_price'],
  });

  return (
    <Products
      tablet={{
        price:
          tablet.default_price instanceof Object
            ? {
                id: tablet.default_price.id,
                type: tablet.default_price.type,
                unit_amount: tablet.default_price.unit_amount,
              }
            : null,
        images: tablet.images,
        description: tablet.description,
      }}
      magazine={{
        price:
          magazine.default_price instanceof Object
            ? {
                id: magazine.default_price.id,
                type: magazine.default_price.type,
                unit_amount: magazine.default_price.unit_amount,
              }
            : null,
        images: magazine.images,
        description: magazine.description,
      }}
    />
  );
}
