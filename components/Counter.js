export function Counter({ minValue = 1, currentValue, newValueSetter }) {
  return (
    <input
      type="number"
      value={currentValue}
      onChange={(e) => newValueSetter(e.currentTarget.value)}
      min={minValue}
    />
  );
}
