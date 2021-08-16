import React, { useEffect, useState } from "react";

import styles from "./Product.module.css";
import { useAppDispatch } from "../../app/hooks";
import {
  reduceQuantity,
  increaseQuantity,
} from "../../features/products/productsSlice";
import {
  addToCart,
  removeFromCart,
  setCartQuantity,
} from "../../features/cart/cartSlice";
import { ICartProductProps } from "./interfaces";
import { validateQuantity } from "./validateQuantity";
import ProductDetails from "./components/ProductDetails";
import CartProductFooter from "./components/CartProductFooter";

function CartProduct({ product }: ICartProductProps) {
  const [quantityCounter, setQuantityCounter] = useState("0");
  const [actionType, setActionType] = useState("add");

  const dispatch = useAppDispatch();

  useEffect(() => {
    // preventing when no products to add
    if (actionType === "add" && product.totalQuantity === 0) {
      setActionType("modify");
      setQuantityCounter(String(product.quantity));
    }
  }, [actionType, product]);

  const handleActionChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    const { value } = e.target;
    setActionType(value);
    setQuantityCounter(value === "add" ? "0" : String(product.quantity));
  };

  const handleUpdateClick = () => {
    if (actionType === "modify") {
      dispatch(setCartQuantity({ id: product.id, quantity: +quantityCounter }));
      dispatch(
        increaseQuantity({
          id: product.id,
          quantity: product.quantity - +quantityCounter,
        })
      );
    }

    if (+quantityCounter <= 0) return;

    if (actionType === "add") {
      const payload = { id: product.id, quantity: +quantityCounter };
      dispatch(addToCart(payload));
      dispatch(reduceQuantity(payload));
      setQuantityCounter("0");
    }
  };

  const handleRemoveClick = () => {
    dispatch(increaseQuantity({ id: product.id, quantity: product.quantity }));
    dispatch(removeFromCart({ id: product.id }));
  };

  const options = {
    value: +quantityCounter,
    min: 0,
    max: actionType === "add" ? product.totalQuantity : product.quantity,
    next: setQuantityCounter,
  };

  const handleCounterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateQuantity({ ...options, value: +e.target.value });
  };

  const handleIncClick = () => {
    validateQuantity({ ...options, value: options.value + 1 });
  };
  const handleDecClick = () => {
    validateQuantity({ ...options, value: options.value - 1 });
  };

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

      <div
        className={`${styles.product__footer} ${styles["product__footer--cart"]}`}
      >
        <select
          value={actionType}
          onChange={handleActionChange}
          className={styles.product__actions}
        >
          {product.totalQuantity > 0 && <option value="add">Add</option>}
          <option value="modify">Modify</option>
        </select>

        <div>
          <CartProductFooter
            min={0}
            max={
              actionType === "add" ? product.totalQuantity : product.quantity
            }
            product={product}
            value={+quantityCounter}
            actionType={actionType}
            handleCounterChange={handleCounterChange}
            handleUpdateClick={handleUpdateClick}
            handleIncClick={handleIncClick}
            handleDecClick={handleDecClick}
          />
        </div>
      </div>
    </article>
  );
}

export { CartProduct };
