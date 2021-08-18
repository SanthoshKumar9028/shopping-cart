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
import { VariantsSelect } from "./components/VariantsSelect";
import Prize from "../Prize";

function CartProduct({ product }: ICartProductProps) {
  const [quantityCounter, setQuantityCounter] = useState("0");
  const [variantType, setVariantType] = useState(product.variants[0]?.type);
  const [actionType, setActionType] = useState("add");

  const dispatch = useAppDispatch();

  const currentVariant = product.variants.find(
    (variant) => variant.type === variantType
  );
  const currentUserSelectedVariant = product.selectedVariants.find(
    (v) => v.type === currentVariant?.type
  );

  useEffect(() => {
    if (!product.variants[0]) return;

    for (let variant of product.variants) {
      if (variant.type === variantType) return;
    }

    setVariantType(product.variants[0].type);
  }, [product.variants, variantType]);

  useEffect(() => {
    if (!currentUserSelectedVariant) return;
    if (currentUserSelectedVariant.quantity === 0 && actionType === "modify") {
      setActionType("add");
      setQuantityCounter("0");
    }
  }, [currentUserSelectedVariant, actionType]);

  useEffect(() => {
    // preventing when no products to add
    if (!currentVariant || !currentUserSelectedVariant) return;

    if (actionType === "add" && currentVariant.totalQuantity === 0) {
      setActionType("modify");
      setQuantityCounter(String(currentUserSelectedVariant.quantity));
    }
  }, [actionType, currentVariant, currentUserSelectedVariant]);

  // no variants to display
  if (product.variants.length === 0) return null;

  const handleActionChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    const { value } = e.target;
    setActionType(value);
    setQuantityCounter(
      value === "add" ? "0" : String(currentUserSelectedVariant?.quantity || 0)
    );
  };

  const handleUpdateClick = () => {
    const payload = {
      id: product.id,
      variant: {
        type: variantType,
        quantity: +quantityCounter,
      },
    };

    if (actionType === "add") {
      if (+quantityCounter <= 0) return;
      dispatch(addToCart(payload));
      dispatch(reduceQuantity(payload));
      setQuantityCounter("0");
    }

    if (!currentUserSelectedVariant) return;

    if (actionType === "modify") {
      dispatch(setCartQuantity(payload));
      dispatch(
        increaseQuantity({
          id: product.id,
          variant: {
            type: variantType,
            quantity: currentUserSelectedVariant.quantity - +quantityCounter,
          },
        })
      );
    }
  };

  const handleRemoveClick = () => {
    for (let variant of product.selectedVariants) {
      dispatch(increaseQuantity({ id: product.id, variant }));
    }
    dispatch(removeFromCart({ id: product.id }));
  };

  const totalQuantity =
    actionType === "add"
      ? currentVariant?.totalQuantity || 0
      : currentUserSelectedVariant?.quantity || 0;

  const options = {
    value: +quantityCounter,
    min: 0,
    max: totalQuantity,
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

  const handleChangeVariant: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    setVariantType(e.target.value);
    setQuantityCounter("0");
    setActionType("add");
  };

  return (
    <article className={`${styles.product} ${styles["product--cart"]}`}>
      <div className={styles["product--cart__header"]}>
        {currentVariant &&
          currentUserSelectedVariant &&
          currentUserSelectedVariant.quantity > 0 && (
            <span>
              Total:{" "}
              <b>
                {currentVariant.prize.toFixed(2)} x{" "}
                {currentUserSelectedVariant.quantity} =
                <Prize
                  value={
                    currentVariant.prize * currentUserSelectedVariant.quantity
                  }
                />
              </b>
            </span>
          )}

        <div className={styles["product--cart__header-variants"]}>
          <VariantsSelect
            value={variantType}
            onChange={handleChangeVariant}
            variants={product.variants}
          />

          <button
            className={styles.product__removeFromCartBtn}
            onClick={handleRemoveClick}
          >
            X
          </button>
        </div>
      </div>

      {currentVariant && (
        <ProductDetails product={product} currentVariant={currentVariant} />
      )}

      <div
        className={`${styles.product__footer} ${styles["product__footer--cart"]}`}
      >
        <select
          value={actionType}
          onChange={handleActionChange}
          className={styles.product__actions}
        >
          {currentVariant && currentVariant.totalQuantity > 0 && (
            <option value="add">Add</option>
          )}
          {currentUserSelectedVariant &&
            currentUserSelectedVariant.quantity > 0 && (
              <option value="modify">Modify</option>
            )}
        </select>

        {currentVariant && (
          <div>
            <CartProductFooter
              min={0}
              max={totalQuantity}
              product={product}
              totalQuantity={totalQuantity}
              currentVariant={currentVariant}
              value={+quantityCounter}
              actionType={actionType}
              handleCounterChange={handleCounterChange}
              handleUpdateClick={handleUpdateClick}
              handleIncClick={handleIncClick}
              handleDecClick={handleDecClick}
            />
          </div>
        )}
      </div>
    </article>
  );
}

export { CartProduct };
