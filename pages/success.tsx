import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import Stripe from 'stripe';

type Props = { session: Stripe.Checkout.Session };

export default function Success(props: Props) {
  return (
    <section>
      <h1>Successful Transaction</h1>
      <div>
        <p>
          <span>Id:</span>
          {'   '}
          {props.session.id}
        </p>
        <p>
          <span> Transaction total:</span> {'   '}
          {props.session.amount_total}
        </p>
        <p>
          <span> Customer email:</span> {'   '}
          {props.session.customer_details?.email || 'No email provided'}
        </p>
        <p>
          <span> Payment status:</span> {'   '}
          {props.session.payment_status}
        </p>
      </div>
      <Link href="/">
        <a>home</a>
      </Link>
    </section>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Use SDK to connect to stripe using my SECRET
  const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-08-01',
  });
  const { session_id: sessionId } = context.query;

  const session = await stripeClient.checkout.sessions.retrieve(
    sessionId as string,
  );

  return { props: { session } };
}
