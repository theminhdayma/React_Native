export const ProductStatuses = ["ACTIVE", "INACTIVE"] as const;

export type ProductStatus = (typeof ProductStatuses)[number];

export interface Image {
  id: number;
  url: string;
  publicId: string;
}

export interface Category {
  id: number;
  categoryName: string;
  categoryStatus: ProductStatus;
  categoryDescription: string;
}

export interface ProductItem {
  id: number;
  productCode: string;
  productName: string;
  price: number;
  priceFull: string;
  productStatus: ProductStatus;
  description: string;
  category: Category;
  createdAt: string;
  images: Image[];
}

export type CreateProduct = Omit<ProductItem, "id" | "createdAt">;

export type UpdateProduct = CreateProduct;
