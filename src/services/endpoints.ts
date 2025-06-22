// src/services/endpoints.ts

// API endpoint constants
export const ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REGISTER: "/auth/register",
    REFRESH: "/auth/refresh",
    PROFILE: "/auth/profile",
  },

  // Listings
  LISTINGS: {
    BASE: "/listings",
    BY_ID: (id: string) => `/listings/${id}`,
    SEARCH: "/listings/search",
    FEATURED: "/listings/featured",
    VIP: "/listings/vip",
    RECENT: "/listings/recent",
    PREMIUM: "/listings/premium",
    BY_CATEGORY: (categoryId: string) => `/listings/category/${categoryId}`,
    BY_USER: (userId: string) => `/listings/user/${userId}`,
  },

  // Categories
  CATEGORIES: {
    BASE: "/categories",
    BY_ID: (id: string) => `/categories/${id}`,
    BY_SLUG: (slug: string) => `/categories/slug/${slug}`,
  },

  // Search
  SEARCH: {
    BASE: "/search",
    SUGGESTIONS: "/search/suggestions",
    POPULAR: "/search/popular",
    ANALYTICS: "/search/analytics",
  },

  // Users
  USERS: {
    BASE: "/users",
    BY_ID: (id: string) => `/users/${id}`,
    FAVORITES: "/users/favorites",
    PROFILE: "/users/profile",
  },

  // Files
  FILES: {
    UPLOAD: "/files/upload",
    UPLOAD_MULTIPLE: "/files/upload-multiple",
    DELETE: (fileId: string) => `/files/${fileId}`,
  },

  // Locations
  LOCATIONS: {
    CITIES: "/locations/cities",
    REGIONS: "/locations/regions",
  },
} as const;

// Helper function to build URLs with query parameters
export const buildUrl = (
  endpoint: string,
  params?: Record<string, unknown>
): string => {
  if (!params) return endpoint;

  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        // Handle arrays by joining with commas or multiple params
        value.forEach((item) => {
          queryParams.append(key, String(item));
        });
      } else if (typeof value === "object") {
        // Handle nested objects by flattening or JSON stringifying
        if (key === "dateRange" && typeof value === "object") {
          // Special handling for dateRange
          const dateRange = value as { start?: string; end?: string };
          if (dateRange.start) queryParams.append("startDate", dateRange.start);
          if (dateRange.end) queryParams.append("endDate", dateRange.end);
        } else {
          // For other objects, JSON stringify
          queryParams.append(key, JSON.stringify(value));
        }
      } else {
        // Handle primitive values
        queryParams.append(key, String(value));
      }
    }
  });

  const queryString = queryParams.toString();
  return queryString ? `${endpoint}?${queryString}` : endpoint;
};

// Simplified version for basic parameters
export const buildSimpleUrl = (
  endpoint: string,
  params?: Record<string, string | number | boolean>
): string => {
  if (!params) return endpoint;

  const queryString = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");

  return queryString ? `${endpoint}?${queryString}` : endpoint;
};

export default ENDPOINTS;
