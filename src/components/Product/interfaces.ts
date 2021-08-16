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
  min: number;
  max: number;
  value: number;
  handleCounterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleIncClick: React.MouseEventHandler<HTMLButtonElement>;
  handleDecClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ICartProductFooterProps extends IProductFooterCounterProps {
  actionType: string;
  product: IProduct & { quantity: number };
  handleUpdateClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface IValidateQuantityOptions {
  value: number;
  min: number;
  max: number;
  next: Function;
}
