import { IProduct } from "../../features/products/interfaces";
import styles from "./Product.module.css";

interface IProductProps {
  product: IProduct;
}

function Product({ product }: IProductProps) {
  const { name, prize, imageUrl, description } = product;

  return (
    <article className={styles.product}>
      <img src={imageUrl} alt="product" className={styles.product__img} />
      <h2 className={styles.product__name}>{name} </h2>
      <p className={styles.product__prize}>
        Prize: <b>{prize}</b>
      </p>
      <p className={styles.product__desc}>{description}</p>
      <div className={styles.product__footer}>
        <button className={styles.product__incQuantityBtn}>-</button>
        <input type="text" defaultValue="1" />
        <button className={styles.product__decQuantityBtn}>+</button>
        <button className={styles.product__addCartBtn}>ADD TO CARD</button>
      </div>
    </article>
  );
}

export default Product;
