import { useState } from 'react';
import { Counter } from '../components/Counter';

export default function Home(props) {
  const [productQuantity, setProductQuantity] = useState(1);

  return (
    <div>
      <div>
        <h1>Nice Product</h1>
        <p>
          This is a one time payment <span>product</span>.
        </p>
        <div>
          <img
            alt="Random asset from Picsum"
            src={props.image || '/images/no-image.png'}
          />
          <Counter count={productQuantity} setCount={setProductQuantity} />
        </div>
        {/* fix this */}
        <button>Buy for XX - FIX ME</button>
      </div>
      <div>
        <h1>Subscription Plan</h1>
        <p>
          This is a recurring payment <span>product</span>.
        </p>
        <img alt="magazine" src={props.image || '/images/no-image.png'} />
        {/* fix this */}
        <button>Buy for XX - FIX ME</button>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const stripe = await import('stripe');
  const stripeServer = stripe.default(process.env.STRIPE_SECRET_KEY);
  const publicKey = process.env.STRIPE_PUBLISHABLE_KEY;

  const price = await stripeServer.prices.retrieve(process.env.PRICE);
  const price2 = await stripeServer.prices.retrieve(process.env.PRICE2);

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
