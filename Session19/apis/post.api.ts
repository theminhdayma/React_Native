import axiosInstance from "@/utils/axiosInstance";

// Hàm lấy danh sách bài viết
export const getAllPosts = async () => {
    const response = await axiosInstance.get("/articles");
    return response.data;
}

// Hàm lấy chi tiết bài viết
export const getPostById = async (id: number) => {
    const response = await axiosInstance.get(`/articles/${id}`);
    return response.data;
}

// Hàm lấy danh sách bài viết đã lưu của tôi
export const getAllPostsSaved = async () => {
    const response = await axiosInstance.get("/articles/me/saved");
    return response.data;
}

// Hàm cập nhật trạng thái lưu bài viết của ng đó
export const updateSavedPost = async (data: any) => {
    const response = await axiosInstance.post(`/articles/${data.id}/save`, data);
    return response.data;
}

// Hàm lấy danh sách bài viết của cá nhân đó
export const getAllPostsByMe = async () => {
    const response = await axiosInstance.get("/articles/me/all");
    return response.data;
}

// Hàm thêm mới bài viết
export const addPost = async (data: any) => {
    const response = await axiosInstance.post("/articles", data);
    return response.data;
}

// Hàm cập nhật bài viết
export const updatePost = async (data: any) => {
    const response = await axiosInstance.put(`/articles/${data.id}`, data);
    return response.data;
}

// Hàm xóa bài viết
export const deletePost = async (id: string) => {
    const response = await axiosInstance.delete(`/articles/${id}`);
    return response.data;
}