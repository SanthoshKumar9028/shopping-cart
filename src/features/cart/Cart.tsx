import { useAppSelector } from "../../app/hooks";
import { CartProduct } from "../../components/Product";
import { EmptyIndicator } from "../../components/EmptyIndicator";

import { selectCartProducts } from "./cartSlice";

function CartProducts() {
  const products = useAppSelector(selectCartProducts);

  const overAllPrize = products.reduce(
    (acc, prv) => acc + prv.prize * prv.quantity,
    0
  );

  return (
    <section className="container">
      {products.length > 0 && (
        <h2>Overall Prize: {overAllPrize.toFixed(2)} </h2>
      )}

      {products.length === 0 && (
        <EmptyIndicator> Empty Cart :( </EmptyIndicator>
      )}

      {products.map((product) => (
        <CartProduct key={product.id} product={product} />
      ))}
    </section>
  );
}

export default CartProducts;
