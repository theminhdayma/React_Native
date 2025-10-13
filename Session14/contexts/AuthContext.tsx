import { UserLogin } from "@/interfaces/auth.interface";
import { AuthStorage } from "@/utils/auth-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserLogin | null;
  token: string | null;
  login: (token: string, user: UserLogin) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserLogin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const [storedToken, storedUser] = await Promise.all([
        AuthStorage.getToken(),
        AuthStorage.getUserData(),
      ]);

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (newToken: string, newUser: UserLogin) => {
    try {
      await AuthStorage.saveAuthData({
        accessToken: newToken,
        refreshToken: "", // Có thể thêm refresh token nếu cần
        user: newUser,
      });

      setToken(newToken);
      setUser(newUser);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AuthStorage.clearAuthData();
      setToken(null);
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    isLoggedIn,
    user,
    token,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
