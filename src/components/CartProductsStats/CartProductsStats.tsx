import Prize from "../Prize";
import styles from "./CartProductsStats.module.css";
import { ICartProductsStatsProps, IProductStatsInfo } from "./interfaces";
import ProductPrizeList from "./ProductPrizeList";

function CartProductsStats({ products }: ICartProductsStatsProps) {
  if (products.length === 0) return null;

  let overAllPrize = 0;

  // mearging all product variants with user selected variants
  let productDetails = products.reduce<IProductStatsInfo[]>(
    (prevProductsInfo, product) => {
      let productInfo: IProductStatsInfo = {
        id: product.id,
        name: product.name,
        variants: [],
      };

      for (let selectedVariant of product.selectedVariants) {
        for (let variant of product.variants) {
          if (variant.type === selectedVariant.type) {
            overAllPrize += variant.prize * selectedVariant.quantity;

            productInfo.variants.push({
              ...variant,
              ...selectedVariant,
            });
            break;
          }
        }
      }

      return [...prevProductsInfo, productInfo];
    },
    []
  );

  return (
    <section className={styles.prizeStatsContainer}>
      <details>
        <summary>
          <h2 className={styles.overAllPrizeText}>
            Overall Prize: <Prize value={overAllPrize} />
          </h2>
        </summary>
        <ProductPrizeList products={productDetails} />
      </details>
    </section>
  );
}
export default CartProductsStats;
