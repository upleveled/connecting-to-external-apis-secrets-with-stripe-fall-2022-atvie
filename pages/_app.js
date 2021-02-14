import { Header } from '../components/Header';
import { globalStyles } from '../shared/globalStyles';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {globalStyles}
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
