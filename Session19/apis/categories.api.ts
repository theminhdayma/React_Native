import axiosInstance from "@/utils/axiosInstance"

// API lấy danh sách danh mục bài viết
export const getAllCategories = async () => {
    const response = await axiosInstance.get("/article-categories/all");
    
    return response.data;
}