export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

export type ProductStatus = 'draft' | 'active' | 'inactive';
export interface Product2 {
  id: string;
  name: string;
  price: number;
  status: ProductStatus;
}
