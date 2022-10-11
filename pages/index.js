import { useRouter } from 'next/router';
import { useState } from 'react';
import stripe from 'stripe';
import { Counter } from '../components/Counter';

export default function Home(props) {
  const [productQuantity, setProductQuantity] = useState(1);
  const router = useRouter();

  async function clickHandler(quantity, priceId, mode) {
    const response = await fetch('/api/sessions', {
      method: 'POST',
      headers: {
        'content-type': ' application/json',
      },
      body: JSON.stringify({
        quantity: quantity,
        priceId: priceId,
        mode: mode,
      }),
    });

    const data = await response.json();

    router.push(data.session.url);
  }

  return (
    <div>
      <div>
        <h1>Nice Product</h1>
        <p>{props.tablet.product.description}</p>
        <div>
          <img
            alt="Random asset from Picsum"
            src={props.tablet.product.images[0] || '/images/no-image.png'}
          />
          <Counter count={productQuantity} setCount={setProductQuantity} />
        </div>
        {/* fix this */}
        <button
          onClick={() =>
            clickHandler(productQuantity, props.tablet.price.id, 'payment')
          }
        >
          Buy for ${(props.tablet.price.unit_amount / 100) * productQuantity}
        </button>
      </div>
      <div>
        <h1>Subscription Plan</h1>
        <p>{props.magazine.product.description}</p>
        <img
          alt="magazine"
          src={props.magazine.product.images[0] || '/images/no-image.png'}
        />
        {/* fix this */}
        <button
          onClick={() =>
            clickHandler(1, props.magazine.price.id, 'subscription')
          }
        >
          Buy for ${props.magazine.price.unit_amount / 100}
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // Use SDK to connect to stripe using my SECRET
  const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

  const tabletPrice = await stripeClient.prices.retrieve(
    process.env.TABLET_PRICE,
  );
  const magazinePrice = await stripeClient.prices.retrieve(
    process.env.MAGAZINE_PRICE,
  );

  const tablet = await stripeClient.products.retrieve(tabletPrice.product);

  const magazine = await stripeClient.products.retrieve(magazinePrice.product);

  return {
    props: {
      tablet: {
        price: tabletPrice,
        product: tablet,
      },
      magazine: {
        price: magazinePrice,
        product: magazine,
      },
    },
  };
}
