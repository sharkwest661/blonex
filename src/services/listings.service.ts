// src/services/listings.service.ts
import { api } from "./api";
import { ENDPOINTS, buildUrl } from "./endpoints";
import type {
  Listing,
  ListingSummary,
  CreateListingPayload,
  UpdateListingPayload,
  ListingFilters,
  ListingStats,
} from "./types/listing.types";
import type {
  ApiResponse,
  PaginatedResponse,
  SearchParams,
} from "./types/api.types";

// Helper function to serialize listing filters for API calls
const serializeFilters = (
  filters: Partial<ListingFilters & SearchParams>
): Record<string, unknown> => {
  const serialized: Record<string, unknown> = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      switch (key) {
        case "condition":
        case "type":
        case "features":
          // Handle arrays by joining with commas
          if (Array.isArray(value)) {
            serialized[key] = value.join(",");
          } else if (typeof value === "object") {
            serialized[key] = JSON.stringify(value);
          } else {
            serialized[key] = value;
          }
          break;
        case "dateRange":
          // Flatten dateRange object
          if (typeof value === "object" && value !== null) {
            const dateRange = value as { start?: string; end?: string };
            if (dateRange.start) serialized["startDate"] = dateRange.start;
            if (dateRange.end) serialized["endDate"] = dateRange.end;
          }
          break;
        default:
          // Handle primitive values directly
          serialized[key] = value;
      }
    }
  });

  return serialized;
};

class ListingsService {
  // Get all listings with optional filters
  async getAllListings(
    filters?: ListingFilters,
    pagination?: SearchParams
  ): Promise<PaginatedResponse<ListingSummary>> {
    try {
      const combinedParams = { ...filters, ...pagination };
      const serializedParams = serializeFilters(combinedParams);
      const url = buildUrl(ENDPOINTS.LISTINGS.BASE, serializedParams);
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Get all listings error:", error);
      throw error;
    }
  }

  // Get listing by ID
  async getListingById(id: string): Promise<ApiResponse<Listing>> {
    try {
      const response = await api.get(ENDPOINTS.LISTINGS.BY_ID(id));
      return response.data;
    } catch (error) {
      console.error("Get listing by ID error:", error);
      throw error;
    }
  }

  // Get featured/VIP listings
  async getFeaturedListings(
    limit?: number
  ): Promise<ApiResponse<ListingSummary[]>> {
    try {
      const url = buildUrl(
        ENDPOINTS.LISTINGS.FEATURED,
        limit ? { limit } : undefined
      );
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Get featured listings error:", error);
      throw error;
    }
  }

  // Get VIP listings
  async getVipListings(limit?: number): Promise<ApiResponse<ListingSummary[]>> {
    try {
      const url = buildUrl(
        ENDPOINTS.LISTINGS.VIP,
        limit ? { limit } : undefined
      );
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Get VIP listings error:", error);
      throw error;
    }
  }

  // Get recent listings
  async getRecentListings(
    limit?: number
  ): Promise<ApiResponse<ListingSummary[]>> {
    try {
      const url = buildUrl(
        ENDPOINTS.LISTINGS.RECENT,
        limit ? { limit } : undefined
      );
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Get recent listings error:", error);
      throw error;
    }
  }

  // Get premium listings
  async getPremiumListings(
    limit?: number
  ): Promise<ApiResponse<ListingSummary[]>> {
    try {
      const url = buildUrl(
        ENDPOINTS.LISTINGS.PREMIUM,
        limit ? { limit } : undefined
      );
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Get premium listings error:", error);
      throw error;
    }
  }

  // Get listings by category
  async getListingsByCategory(
    categoryId: string,
    pagination?: SearchParams
  ): Promise<PaginatedResponse<ListingSummary>> {
    try {
      const serializedParams = pagination
        ? serializeFilters(pagination)
        : undefined;
      const url = buildUrl(
        ENDPOINTS.LISTINGS.BY_CATEGORY(categoryId),
        serializedParams
      );
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Get listings by category error:", error);
      throw error;
    }
  }

  // Get user's listings
  async getUserListings(
    userId: string,
    pagination?: SearchParams
  ): Promise<PaginatedResponse<ListingSummary>> {
    try {
      const serializedParams = pagination
        ? serializeFilters(pagination)
        : undefined;
      const url = buildUrl(
        ENDPOINTS.LISTINGS.BY_USER(userId),
        serializedParams
      );
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Get user listings error:", error);
      throw error;
    }
  }

