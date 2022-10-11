export function Counter({ count, setCount }) {
  return (
    <>
      <button
        onClick={() => {
          if (count <= 1) {
            setCount(1);
          } else {
            setCount(count - 1);
          }
        }}
      >
        -
      </button>
      <span>{count}</span>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
    </>
  );
}
