import { stripeClient } from '../utils/client';
import Products from './Products';

export const metadata = { description: 'Products Page' };

export default async function HomePage() {
  const tablet = await stripeClient.products.retrieve(process.env.TABLET_ID!);
  const magazine = await stripeClient.products.retrieve(
    process.env.MAGAZINE_ID!,
  );

  const tabletPrice = await stripeClient.prices.retrieve(
    tablet.default_price as string,
  );
  const magazinePrice = await stripeClient.prices.retrieve(
    magazine.default_price as string,
  );

  if (!tabletPrice.unit_amount || !magazinePrice.unit_amount) {
    throw new Error('Invalid Product Price');
  }

  return (
    <Products
      tablet={{
        price: {
          id: tabletPrice.id,
          type: tabletPrice.type,
          unitAmount: tabletPrice.unit_amount,
        },
        images: tablet.images,
        description: tablet.description,
      }}
      magazine={{
        price: {
          id: magazinePrice.id,
          type: magazinePrice.type,
          unitAmount: magazinePrice.unit_amount,
        },
        images: magazine.images,
        description: magazine.description,
      }}
    />
  );
}
