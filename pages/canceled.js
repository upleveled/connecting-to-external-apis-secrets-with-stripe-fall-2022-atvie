import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Canceled() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Stripe Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>This is a canceled test</h1>
    </div>
  );
}
