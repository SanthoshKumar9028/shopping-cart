import styles from "../Product.module.css";
import { IProduct, IVariant } from "../../../features/products/interfaces";
import { ISelectedVariant } from "../../../features/cart/interfaces";
import ProductFooterCounter from "./ProductFooterCounter";
import { Price } from "../../Price";
import { validateQuantity } from "../validateQuantity";
import { useAppDispatch } from "../../../app/hooks";
import {
  increaseQuantity,
  reduceQuantity,
} from "../../../features/products/productsSlice";
import {
  addToCart,
  removeVariantFromCart,
  setCartQuantity,
} from "../../../features/cart/cartSlice";

interface ICartProductVariantProps {
  product: IProduct;
  variant: ISelectedVariant & IVariant;
}

function CartProductVariant({ product, variant }: ICartProductVariantProps) {
  const dispatch = useAppDispatch();
  const { id, name, description } = product;
  const { price, imageUrl, type, quantity, totalQuantity } = variant;

  const handleRemoveClick = () => {
    dispatch(increaseQuantity({ id, variant: { type, quantity } }));
    dispatch(removeVariantFromCart({ id, variant: { type } }));
  };

  const handleCounterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateQuantity({
      value: +e.target.value,
      min: 0,
      max: totalQuantity + quantity,
      next: (q: string) => {
        const payload = {
          id: product.id,
          variant: { type, quantity: +q },
        };

        dispatch(setCartQuantity(payload));

        payload.variant.quantity = quantity - +q;
        dispatch(increaseQuantity(payload));
      },
    });
  };

  const handleIncClick = () => {
    const payload = { id, variant: { type, quantity: 1 } };

    dispatch(addToCart(payload));
    dispatch(reduceQuantity(payload));
  };

  const handleDecClick = () => {
    const payload = { id, variant: { type, quantity: -1 } };

    dispatch(addToCart(payload));
    payload.variant.quantity = 1;
    dispatch(increaseQuantity(payload));
  };

  return (
    <article className={`${styles.product} ${styles["product--cart"]}`}>
      <div className={styles["product--cart__header"]}>
        <p>
          {quantity > 0 && (
            <span>
              Total:{" "}
              <b>
                <Price value={price} /> x {variant.quantity} =
                <Price value={price * variant.quantity} />
              </b>
            </span>
          )}
        </p>

        <button
          className={styles.product__removeFromCartBtn}
          onClick={handleRemoveClick}
        >
          X
        </button>
      </div>

      <img src={imageUrl} alt="product" className={styles.product__img} />

      <h2 className={styles.product__name}>
        {name} <sub className={styles.product__variantType}>({type})</sub>
      </h2>

      <p className={styles.product__price}>
        Price: <Price value={price} />
      </p>

      <p className={styles.product__desc}>{description}</p>

      <div className={styles.product__footer}>
        <ProductFooterCounter
          value={quantity}
          min={0}
          max={quantity + totalQuantity}
          onCounterChange={handleCounterChange}
          onIncClick={handleIncClick}
          onDecClick={handleDecClick}
        />
      </div>
    </article>
  );
}

export { CartProductVariant };
