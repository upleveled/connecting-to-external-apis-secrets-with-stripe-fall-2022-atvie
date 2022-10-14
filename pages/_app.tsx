import type { AppProps } from 'next/app';
import { globalStyles } from '../shared/globalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {globalStyles}
      <header>
        <img src="/images/logo.svg" alt="UpLeveled" />
      </header>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
