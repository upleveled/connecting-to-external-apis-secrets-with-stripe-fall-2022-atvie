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
