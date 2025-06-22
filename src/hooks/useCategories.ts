// src/hooks/useCategories.ts
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/types/category.types";
import { CATEGORIES } from "@/constants/categories";

// Mock API service for categories
const categoriesService = {
  async getAll(): Promise<Category[]> {
    // In a real app, this would be an API call
    // For now, return the static categories with a delay to simulate API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(CATEGORIES);
      }, 500);
    });
  },

  async getById(id: string): Promise<Category | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const category = CATEGORIES.find((cat) => cat.id === id);
        resolve(category || null);
      }, 200);
    });
  },

  async getBySlug(slug: string): Promise<Category | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const category = CATEGORIES.find((cat) => cat.slug === slug);
        resolve(category || null);
      }, 200);
    });
  },
};

interface UseCategoriesOptions {
  enabled?: boolean;
  staleTime?: number;
}

interface UseCategoriesReturn {
  categories: Category[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useCategories = (
  options: UseCategoriesOptions = {}
): UseCategoriesReturn => {
  const { enabled = true, staleTime = 10 * 60 * 1000 } = options;

  const {
    data: categories = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: categoriesService.getAll,
    enabled,
    staleTime, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors
      if (error && "status" in error && typeof error.status === "number") {
        if (error.status >= 400 && error.status < 500) {
          return false;
        }
      }
      return failureCount < 3;
    },
  });

  return {
    categories,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};

interface UseCategoryOptions {
  enabled?: boolean;
}

interface UseCategoryReturn {
  category: Category | null;
  isLoading: boolean;
  error: Error | null;
}

export const useCategory = (
  id: string,
  options: UseCategoryOptions = {}
): UseCategoryReturn => {
  const { enabled = true } = options;

  const {
    data: category = null,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["category", id],
    queryFn: () => categoriesService.getById(id),
    enabled: enabled && !!id,
    staleTime: 10 * 60 * 1000,
  });

  return {
    category,
    isLoading,
    error: error as Error | null,
  };
};

export const useCategoryBySlug = (
  slug: string,
  options: UseCategoryOptions = {}
): UseCategoryReturn => {
  const { enabled = true } = options;

  const {
    data: category = null,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["category", "slug", slug],
    queryFn: () => categoriesService.getBySlug(slug),
    enabled: enabled && !!slug,
    staleTime: 10 * 60 * 1000,
  });

  return {
    category,
    isLoading,
    error: error as Error | null,
  };
};

export default useCategories;
