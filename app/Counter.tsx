'use client';
import { Dispatch, SetStateAction } from 'react';
import styles from './Counter.module.scss';

type Props = {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
};

export function Counter({ count, setCount }: Props) {
  return (
    <div>
      <button
        className={styles.counterButton}
        onClick={() => {
          setCount(count <= 1 ? 1 : count - 1);
        }}
      >
        -
      </button>
      <span className={styles.counterSpan}>{count}</span>
      <button
        className={styles.counterButton}
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
    </div>
  );
}
