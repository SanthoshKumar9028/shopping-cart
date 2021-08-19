import { Price } from "../Price";
import styles from "./CartProductsStats.module.css";
import {
  IProductPriceListProps,
  IProductVariantsPriceTable,
} from "./interfaces";

function ProductVariantsPriceTable(props: IProductVariantsPriceTable) {
  if (props.total === 0) return null;

  return (
    <table className={styles.variantsTable}>
      <tbody>
        <tr>
          <th>Variant</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
        </tr>

        {props.variants.map(({ type, price, quantity }) => {
          if (quantity === 0) return null;
          return (
            <tr key={type}>
              <td>{type}</td>
              <td>{quantity}</td>
              <td>{price}</td>
              <td>
                <Price value={price * quantity} />
              </td>
            </tr>
          );
        })}

        <tr>
          <td colSpan={3}></td>
          <td>
            <b>
              <Price value={props.total} />
            </b>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function ProductPriceList({ products }: IProductPriceListProps) {
  return (
    <ul className={styles.priceList}>
      {products.map(({ id, name, variants }) => {
        let total = variants.reduce((p, c) => p + c.price * c.quantity, 0);

        return (
          <li key={id}>
            <details>
              <summary>
                <span className={styles.priceList__title}>{name}</span> (total :{" "}
                <b>
                  <Price value={total} />
                </b>
                )
              </summary>
              <ProductVariantsPriceTable variants={variants} total={total} />
            </details>
          </li>
        );
      })}
    </ul>
  );
}
export default ProductPriceList;
