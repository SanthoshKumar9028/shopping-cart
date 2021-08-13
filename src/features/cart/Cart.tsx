import { useAppSelector } from "../../app/hooks";
import { CartProduct } from "../../components/Product";

import { selectCartProducts } from "./cartSlice";

function CartProducts() {
  const products = useAppSelector(selectCartProducts);

  const overAllPrize = products.reduce(
    (acc, prv) => acc + prv.prize * prv.quantity,
    0
  );

  return (
    <section className="container">
      {products.length > 0 && <h2>Overall Prize: {overAllPrize} </h2>}
      {products.map((product) => (
        <CartProduct key={product.id} product={product} />
      ))}
    </section>
  );
}

export default CartProducts;
