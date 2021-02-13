import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Success(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Stripe Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>This is a success test</h1>
      <div>{JSON.stringify(props.session, null, 4)}</div>
      <Link href="/">
        <a>home</a>
      </Link>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const Stripe = require('stripe');
  const stripeServer = new Stripe(process.env.STRIPE_SECRET_KEY);

  const { session_id: sessionId } = ctx.query;
  const session = await stripeServer.checkout.sessions.retrieve(sessionId);

  return { props: { session } };
}
