export default function Subscription(props) {
  return (
    <>
      <h1>Subscription Plan</h1>
      <p>
        This is a recurring payment <span>product</span>.
      </p>
      <img alt="magazine" src={props.image || '/images/no-image.png'} />
    </>
  );
}
