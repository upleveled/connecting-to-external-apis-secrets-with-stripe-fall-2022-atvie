import { loadStripe } from '@stripe/stripe-js';
import { Product } from '../components/Product';
import { Subscription } from '../components/Subscription';

export default function Home(props) {
  const stripeLoader = loadStripe(props.publicKey);

  async function handleClick(mode, priceID, quantity = 1) {
    const stripeClient = await stripeLoader;

    const { sessionId } = await fetch('api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity,
        mode,
        priceID,
      }),
    }).then((res) => res.json());

    stripeClient.redirectToCheckout({
      sessionId,
    });
  }

  return (
    <div>
      <Product
        clickHandler={handleClick}
        productPrice={props.productPrices[0]}
      />
      <Subscription
        clickHandler={handleClick}
        productPrice={props.productPrices[1]}
      />
    </div>
  );
}

export async function getServerSideProps() {
  const Stripe = require('stripe');
  const stripeServer = new Stripe(process.env.STRIPE_SECRET_KEY);

  const price = await stripeServer.prices.retrieve(process.env.PRICE);
  const price2 = await stripeServer.prices.retrieve(process.env.PRICE2);
  const publicKey = process.env.STRIPE_PUBLISHABLE_KEY;

  return {
    props: {
      publicKey,
      productPrices: [
        {
          priceId: 'PRICE',
          unitAmount: price.unit_amount,
          currency: price.currency,
        },
        {
          priceId: 'PRICE2',
          unitAmount: price2.unit_amount,
          currency: price2.currency,
        },
      ],
    },
  };
}
