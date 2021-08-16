import { IValidateQuantityOptions } from "./interfaces";

export function validateQuantity(options: IValidateQuantityOptions) {
  const { value, min, max, next } = options;

  if (!isFinite(value)) {
    return;
  }

  if (value < min) {
    next(String(min));
  } else if (value > max) {
    next(String(max));
  } else {
    next(String(value));
  }
}
