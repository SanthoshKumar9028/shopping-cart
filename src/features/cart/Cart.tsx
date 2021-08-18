import { useAppSelector } from "../../app/hooks";
import { CartProduct } from "../../components/Product";
import { EmptyIndicator } from "../../components/EmptyIndicator";

import { selectCartProducts } from "./cartSlice";
import CartProductsStats from "../../components/CartProductsStats/CartProductsStats";

function CartProducts() {
  const products = useAppSelector(selectCartProducts);

  return (
    <section className="container">
      {products.length === 0 && (
        <EmptyIndicator> Empty Cart :( </EmptyIndicator>
      )}

      <CartProductsStats products={products} />

      {products.map((product) => (
        <CartProduct key={product.id} product={product} />
      ))}
    </section>
  );
}

export default CartProducts;
