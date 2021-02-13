export function Subscription({ clickHandler, productPrice }) {
  const currencySymbol = {
    eur: '€',
    us: '$',
  };
  return (
    <div>
      <h1>monthly subscription</h1>
      <img
        alt="Random asset from Picsum"
        src="https://picsum.photos/280/320?random=3"
        width="140"
        height="160"
      />
      {currencySymbol[productPrice.currency]}
      {productPrice.unitAmount / 100}
      <button
        onClick={() => clickHandler('subscription', productPrice.priceId)}
      >
        subscribe
      </button>
    </div>
  );
}
