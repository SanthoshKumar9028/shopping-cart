interface ITotalPrizeProps {
  value: number;
}

export default function TotalPrize(props: ITotalPrizeProps) {
  return <span>{props.value.toFixed(2)}</span>;
}