  // Search listings
  async searchListings(
    searchParams: SearchParams
  ): Promise<PaginatedResponse<ListingSummary>> {
    try {
      const serializedParams = serializeFilters(searchParams);
      const url = buildUrl(ENDPOINTS.LISTINGS.SEARCH, serializedParams);
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Search listings error:", error);
      throw error;
    }
  }

  // Create new listing
  async createListing(
    payload: CreateListingPayload
  ): Promise<ApiResponse<Listing>> {
    try {
      const formData = new FormData();

      // Add text fields
      Object.entries(payload).forEach(([key, value]) => {
        if (key !== "images" && value !== undefined) {
          formData.append(
            key,
            typeof value === "object" ? JSON.stringify(value) : String(value)
          );
        }
      });

      // Add images
      if (payload.images && payload.images.length > 0) {
        payload.images.forEach((image, index) => {
          if (image instanceof File) {
            formData.append(`images`, image);
          } else {
            formData.append(`existingImages[${index}]`, image);
          }
        });
      }

      const response = await api.post(ENDPOINTS.LISTINGS.BASE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Create listing error:", error);
      throw error;
    }
  }

  // Update listing
  async updateListing(
    payload: UpdateListingPayload
  ): Promise<ApiResponse<Listing>> {
    try {
      const { id, ...updateData } = payload;
      const response = await api.patch(
        ENDPOINTS.LISTINGS.BY_ID(id),
        updateData
      );
      return response.data;
    } catch (error) {
      console.error("Update listing error:", error);
      throw error;
    }
  }

  // Delete listing
  async deleteListing(id: string): Promise<ApiResponse<{ success: boolean }>> {
    try {
      const response = await api.delete(ENDPOINTS.LISTINGS.BY_ID(id));
      return response.data;
    } catch (error) {
      console.error("Delete listing error:", error);
      throw error;
    }
  }

  // Add listing to favorites
  async addToFavorites(
    listingId: string
  ): Promise<ApiResponse<{ success: boolean }>> {
    try {
      const response = await api.post(
        `${ENDPOINTS.USERS.FAVORITES}/${listingId}`
      );
      return response.data;
    } catch (error) {
      console.error("Add to favorites error:", error);
      throw error;
    }
  }

  // Remove listing from favorites
  async removeFromFavorites(
    listingId: string
  ): Promise<ApiResponse<{ success: boolean }>> {
    try {
      const response = await api.delete(
        `${ENDPOINTS.USERS.FAVORITES}/${listingId}`
      );
      return response.data;
    } catch (error) {
      console.error("Remove from favorites error:", error);
      throw error;
    }
  }

  // Get user's favorite listings
  async getFavoriteListings(
    pagination?: SearchParams
  ): Promise<PaginatedResponse<ListingSummary>> {
    try {
      const serializedParams = pagination
        ? serializeFilters(pagination)
        : undefined;
      const url = buildUrl(ENDPOINTS.USERS.FAVORITES, serializedParams);
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Get favorite listings error:", error);
      throw error;
    }
  }

  // Get listing statistics
  async getListingStats(): Promise<ApiResponse<ListingStats>> {
    try {
      const response = await api.get(`${ENDPOINTS.LISTINGS.BASE}/stats`);
      return response.data;
    } catch (error) {
      console.error("Get listing stats error:", error);
      throw error;
    }
  }

  // Increment listing view count
  async incrementViewCount(id: string): Promise<void> {
    try {
      await api.post(`${ENDPOINTS.LISTINGS.BY_ID(id)}/view`);
    } catch (error) {
      console.error("Increment view count error:", error);
      // Don't throw error for view count increment
    }
  }

  // Get similar listings
  async getSimilarListings(
    id: string,
    limit: number = 10
  ): Promise<ApiResponse<ListingSummary[]>> {
    try {
      const url = buildUrl(`${ENDPOINTS.LISTINGS.BY_ID(id)}/similar`, {
        limit,
      });
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Get similar listings error:", error);
      throw error;
    }
  }
}

export const listingsService = new ListingsService();
export default listingsService;
