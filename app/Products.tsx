'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Stripe from 'stripe';
import { EndpointResponse } from '../pages/api/sessions';
import { Counter } from './Counter';
import styles from './Products.module.scss';

type Product = {
  price: Pick<Stripe.Price, 'id' | 'type'> & { unitAmount: number };
  images: Stripe.Product['images'];
  description: Stripe.Product['description'];
};

type Props = {
  tablet: Product;
  magazine: Product;
};

export default function Products(props: Props) {
  const [productQuantity, setProductQuantity] = useState(1);
  const [error, setError] = useState<string>();
  const router = useRouter();

  async function createSession(price: Product['price'], quantity: number = 1) {
    const response = await fetch('/api/sessions', {
      method: 'POST',
      headers: {
        'content-type': ' application/json',
      },
      body: JSON.stringify({
        priceId: price.id,
        mode: price.type === 'recurring' ? 'subscription' : 'payment',
        quantity: quantity,
      }),
    });

    const data: EndpointResponse = await response.json();

    if ('error' in data) {
      return setError(data.error);
    }

    router.push(data.session.url);
  }

  return (
    <div className={styles.productContainer}>
      {error && <strong className={styles.error}>{error}</strong>}
      <div className={styles.product}>
        <h1>Nice Tablet</h1>
        <Image
          alt="Tablet"
          src={props.tablet.images[0] || '/images/no-image.png'}
          width={100}
          height={100}
        />
        <p>{props.tablet.description}</p>
        <Counter count={productQuantity} setCount={setProductQuantity} />
        <button
          onClick={async () =>
            await createSession(props.tablet.price, productQuantity)
          }
        >
          Buy for ${(props.tablet.price.unitAmount / 100) * productQuantity}
        </button>
      </div>

      <div className={styles.product}>
        <h1>Subscription Plan</h1>
        <Image
          alt="magazine"
          src={props.magazine.images[0] || '/images/no-image.png'}
          width={100}
          height={100}
        />
        <p>{props.magazine.description}</p>
        <button onClick={async () => await createSession(props.magazine.price)}>
          Buy for ${props.magazine.price.unitAmount / 100}
        </button>
      </div>
    </div>
  );
}
