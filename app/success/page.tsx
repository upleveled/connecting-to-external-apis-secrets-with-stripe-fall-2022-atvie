import Link from 'next/link';
import Stripe from 'stripe';

export default async function Success(props) {
  const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-08-01',
  });
  const { session_id: sessionId } = props.params.sessionId;

  const session = await stripeClient.checkout.sessions.retrieve(
    sessionId as string,
  );

  return (
    <section>
      <h1>Successful Transaction</h1>
      <div>
        <p>
          <span>Id:</span>
          {'   '}
          {session.id}
        </p>
        <p>
          <span> Transaction total:</span> {'   '}
          {session.amount_total}
        </p>
        <p>
          <span> Customer email:</span> {'   '}
          {session.customer_details?.email || 'No email provided'}
        </p>
        <p>
          <span> Payment status:</span> {'   '}
          {session.payment_status}
        </p>
      </div>
      <Link href="/">
        <a>home</a>
      </Link>
    </section>
  );
}
