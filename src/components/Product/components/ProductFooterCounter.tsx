import { IProductFooterCounterProps } from "../interfaces";
import styles from "../Product.module.css";

function ProductFooterCounter(props: IProductFooterCounterProps) {
  const {
    product,
    quantity,
    handleCounterChange,
    handleIncClick,
    handleDecClick,
  } = props;

  return (
    <>
      <button
        className={styles.product__incQuantityBtn}
        onClick={handleDecClick}
        disabled={+quantity <= 0}
      >
        -
      </button>
      <input type="text" value={quantity} onChange={handleCounterChange} />
      <button
        className={styles.product__decQuantityBtn}
        onClick={handleIncClick}
        disabled={+quantity >= product.totalQuantity}
      >
        +
      </button>
    </>
  );
}

export default ProductFooterCounter;
