import Link from 'next/link';

export default function Success(props) {
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
          {props.session.customer_details.email}
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

export async function getServerSideProps(ctx) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const Stripe = require('stripe');
  const stripeServer = new Stripe(process.env.STRIPE_SECRET_KEY);

  const { session_id: sessionId } = ctx.query;
  const session = await stripeServer.checkout.sessions.retrieve(sessionId);

  return { props: { session } };
}
