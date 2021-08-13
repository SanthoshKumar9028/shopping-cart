import React, { useState } from "react";

import styles from "./Product.module.css";
import { useAppDispatch } from "../../app/hooks";
import {
  reduceQuantity,
  increaseQuantity,
} from "../../features/products/productsSlice";
import { addToCart, removeFromCart } from "../../features/cart/cartSlice";
import { ICartProductProps } from "./interfaces";
import ProductFooterCounter from "./components/ProductFooterCounter";
import ProductDetails from "./components/ProductDetails";

function CartProduct({ product }: ICartProductProps) {
  const [quantity, setQuantity] = useState("0");
  const dispatch = useAppDispatch();

  const handleUpdateClick = () => {
    const payload = { id: product.id, quantity: +quantity };
    dispatch(addToCart(payload));
    dispatch(reduceQuantity(payload));
    setQuantity("0");
  };
  const handleRemoveClick = () => {
    dispatch(increaseQuantity({ id: product.id, quantity: product.quantity }));
    dispatch(removeFromCart({ id: product.id }));
  };

  const validateQuantity = (count: number) => {
    if (!isFinite(count)) {
      return;
    }

    if (count < 0) {
      setQuantity("0");
    } else if (count > product.totalQuantity) {
      setQuantity(String(product.totalQuantity));
    } else {
      setQuantity(String(count));
    }
  };

  const handleCounterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateQuantity(+e.target.value);
  };
  const handleIncClick = () => {
    validateQuantity(+quantity + 1);
  };
  const handleDecClick = () => {
    validateQuantity(+quantity - 1);
  };

  let footerContent = (
    <button className={styles.product__outOfStockBtn}>out of stock!</button>
  );
  if (product.totalQuantity > 0) {
    footerContent = (
      <>
        <ProductFooterCounter
          product={product}
          quantity={quantity}
          handleCounterChange={handleCounterChange}
          handleIncClick={handleIncClick}
          handleDecClick={handleDecClick}
        />
        <button
          className={styles.product__addToCartBtn}
          onClick={handleUpdateClick}
          disabled={+quantity === 0}
        >
          UPDATE
        </button>
      </>
    );
  }

  return (
    <article className={`${styles.product} ${styles["product--cart"]}`}>
      <div className={styles["product--cart__header"]}>
        <span>
          Total:{" "}
          <b>
            {product.prize.toFixed(2)} x {product.quantity} =
            {(product.prize * product.quantity).toFixed(2)}
          </b>
        </span>
        <button
          className={styles.product__removeFromCartBtn}
          onClick={handleRemoveClick}
        >
          X
        </button>
      </div>

      <ProductDetails product={product} />

      <div className={styles.product__footer}>
        {footerContent}
        {+quantity > 0 && (
          <p className={styles.product__cost}>
            Rs: {(+quantity * product.prize).toFixed(2)}
          </p>
        )}
      </div>
    </article>
  );
}

export { CartProduct };
