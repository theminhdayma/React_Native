import { LoginResponse } from "@/interfaces/auth.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "access_token";
const USER_KEY = "user_data";

export class AuthStorage {
  // Lưu token và user data
  static async saveAuthData(loginResponse: LoginResponse): Promise<void> {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, loginResponse.accessToken);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(loginResponse.user));
    } catch (error) {
      console.error("Error saving auth data:", error);
      throw error;
    }
  }

  // Lấy token
  static async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  }

  // Lấy user data
  static async getUserData(): Promise<any | null> {
    try {
      const userData = await AsyncStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error getting user data:", error);
      return null;
    }
  }

  // Xóa auth data (logout)
  static async clearAuthData(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error("Error clearing auth data:", error);
      throw error;
    }
  }

  // Kiểm tra đã login chưa
  static async isLoggedIn(): Promise<boolean> {
    try {
      const token = await this.getToken();
      return token !== null;
    } catch (error) {
      console.error("Error checking login status:", error);
      return false;
    }
  }
}
