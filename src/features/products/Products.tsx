import { useAppSelector } from "../../app/hooks";
import { Product } from "../../components/Product/Product";

import { selectAllProducts } from "./productsSlice";

function Products() {
  const products = useAppSelector(selectAllProducts);
  // console.log(products);
  return (
    <section className="container">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </section>
  );
}

export default Products;
