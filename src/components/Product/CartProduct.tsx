import { ICartProductProps } from "./interfaces";
import { CartProductVariant } from "./components/CartProductVariant";

function CartProduct({ product }: ICartProductProps) {
  // no variants to display
  if (product.variants.length === 0) return null;

  const { selectedVariants, variants } = product;

  const maped = selectedVariants.map((selectedVariant) => {
    for (let variant of variants) {
      if (variant.type === selectedVariant.type) {
        return { ...selectedVariant, ...variant };
      }
    }
    return null;
  });

  return (
    <>
      {maped.map((varient) =>
        varient ? (
          <CartProductVariant
            key={varient.type}
            product={product}
            variant={varient}
          />
        ) : null
      )}
    </>
  );
}

export { CartProduct };
