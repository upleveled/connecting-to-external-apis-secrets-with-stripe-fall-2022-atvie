'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Stripe from 'stripe';
import { EndpointResponse, StripeSession } from '../pages/api/sessions';
import { Counter } from './Counter';

type Product = {
  price: Stripe.Price;
  product: Stripe.Product;
};

type Props = {
  tablet: string;
  magazine: string;
};

export default function Products(props: Props) {
  const tablet: Product = JSON.parse(props.tablet);
  const magazine: Product = JSON.parse(props.magazine);

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

    console.log(data.session.url);
    router.push(data.session.url);
  }

  return (
    <div className="productContainer">
      {error && <strong className="error">{error.error}</strong>}
      <div className="product">
        <h1>Nice Product</h1>
        <img
          alt="Random asset from Picsum"
          src={tablet.product.images[0] || '/images/no-image.png'}
        />
        <p>{tablet.product.description}</p>
        <Counter count={productQuantity} setCount={setProductQuantity} />
        <button
          onClick={() =>
            clickHandler(productQuantity, tablet.price.id, 'payment')
          }
        >
          Buy for ${(tablet.price.unit_amount! / 100) * productQuantity}
        </button>
      </div>

      <div className="product">
        <h1>Subscription Plan</h1>
        <img
          alt="magazine"
          src={magazine.product.images[0] || '/images/no-image.png'}
        />
        <p>{magazine.product.description}</p>
        <button
          onClick={() => clickHandler(1, magazine.price.id, 'subscription')}
        >
          Buy for ${magazine.price.unit_amount! / 100}
        </button>
      </div>
    </div>
  );
}
