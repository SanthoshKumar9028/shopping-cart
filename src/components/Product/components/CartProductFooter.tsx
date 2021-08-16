import styles from "../Product.module.css";
import ProductFooterCounter from "./ProductFooterCounter";
import { ICartProductFooterProps } from "../interfaces";

function CartProductFooter(props: ICartProductFooterProps) {
  const { value, handleUpdateClick, actionType, product, ...rest } = props;

  if (actionType === "add" && product.totalQuantity === 0) {
    return null;
  }

  let showCurrentRupee =
    (actionType === "add" && value > 0) ||
    (actionType === "modify" && value < product.quantity);

  return (
    <>
      <ProductFooterCounter {...rest} value={value} />

      <button
        className={styles.product__addToCartBtn}
        onClick={handleUpdateClick}
        disabled={
          (actionType === "add" && value === 0) ||
          (actionType === "modify" && value === product.quantity)
        }
      >
        {actionType === "add" ? "ADD TO CART" : "UPDATE CART"}
      </button>

      {showCurrentRupee && (
        <p className={styles.product__cost}>
          Rs: {(value * product.prize).toFixed(2)}
        </p>
      )}
    </>
  );
}

export default CartProductFooter;
