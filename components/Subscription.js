export function Subscription({ clickHandler, productPrice }) {
  const currencySymbol = {
    eur: '€',
    us: '$',
  };
  return (
    <div>
      <h1>Subscription Plan</h1>
      <p>
        This is a recurring payment <span>product</span>.
      </p>
      <img alt="magazine" src="/images/magazine.jpg" />
      <button
        onClick={() => clickHandler('subscription', productPrice.priceId)}
      >
        Subscribe for {currencySymbol[productPrice.currency]}{' '}
        {productPrice.unitAmount / 100} month
      </button>
    </div>
  );
}
