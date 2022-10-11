import { globalStyles } from '../shared/globalStyles';

function MyApp({ Component, pageProps }) {
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
