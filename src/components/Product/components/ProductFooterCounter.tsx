import { IProductFooterCounterProps } from "../interfaces";
import styles from "../Product.module.css";

function ProductFooterCounter(props: IProductFooterCounterProps) {
  const { min, max, value, onCounterChange, onIncClick, onDecClick } = props;

  return (
    <>
      <button
        className={styles.product__incQuantityBtn}
        onClick={onDecClick}
        disabled={value <= min}
      >
        -
      </button>
      <input type="text" value={value} onChange={onCounterChange} />
      <button
        className={styles.product__decQuantityBtn}
        onClick={onIncClick}
        disabled={value >= max}
      >
        +
      </button>
    </>
  );
}

export default ProductFooterCounter;
