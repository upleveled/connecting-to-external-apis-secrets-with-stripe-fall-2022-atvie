import { loadStripe } from '@stripe/stripe-js';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [publicIdKey, setPublicIdKey] = useState();
  const [stripe, setStripe] = useState();
  const [itemQuantity, setItemQuantity] = useState(1);

  async function configStripe() {
    const configuredStripe = await loadStripe(publicIdKey);
    console.log(configuredStripe);
    setStripe(configuredStripe);
  }

  async function handleClick() {
    const { sessionId } = await fetch('api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity: itemQuantity,
      }),
    }).then((res) => res.json());

    stripe.redirectToCheckout({
      sessionId,
    });
  }

  useEffect(() => {
    async function fetchId() {
      const { publicKey } = await fetch('/api').then((res) => res.json());

      setPublicIdKey(publicKey);
    }
    fetchId();
  }, []);

  if (!publicIdKey?.length) return <div>loading...</div>;

  if (!stripe) {
    configStripe();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Stripe Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <input
        type="number"
        value={itemQuantity}
        onChange={(e) => setItemQuantity(e.currentTarget.value)}
      />
      <h1 className={styles.title}>This is a test</h1>
      <button onClick={handleClick}>checkout</button>
    </div>
  );
}
