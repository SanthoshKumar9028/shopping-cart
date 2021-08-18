import styles from "../Product.module.css";
import { IVariantsSelectProps } from "../interfaces";

function VariantsSelect({ variants, value, onChange }: IVariantsSelectProps) {
  if (variants.length === 0) return null;

  return (
    <label htmlFor="variants" className={styles.product__variants}>
      Select Variant:{" "}
      <select id="variants" value={value} onChange={onChange}>
        {variants.map((variant, index) => {
          return (
            <option key={index} value={variant.type}>
              {variant.type}
            </option>
          );
        })}
      </select>
    </label>
  );
}
export { VariantsSelect };
