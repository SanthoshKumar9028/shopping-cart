import React, { useState } from "react";

import styles from "./Product.module.css";
import { useAppDispatch } from "../../app/hooks";
import { reduceQuantity } from "../../features/products/productsSlice";
import { addToCart } from "../../features/cart/cartSlice";
import { IProductProps } from "./interfaces";
import ProductFooterCounter from "./components/ProductFooterCounter";
import ProductDetails from "./components/ProductDetails";

function Product({ product }: IProductProps) {
  const [quantity, setQuantity] = useState("0");
  const dispatch = useAppDispatch();

  const handleClick = () => {
    const payload = { id: product.id, quantity: +quantity };
    dispatch(addToCart(payload));
    dispatch(reduceQuantity(payload));
    setQuantity("0");
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
          onClick={handleClick}
          disabled={+quantity === 0}
        >
          ADD TO CART
        </button>
      </>
    );
  }

  return (
    <article className={styles.product}>
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

export { Product };
