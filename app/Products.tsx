'use client';
import Image from 'next/image';
import { useState } from 'react';
import Stripe from 'stripe';
import { SessionsResponseBody } from './api/sessions/route';
import styles from './Products.module.scss';

type Product = {
  price: Pick<Stripe.Price, 'id' | 'type' | 'unit_amount'> | null;
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

  async function createSession(price: Product['price'], quantity: number = 1) {
    if (!price) return;

    const response = await fetch('/api/sessions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        priceId: price.id,
        mode: price.type === 'recurring' ? 'subscription' : 'payment',
        quantity: quantity,
      }),
    });

    const data: SessionsResponseBody = await response.json();

    if ('error' in data) {
      return setError(data.error);
    }

    document.location.href = data.session.url;
  }

  if (!props.tablet.price || !props.magazine.price) {
    return (
      <strong className={styles.error}>
        All products must have a valid price
      </strong>
    );
  }

  if (error) return <strong className={styles.error}>{error}</strong>;

  return (
    <div className={styles.productContainer}>
      <div className={styles.product}>
        <h1>Nice Tablet</h1>
        <Image
          alt="Tablet"
          src={props.tablet.images[0] || '/images/no-image.png'}
          width={100}
          height={100}
        />
        <p>{props.tablet.description}</p>
        <div>
          <button
            className={styles.counterButton}
            onClick={() => {
              setProductQuantity(
                productQuantity <= 1 ? 1 : productQuantity - 1,
              );
            }}
          >
            -
          </button>
          <span className={styles.counterSpan}>{productQuantity}</span>
          <button
            className={styles.counterButton}
            onClick={() => {
              setProductQuantity(productQuantity + 1);
            }}
          >
            +
          </button>
        </div>
        {props.tablet.price.unit_amount ? (
          <button
            onClick={async () =>
              await createSession(props.tablet.price, productQuantity)
            }
          >
            Buy for ${(props.tablet.price.unit_amount / 100) * productQuantity}
          </button>
        ) : (
          'out of stock'
        )}
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
        {props.magazine.price.unit_amount ? (
          <button
            onClick={async () =>
              await createSession(props.tablet.price, productQuantity)
            }
          >
            Buy for $
            {(props.magazine.price.unit_amount / 100) * productQuantity}
          </button>
        ) : (
          'out of stock'
        )}
      </div>
    </div>
  );
}
