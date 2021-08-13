import styles from "../Product.module.css";
import { IProductDetailsProps } from "../interfaces";

function ProductDetails({ product }: IProductDetailsProps) {
  const { name, prize, imageUrl, totalQuantity, description } = product;

  return (
    <>
      <img src={imageUrl} alt="product" className={styles.product__img} />
      <h2 className={styles.product__name}>{name} </h2>
      <p className={styles.product__prize}>
        Prize: <b>{prize.toFixed(2)}</b>
      </p>
      <p className={styles.product__totalQuantity}>
        Available Quantity: <b>{totalQuantity}</b>
      </p>
      <p className={styles.product__desc}>{description}</p>
    </>
  );
}

export default ProductDetails;
