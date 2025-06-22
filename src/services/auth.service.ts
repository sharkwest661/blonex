// src/services/auth.service.ts
import { api } from "./api";
import { ENDPOINTS } from "./endpoints";
import type {
  User,
  AuthUser,
  LoginPayload,
  RegisterPayload,
  UpdateUserPayload,
} from "./types/user.types";
import type { ApiResponse, AuthTokenResponse } from "./types/api.types";

class AuthService {
  // Login with phone and password/verification code
  async login(
    payload: LoginPayload
  ): Promise<ApiResponse<AuthTokenResponse & { user: AuthUser }>> {
    try {
      const response = await api.post(ENDPOINTS.AUTH.LOGIN, payload);

      // Store token in localStorage (only in browser)
      if (typeof window !== "undefined" && response.data.data.accessToken) {
        localStorage.setItem("auth_token", response.data.data.accessToken);
        localStorage.setItem("refresh_token", response.data.data.refreshToken);
      }

      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  // Register new user
  async register(
    payload: RegisterPayload
  ): Promise<ApiResponse<AuthTokenResponse & { user: AuthUser }>> {
    try {
      const response = await api.post(ENDPOINTS.AUTH.REGISTER, payload);

      // Store token in localStorage if registration is successful (only in browser)
      if (typeof window !== "undefined" && response.data.data.accessToken) {
        localStorage.setItem("auth_token", response.data.data.accessToken);
        localStorage.setItem("refresh_token", response.data.data.refreshToken);
      }

      return response.data;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await api.post(ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear tokens from localStorage (only in browser)
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("refresh_token");
      }
    }
  }

  // Get current user profile
  async getCurrentUser(): Promise<ApiResponse<AuthUser>> {
    try {
      const response = await api.get(ENDPOINTS.AUTH.PROFILE);
      return response.data;
    } catch (error) {
      console.error("Get current user error:", error);
      throw error;
    }
  }

  // Update user profile
  async updateProfile(payload: UpdateUserPayload): Promise<ApiResponse<User>> {
    try {
      const response = await api.patch(ENDPOINTS.AUTH.PROFILE, payload);
      return response.data;
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  }

  // Refresh access token
  async refreshToken(): Promise<ApiResponse<AuthTokenResponse>> {
    try {
      if (typeof window === "undefined") {
        throw new Error("Cannot refresh token on server side");
      }

      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await api.post(ENDPOINTS.AUTH.REFRESH, {
        refreshToken,
      });

      // Update stored tokens
      if (response.data.data.accessToken) {
        localStorage.setItem("auth_token", response.data.data.accessToken);
        localStorage.setItem("refresh_token", response.data.data.refreshToken);
      }

      return response.data;
    } catch (error) {
      console.error("Refresh token error:", error);
      // Clear invalid tokens (only in browser)
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("refresh_token");
      }
      throw error;
    }
  }

  // Send verification code to phone
  async sendVerificationCode(
    phone: string
  ): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await api.post("/auth/send-verification", { phone });
      return response.data;
    } catch (error) {
      console.error("Send verification code error:", error);
      throw error;
    }
  }

  // Verify phone number with code
  async verifyPhone(
    phone: string,
    code: string
  ): Promise<ApiResponse<{ verified: boolean }>> {
    try {
      const response = await api.post("/auth/verify-phone", { phone, code });
      return response.data;
    } catch (error) {
      console.error("Verify phone error:", error);
      throw error;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("auth_token");
  }

  // Get stored auth token
  getAuthToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
  }

  // Clear authentication data
  clearAuthData(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
  }
}

export const authService = new AuthService();
export default authService;
