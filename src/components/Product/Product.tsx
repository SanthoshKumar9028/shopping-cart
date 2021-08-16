import React, { useState } from "react";

import styles from "./Product.module.css";
import { useAppDispatch } from "../../app/hooks";
import { reduceQuantity } from "../../features/products/productsSlice";
import { addToCart } from "../../features/cart/cartSlice";
import { IProductProps } from "./interfaces";
import { validateQuantity } from "./validateQuantity";
import ProductFooterCounter from "./components/ProductFooterCounter";
import ProductDetails from "./components/ProductDetails";

function Product({ product }: IProductProps) {
  const [quantityCounter, setQuantityCounter] = useState("0");
  const dispatch = useAppDispatch();

  const handleClick = () => {
    const payload = { id: product.id, quantity: +quantityCounter };
    dispatch(addToCart(payload));
    dispatch(reduceQuantity(payload));
    setQuantityCounter("0");
  };

  const options = {
    min: 0,
    max: product.totalQuantity,
    next: setQuantityCounter,
  };

  const handleCounterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateQuantity({ ...options, value: +e.target.value });
  };

  const handleIncClick = () => {
    validateQuantity({ ...options, value: +quantityCounter + 1 });
  };
  const handleDecClick = () => {
    validateQuantity({ ...options, value: +quantityCounter - 1 });
  };

  let footerContent = (
    <button className={styles.product__outOfStockBtn}>out of stock!</button>
  );
  if (product.totalQuantity > 0) {
    footerContent = (
      <>
        <ProductFooterCounter
          min={0}
          max={product.totalQuantity}
          value={+quantityCounter}
          handleCounterChange={handleCounterChange}
          handleIncClick={handleIncClick}
          handleDecClick={handleDecClick}
        />
        <button
          className={styles.product__addToCartBtn}
          onClick={handleClick}
          disabled={+quantityCounter === 0}
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

        {+quantityCounter > 0 && (
          <p className={styles.product__cost}>
            Rs: {(+quantityCounter * product.prize).toFixed(2)}
          </p>
        )}
      </div>
    </article>
  );
}

export { Product };
