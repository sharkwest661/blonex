// src/services/categories.service.ts
import { api } from "./api";
import { ENDPOINTS } from "./endpoints";
import type { Category } from "../types/category.types";
import type { ApiResponse, PaginatedResponse } from "./types/api.types";

// Category with listing count
export interface CategoryWithCount extends Category {
  listingCount: number;
  subcategories?: CategoryWithCount[];
}

// Category statistics
export interface CategoryStats {
  totalCategories: number;
  categoriesWithListings: number;
  mostPopularCategory: {
    id: string;
    name: string;
    listingCount: number;
  };
  listingsByCategory: Record<string, number>;
}

class CategoriesService {
  // Get all categories
  async getAllCategories(): Promise<ApiResponse<CategoryWithCount[]>> {
    try {
      const response = await api.get(ENDPOINTS.CATEGORIES.BASE);
      return response.data;
    } catch (error) {
      console.error("Get all categories error:", error);
      throw error;
    }
  }

  // Get category by ID
  async getCategoryById(id: string): Promise<ApiResponse<CategoryWithCount>> {
    try {
      const response = await api.get(ENDPOINTS.CATEGORIES.BY_ID(id));
      return response.data;
    } catch (error) {
      console.error("Get category by ID error:", error);
      throw error;
    }
  }

  // Get category by slug
  async getCategoryBySlug(
    slug: string
  ): Promise<ApiResponse<CategoryWithCount>> {
    try {
      const response = await api.get(ENDPOINTS.CATEGORIES.BY_SLUG(slug));
      return response.data;
    } catch (error) {
      console.error("Get category by slug error:", error);
      throw error;
    }
  }

  // Get main categories (top-level only)
  async getMainCategories(): Promise<ApiResponse<CategoryWithCount[]>> {
    try {
      const response = await api.get(`${ENDPOINTS.CATEGORIES.BASE}?level=main`);
      return response.data;
    } catch (error) {
      console.error("Get main categories error:", error);
      throw error;
    }
  }

  // Get subcategories for a parent category
  async getSubcategories(
    parentId: string
  ): Promise<ApiResponse<CategoryWithCount[]>> {
    try {
      const response = await api.get(
        `${ENDPOINTS.CATEGORIES.BASE}?parentId=${parentId}`
      );
      return response.data;
    } catch (error) {
      console.error("Get subcategories error:", error);
      throw error;
    }
  }

  // Get popular categories (by listing count)
  async getPopularCategories(
    limit: number = 10
  ): Promise<ApiResponse<CategoryWithCount[]>> {
    try {
      const response = await api.get(
        `${ENDPOINTS.CATEGORIES.BASE}?popular=true&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error("Get popular categories error:", error);
      throw error;
    }
  }

  // Search categories
  async searchCategories(
    query: string
  ): Promise<ApiResponse<CategoryWithCount[]>> {
    try {
      const response = await api.get(
        `${ENDPOINTS.CATEGORIES.BASE}/search?q=${encodeURIComponent(query)}`
      );
      return response.data;
    } catch (error) {
      console.error("Search categories error:", error);
      throw error;
    }
  }

  // Get category statistics
  async getCategoryStats(): Promise<ApiResponse<CategoryStats>> {
    try {
      const response = await api.get(`${ENDPOINTS.CATEGORIES.BASE}/stats`);
      return response.data;
    } catch (error) {
      console.error("Get category stats error:", error);
      throw error;
    }
  }

  // Create category (admin only)
  async createCategory(
    category: Omit<Category, "id">
  ): Promise<ApiResponse<Category>> {
    try {
      const response = await api.post(ENDPOINTS.CATEGORIES.BASE, category);
      return response.data;
    } catch (error) {
      console.error("Create category error:", error);
      throw error;
    }
  }

  // Update category (admin only)
  async updateCategory(
    id: string,
    updates: Partial<Category>
  ): Promise<ApiResponse<Category>> {
    try {
      const response = await api.patch(ENDPOINTS.CATEGORIES.BY_ID(id), updates);
      return response.data;
    } catch (error) {
      console.error("Update category error:", error);
      throw error;
    }
  }

  // Delete category (admin only)
  async deleteCategory(id: string): Promise<ApiResponse<{ success: boolean }>> {
    try {
      const response = await api.delete(ENDPOINTS.CATEGORIES.BY_ID(id));
      return response.data;
    } catch (error) {
      console.error("Delete category error:", error);
      throw error;
    }
  }

  // Get category tree (hierarchical structure)
  async getCategoryTree(): Promise<ApiResponse<CategoryWithCount[]>> {
    try {
      const response = await api.get(`${ENDPOINTS.CATEGORIES.BASE}/tree`);
      return response.data;
    } catch (error) {
      console.error("Get category tree error:", error);
      throw error;
    }
  }
}

export const categoriesService = new CategoriesService();
export default categoriesService;
