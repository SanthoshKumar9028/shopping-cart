export interface CartProduct {
  id: string;
  quantity: number;
}

export interface CartState {
  products: CartProduct[];
}
