// src/services/search.service.ts
import { api } from "./api";

export interface SearchSuggestion {
  id: string;
  text: string;
  category?: string;
  type: "product" | "category" | "location";
  count?: number;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  price?: number;
  image?: string;
  category: string;
  location: string;
  createdAt: string;
  isFeatured?: boolean;
  isVip?: boolean;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface SearchFilters {
  category?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "date" | "price_asc" | "price_desc" | "relevance";
  page?: number;
  limit?: number;
}

class SearchService {
  // Get search suggestions for autocomplete
  async getSearchSuggestions(query: string): Promise<SearchSuggestion[]> {
    try {
      const response = await api.get("/search/suggestions", {
        params: { q: query, limit: 10 },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching search suggestions:", error);

      // Return mock data for development
      const mockSuggestions: SearchSuggestion[] = [
        {
          id: "1",
          text: "iPhone 15",
          category: "Elektronika",
          type: "product",
        },
        {
          id: "2",
          text: "Samsung TV",
          category: "Elektronika",
          type: "product",
        },
        { id: "3", text: "Avtomobil", category: "Nəqliyyat", type: "category" },
        { id: "4", text: "Bakı şəhəri", type: "location" },
        { id: "5", text: "Laptop", category: "Elektronika", type: "product" },
        {
          id: "6",
          text: "Mənzil",
          category: "Daşınmaz Əmlak",
          type: "product",
        },
        { id: "7", text: "Telefon", category: "Elektronika", type: "product" },
      ];

      return mockSuggestions.filter((item) =>
        item.text.toLowerCase().includes(query.toLowerCase())
      );
    }
  }

  // Perform search with filters
  async search(
    query: string,
    filters?: SearchFilters
  ): Promise<SearchResponse> {
    try {
      const response = await api.get("/search", {
        params: {
          q: query,
          ...filters,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error performing search:", error);

      // Return mock data for development
      return {
        results: [],
        total: 0,
        page: filters?.page || 1,
        limit: filters?.limit || 20,
        hasMore: false,
      };
    }
  }

  // Get popular search terms
  async getPopularSearches(): Promise<string[]> {
    try {
      const response = await api.get("/search/popular");
      return response.data;
    } catch (error) {
      console.error("Error fetching popular searches:", error);

      // Return mock data for development
      return [
        "iPhone",
        "Avtomobil",
        "Mənzil",
        "Samsung",
        "Laptop",
        "TV",
        "PlayStation",
        "Mətbəx dəsti",
      ];
    }
  }

  // Save search query (for analytics)
  async saveSearchQuery(query: string): Promise<void> {
    try {
      await api.post("/search/analytics", {
        query,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error saving search query:", error);
      // Fail silently for analytics
    }
  }
}

export const searchService = new SearchService();
export default searchService;
