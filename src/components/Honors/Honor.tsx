import { IHonorProps } from "./interfaces";

function Honor({ honor, ...rest }: IHonorProps) {
  const { title, imageUrl } = honor;
  return (
    <article {...rest}>
      <h3>{title}</h3>
      <img src={imageUrl} alt={title} />
    </article>
  );
}

export default Honor;
