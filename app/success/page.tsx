import Link from 'next/link';
import { redirect } from 'next/navigation';
import { stripeClient } from '../../util/stripe';

type Props = {
  searchParams: { sessionId: string };
};

export const metadata = { title: 'Success', description: 'Success Page' };

export default async function SuccessPage({ searchParams }: Props) {
  let session;
  try {
    session = await stripeClient.checkout.sessions.retrieve(
      searchParams.sessionId,
    );
  } catch {
    redirect('/');
  }

  return (
    <section>
      <h1>Successful Transaction</h1>
      <div>
        <p>
          <span> Id: </span>

          {session.id}
        </p>
        <p>
          <span> Transaction Total: </span>
          {session.amount_total}
        </p>
        <p>
          <span> Customer Email: </span>
          {session.customer_details?.email || 'No email provided'}
        </p>
        <p>
          <span> Payment status: </span>
          {session.payment_status}
        </p>
      </div>
      <Link href="/">home</Link>
    </section>
  );
}
