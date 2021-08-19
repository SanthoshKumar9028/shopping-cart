interface ITotalPriceProps {
  value: number;
}

export function Price(props: ITotalPriceProps) {
  return <span>{props.value.toFixed(2)}</span>;
}
