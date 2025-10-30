import { ContactFormData } from "@/types";
import { axiosInstance } from "@/utils/axios-instance"

// Hàm lấy danh sách liên hệ
export const getAllContacts = async () => {
    const response = await axiosInstance.get("/contacts");    
    return response.data;
}

// Hàm lấy danh sách liên hệ bị chặn
export const getContactBlocked = async () => {
    const response = await axiosInstance.get("/contacts/blocked");    
    return response.data;
}

// Hàm lấy chi tiết 1 liên hệ
export const getContactById = async (id: number) => {
    const response = await axiosInstance.get(`/contacts/${id}`);
    return response.data;
}

// Hàm thêm mới 1 liên hệ
export const addContact = async (data: ContactFormData) => {
    const response = await axiosInstance.post("/contacts", data);
    return response.data;
}

// Hàm cập nhật 1 liên hệ
export const updateContact = async (id: number, data: ContactFormData) => {
    const response = await axiosInstance.put(`/contacts/${id}`, data);
    return response.data;
}

// Hàm xóa 1 liên hệ
export const deleteContactById = async (id: number) => {
    const response = await axiosInstance.delete(`/contacts/${id}`);
    return response.data;
}

// Hàm cập nhật trạng thái
export const updateToggleBlock = async (id: number) => {
    const response = await axiosInstance.patch(`/contacts/${id}/toggle-block`);
    return response.data;
}