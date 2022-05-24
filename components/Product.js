import { Counter } from './Counter';

export default function Product(props) {
  return (
    <>
      <h1>Nice Product</h1>
      <p>
        This is a one time payment <span>product</span>.
      </p>
      <div>
        <img
          alt="Random asset from Picsum"
          src={props.image || 'https://picsum.photos/200'}
        />
        <Counter
          count={props.productQuantity}
          setCount={props.setProductQuantity}
        />
      </div>
    </>
  );
}
