import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { globalStyles } from '../shared/globalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyles} />
      <Head>
        <title>UpLeveled - stripe</title>
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <header>
        <img src="/images/logo.svg" alt="UpLeveled" />
      </header>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
