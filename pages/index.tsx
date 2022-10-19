import { useRouter } from 'next/router';
import { useState } from 'react';
import Stripe from 'stripe';
import { Counter } from '../components/Counter';
import { EndpointResponse, StripeSession } from './api/sessions';

type Product = {
  price: Stripe.Price;
  product: Stripe.Product;
};

type Props = {
  tablet: Product;
  magazine: Product;
};
export default function Home(props: Props) {
  const [productQuantity, setProductQuantity] = useState(1);
  const [error, setError] = useState<{ error: string }>();
  const router = useRouter();

  async function clickHandler(
    quantity: number,
    priceId: Stripe.Price['id'],
    mode: StripeSession['mode'],
  ) {
    const response = await fetch('/api/sessions', {
      method: 'POST',
      headers: {
        'content-type': ' application/json',
      },
      body: JSON.stringify({
        quantity: quantity,
        priceId: priceId,
        mode: mode,
      }),
    });

    const data: EndpointResponse = await response.json();

    if ('error' in data) {
      return setError(data);
    }

    if (!data.session.url) {
      return setError({ error: 'Checkout URL not found' });
    }

    if (!data.session.url) {
      return setError({ error: 'Checkout Session Creation Failed' });
    }

    router.push(data.session.url);
  }

  return (
    <div className="productContainer">
      {error && <strong className="error">{error.error}</strong>}
      <div className="product">
        <h1>Nice Product</h1>
        <img
          alt="Random asset from Picsum"
          src={props.tablet.product.images[0] || '/images/no-image.png'}
        />
        <p>{props.tablet.product.description}</p>
        <Counter count={productQuantity} setCount={setProductQuantity} />
        <button
          onClick={() =>
            clickHandler(productQuantity, props.tablet.price.id, 'payment')
          }
        >
          Buy for ${(props.tablet.price.unit_amount! / 100) * productQuantity}
        </button>
      </div>

      <div className="product">
        <h1>Subscription Plan</h1>
        <img
          alt="magazine"
          src={props.magazine.product.images[0] || '/images/no-image.png'}
        />
        <p>{props.magazine.product.description}</p>
        <button
          onClick={() =>
            clickHandler(1, props.magazine.price.id, 'subscription')
          }
        >
          Buy for ${props.magazine.price.unit_amount! / 100}
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
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

  return {
    props: {
      tablet: {
        price: tabletPrice,
        product: tablet,
      },
      magazine: {
        price: magazinePrice,
        product: magazine,
      },
    },
  };
}
