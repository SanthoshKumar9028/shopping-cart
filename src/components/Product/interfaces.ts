import { IProduct } from "../../features/products/interfaces";

export interface IProductProps {
  product: IProduct;
}
export interface ICartProductProps {
  product: IProduct & { quantity: number };
}

export interface IProductDetailsProps {
  product: IProduct;
}

export interface IProductFooterCounterProps {
  product: IProduct;
  quantity: string;
  handleCounterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleIncClick: React.MouseEventHandler<HTMLButtonElement>;
  handleDecClick: React.MouseEventHandler<HTMLButtonElement>;
}
