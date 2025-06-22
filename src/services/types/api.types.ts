// src/services/types/api.types.ts

// Generic API Response wrapper
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

// Paginated response
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Error response
export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  success: false;
  timestamp: string;
}

// Request parameters for pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// Search parameters - made more flexible
export interface SearchParams extends PaginationParams {
  q?: string;
  category?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  features?: string[] | Record<string, unknown>;
  [key: string]: unknown; // Allow additional dynamic parameters
}

// File upload response
export interface FileUploadResponse {
  fileId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
}

// Authentication token response
export interface AuthTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: "Bearer";
}

// Request/Response status types
export type RequestStatus = "idle" | "loading" | "success" | "error";

// HTTP status codes
export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}

// API endpoint types
export type ApiEndpoint = string;
export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// Query options for React Query
export interface QueryOptions {
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  refetchOnWindowFocus?: boolean;
  retry?: boolean | number;
}

export default ApiResponse;
