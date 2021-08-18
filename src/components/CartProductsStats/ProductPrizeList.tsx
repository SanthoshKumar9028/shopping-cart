import Prize from "../Prize";
import styles from "./CartProductsStats.module.css";
import {
  IProductPrizeListProps,
  IProductVariantsPrizeTable,
} from "./interfaces";

function ProductVariantsPrizeTable(props: IProductVariantsPrizeTable) {
  if (props.total === 0) return null;

  return (
    <table className={styles.variantsTable}>
      <tbody>
        <tr>
          <th>Variant</th>
          <th>Quantity</th>
          <th>Prize</th>
          <th>Total</th>
        </tr>

        {props.variants.map(({ type, prize, quantity }) => {
          if (quantity === 0) return null;
          return (
            <tr key={type}>
              <td>{type}</td>
              <td>{quantity}</td>
              <td>{prize}</td>
              <td>
                <Prize value={prize * quantity} />
              </td>
            </tr>
          );
        })}

        <tr>
          <td colSpan={3}></td>
          <td>
            <b>
              <Prize value={props.total} />
            </b>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function ProductPrizeList({ products }: IProductPrizeListProps) {
  return (
    <ul className={styles.prizeList}>
      {products.map(({ id, name, variants }) => {
        let total = variants.reduce((p, c) => p + c.prize * c.quantity, 0);

        return (
          <li key={id}>
            <details>
              <summary>
                <span className={styles.prizeList__title}>{name}</span> (total :{" "}
                <b>
                  <Prize value={total} />
                </b>
                )
              </summary>
              <ProductVariantsPrizeTable variants={variants} total={total} />
            </details>
          </li>
        );
      })}
    </ul>
  );
}
export default ProductPrizeList;
