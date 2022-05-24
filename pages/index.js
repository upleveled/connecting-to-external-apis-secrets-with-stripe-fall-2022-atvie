import { useState } from 'react';
import Product from '../components/Product';
import Subscription from '../components/Subscription';

export default function Home() {
  const [productQuantity, setProductQuantity] = useState(1);
  return (
    <div>
      <div>
        <Product
          productQuantity={productQuantity}
          setProductQuantity={setProductQuantity}
        />
        {/* fix this */}
        <button>Buy for XX - FIX ME</button>
      </div>
      <div>
        <Subscription />
        {/* fix this */}
        <button>Buy for XX - FIX ME</button>
      </div>
    </div>
  );
}
