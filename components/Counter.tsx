import { Dispatch, SetStateAction } from 'react';

type Props = {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
};

export function Counter({ count, setCount }: Props) {
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
