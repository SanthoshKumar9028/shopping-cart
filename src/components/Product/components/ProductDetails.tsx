import styles from "../Product.module.css";
import { IProductDetailsProps } from "../interfaces";
import { Price } from "../../Price";

function ProductDetails({ product, currentVariant }: IProductDetailsProps) {
  const { name, description } = product;
  const { price, imageUrl, totalQuantity } = currentVariant;

  return (
    <>
      <img src={imageUrl} alt="product" className={styles.product__img} />
      <h2 className={styles.product__name}>{name}</h2>
      <p className={styles.product__price}>
        Price: <Price value={price} />
      </p>
      <p className={styles.product__totalQuantity}>
        Available Quantity: <b>{totalQuantity}</b>
      </p>
      <p className={styles.product__desc}>{description}</p>
    </>
  );
}

export { ProductDetails };
