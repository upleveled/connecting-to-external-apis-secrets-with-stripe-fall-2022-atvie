import Link from 'next/link';
import styles from './page.module.scss';

export const metadata = { title: 'Canceled', description: 'Canceled Page' };

export default function CanceledPage() {
  return (
    <section className={styles.error}>
      <h1>Failed Transaction</h1>
      <Link href="/">home</Link>
    </section>
  );
}
