// src/services/api.ts
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosProgressEvent,
} from "axios";

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const API_TIMEOUT = 10000; // 10 seconds

// Create axios instance
export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth tokens
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        // You can add redirect logic here if needed
        // window.location.href = '/login';
      }
    }

    // Network error
    if (!error.response) {
      console.error("Network Error:", error.message);
    }

    return Promise.reject(error);
  }
);

// API Helper functions
export const apiRequest = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    api.get(url, config).then((response) => response.data),

  post: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> =>
    api.post(url, data, config).then((response) => response.data),

  put: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => api.put(url, data, config).then((response) => response.data),

  patch: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> =>
    api.patch(url, data, config).then((response) => response.data),

  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    api.delete(url, config).then((response) => response.data),
};

export const uploadFile = async (
  url: string,
  file: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
): Promise<unknown> => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

// Auth helpers
export const setAuthToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", token);
  }
};

export const removeAuthToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token");
  }
};

export const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token");
  }
  return null;
};

// Default export
export default api;
