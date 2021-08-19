export interface IVariant {
  type: string;
  price: number;
  totalQuantity: number;
  imageUrl: string;
}

export interface IProduct {
  id: string;
  name: string;
  variants: IVariant[];
  isDivisible: boolean;
  description: string;
}

export interface IFilterArgs {
  products: IProduct[];
  cb: (a: IVariant) => boolean;
  performFilter?: boolean;
}
