import { Price } from "../Price";
import styles from "./CartProductsStats.module.css";
import { ICartProductsStatsProps, IProductStatsInfo } from "./interfaces";
import ProductPriceList from "./ProductPriceList";

function CartProductsStats({ products }: ICartProductsStatsProps) {
  if (products.length === 0) return null;

  let overAllPrice = 0;

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
            overAllPrice += variant.price * selectedVariant.quantity;

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
    <section className={styles.priceStatsContainer}>
      <details>
        <summary>
          <h2 className={styles.overAllPriceText}>
            Overall Price: <Price value={overAllPrice} />
          </h2>
        </summary>
        <ProductPriceList products={productDetails} />
      </details>
    </section>
  );
}
export default CartProductsStats;
