import { ProductItem } from "./product";

export const CartStatuses = ["ACTIVE", "INACTIVE"] as const;

export type CartStatus = (typeof CartStatuses)[number];

export interface CartItem {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  productImage: string;
}

export type ProductCardProps = {
  item: ProductItem;
};
