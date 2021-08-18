import styles from "../Product.module.css";
import ProductFooterCounter from "./ProductFooterCounter";
import { ICartProductFooterProps } from "../interfaces";

function CartProductFooter(props: ICartProductFooterProps) {
  const {
    value,
    totalQuantity,
    currentVariant,
    handleUpdateClick,
    actionType,
    product,
    ...rest
  } = props;

  if (actionType === "add" && totalQuantity === 0) {
    return null;
  }

  let showCurrentRupee =
    (actionType === "add" && value > 0) ||
    (actionType === "modify" && value < rest.max);

  return (
    <>
      <ProductFooterCounter {...rest} value={value} />

      <button
        className={styles.product__addToCartBtn}
        onClick={handleUpdateClick}
        disabled={
          (actionType === "add" && value === 0) ||
          (actionType === "modify" && value === totalQuantity)
        }
      >
        {actionType === "add" ? "ADD TO CART" : "UPDATE CART"}
      </button>

      {showCurrentRupee && (
        <p className={styles.product__cost}>
          Rs: {(value * currentVariant.prize).toFixed(2)}
        </p>
      )}
    </>
  );
}

export default CartProductFooter;
