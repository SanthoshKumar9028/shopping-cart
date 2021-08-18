import React, { useState, useEffect } from "react";

import styles from "./Product.module.css";
import { useAppDispatch } from "../../app/hooks";
import { reduceQuantity } from "../../features/products/productsSlice";
import { addToCart } from "../../features/cart/cartSlice";
import { IProductProps } from "./interfaces";
import { validateQuantity } from "./validateQuantity";
import ProductFooterCounter from "./components/ProductFooterCounter";
import ProductDetails from "./components/ProductDetails";
import { VariantsSelect } from "./components/VariantsSelect";
import Prize from "../Prize";

function Product({ product }: IProductProps) {
  const [quantityCounter, setQuantityCounter] = useState("0");
  const [variantType, setVariantType] = useState(product.variants[0]?.type);
  const dispatch = useAppDispatch();

  const currentVariant = product.variants.find(
    (variant) => variant.type === variantType
  );

  useEffect(() => {
    // keeping the current selected variant
    if (!product.variants[0]) return;

    for (let variant of product.variants) {
      if (variant.type === variantType) return;
    }

    setVariantType(product.variants[0].type);
  }, [product.variants, variantType]);

  useEffect(() => {
    if (!currentVariant) return;

    if (+quantityCounter > currentVariant.totalQuantity) {
      setQuantityCounter("0");
    }
  }, [currentVariant, quantityCounter]);

  // no variants to display
  if (product.variants.length === 0) return null;

  const handleClick = () => {
    const payload = {
      id: product.id,
      variant: { type: variantType, quantity: +quantityCounter },
    };

    dispatch(addToCart(payload));
    dispatch(reduceQuantity(payload));
    setQuantityCounter("0");
  };
  const handleChangeVariant: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    setVariantType(e.target.value);
    setQuantityCounter("0");
  };

  const options = {
    min: 0,
    max: currentVariant?.totalQuantity || 0,
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
  if (currentVariant && currentVariant.totalQuantity > 0) {
    footerContent = (
      <>
        <ProductFooterCounter
          min={0}
          max={currentVariant.totalQuantity}
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
      <div className={styles.product__variantsContainer}>
        <VariantsSelect
          value={variantType}
          onChange={handleChangeVariant}
          variants={product.variants}
        />
      </div>

      {currentVariant && (
        <ProductDetails product={product} currentVariant={currentVariant} />
      )}

      <div className={styles.product__footer}>
        {footerContent}

        {currentVariant && +quantityCounter > 0 && (
          <p className={styles.product__cost}>
            Rs: <Prize value={+quantityCounter * currentVariant.prize} />
          </p>
        )}
      </div>
    </article>
  );
}

export { Product };
