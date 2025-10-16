import axiosInstance from "@/utils/axiosInstance";

export const getCarts = async () => {
  const response = await axiosInstance.get("/carts");
  return response.data;
};

// Hàm thêm sản phẩm vào giỏ hàng
export const addProductToCart = async (data: any) => {
  const response = await axiosInstance.post("/carts/add", data);
  return response.data;
};

// Hàm cập nhật số lượng trong giỏ hàng
export const updateQuantityCart = async ({
  id,
  ...data
}: {
  id: number;
  quantity: number;
}) => {
  // Chỉ gửi { quantity: ... } trong body
  const response = await axiosInstance.patch(`/carts/items/${id}`, data);
  return response.data;
};

// Hàm xóa một item khỏi giỏ hàng
export const deleteCartItem = async (cartItemId: number) => {
  const response = await axiosInstance.delete(`/carts/items/${cartItemId}`);
  return response.data;
};

// Hàm xóa toàn bộ sản phẩm khỏi giỏ hàng
export const deleteAllCart = async () => {
  const response = await axiosInstance.delete("/carts/clear");
  return response.data;
};
