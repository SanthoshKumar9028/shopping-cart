import { IProductFooterCounterProps } from "../interfaces";
import styles from "../Product.module.css";

function ProductFooterCounter(props: IProductFooterCounterProps) {
  const {
    min,
    max,
    value,
    handleCounterChange,
    handleIncClick,
    handleDecClick,
  } = props;

  return (
    <>
      <button
        className={styles.product__incQuantityBtn}
        onClick={handleDecClick}
        disabled={value <= min}
      >
        -
      </button>
      <input type="text" value={value} onChange={handleCounterChange} />
      <button
        className={styles.product__decQuantityBtn}
        onClick={handleIncClick}
        disabled={value >= max}
      >
        +
      </button>
    </>
  );
}

export default ProductFooterCounter;
