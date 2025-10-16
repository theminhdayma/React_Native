import { CreateProduct, UpdateProduct } from "@/types/product";
import axiosInstance from "@/utils/axiosInstance";

// Hàm lấy danh sách sản phẩm
export const getAllProducts = async () => {
  const response = await axiosInstance.get("/products/all");

  return response.data.data;
};

// Hàm lấy chi tiết sản phẩm
export const getProductById = async (id: number) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};

// Xóa sản phẩm theo id (DELETE /products/:id)
export const deleteProductById = async (id: number) => {
  const response = await axiosInstance.delete(`products/${id}`);
  return response.data;
};

// Thêm mới sản phẩm (POST /products)
export const createProduct = async (createProduct: CreateProduct) => {
  const response = await axiosInstance.post("products", createProduct);
  return response.data;
};

// Cập nhật sản phẩm theo id (PUT /products/:id)
export const updateProductById = async (
  updateProduct: UpdateProduct,
  id: number
) => {
  const response = await axiosInstance.put(`products/${id}`, updateProduct);
  return response.data;
};
