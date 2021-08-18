import { useState } from "react";

import styles from "./Products.module.css";
import { useAppSelector } from "../../app/hooks";
import { selectAllProducts } from "./productsSlice";
import {
  selectMax,
  selectMin,
  selectShowOutOfStock,
} from "../filter/filterSlice";
import { EmptyIndicator } from "../../components/EmptyIndicator";
import { Product } from "../../components/Product/Product";
import Filter from "../filter/Filter";
import { IFilterArgs } from "./interfaces";

function filter({ products, cb, performFilter }: IFilterArgs) {
  return products.map((product) => {
    if (!performFilter) return product;

    let newProduct = { ...product };

    newProduct.variants = newProduct.variants.filter((variant) => {
      return cb(variant);
    });

    if (product.variants.length === newProduct.variants.length) {
      return product;
    }
    return newProduct;
  });
}

function Products() {
  const [searchText, setSearchText] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const showOutOfStock = useAppSelector(selectShowOutOfStock);
  const min = useAppSelector(selectMin);
  const max = useAppSelector(selectMax);

  let products = useAppSelector(selectAllProducts);

  const handeSearchTextChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setSearchText(e.target.value);
  };

  const handleShowChange = () => {
    setShowFilter((prv) => !prv);
  };

  // filtering based on search text
  products = products.filter((product) =>
    product.name.trim().includes(searchText.trim())
  );

  products = filter({
    products,
    performFilter: !showOutOfStock,
    cb: (variant) => variant.totalQuantity !== 0,
  });

  products = filter({
    products,
    performFilter: true,
    cb: (variant) => {
      return min <= variant.prize && variant.prize <= max;
    },
  });

  return (
    <section className="container">
      <Filter show={showFilter} onShowChange={handleShowChange} />

      <div className={styles.searchContainer}>
        <input
          type="text"
          value={searchText}
          onChange={handeSearchTextChange}
          placeholder="enter product name here..."
          className={styles.searchContainer__input}
        />
      </div>

      {products.length === 0 && (
        <EmptyIndicator showImg={false}>Empty...</EmptyIndicator>
      )}
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </section>
  );
}

export default Products;
