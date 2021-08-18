import {
  ISelectedProducts,
  ISelectedVariant,
} from "../../features/cart/interfaces";
import { IProduct, IVariant } from "../../features/products/interfaces";

export interface IProductProps {
  product: IProduct;
}

export interface ICartProductProps {
  product: IProduct & ISelectedProducts;
}

export interface IProductDetailsProps {
  product: IProduct;
  currentVariant: IVariant;
}

export interface IVariantsSelectProps {
  variants: IVariant[];
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
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
  totalQuantity: number;
  currentVariant: IVariant;
  product: IProduct & ISelectedProducts;
  handleUpdateClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface IValidateQuantityOptions {
  value: number;
  min: number;
  max: number;
  next: Function;
}
