import { useState } from 'react';
import { Counter } from './Counter';

export function Product({ clickHandler, productPrice }) {
  const [quantity, setQuantity] = useState(1);
  const currencySymbol = {
    eur: '€',
    us: '$',
  };
  return (
    <div>
      <h1>product</h1>
      <img
        alt="Random asset from Picsum"
        src="https://picsum.photos/280/320?random=4"
        width="140"
        height="160"
      />
      {currencySymbol[productPrice.currency]}
      {productPrice.unitAmount / 100}
      <Counter currentValue={quantity} newValueSetter={setQuantity} />
      <button
        onClick={() => clickHandler('payment', productPrice.priceId, quantity)}
      >
        checkout
      </button>
    </div>
  );
}
