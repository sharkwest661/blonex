// src/hooks/usePosts.ts - CORRECTED VERSION
import { useQuery } from "@tanstack/react-query";
import type { Post } from "@/types/post.types";
import { MockPostsService } from "@/services/mockPosts.service";

interface UsePostsOptions {
  enabled?: boolean;
  staleTime?: number;
  sortBy?: string;
}

interface UsePostsReturn {
  posts: Post[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

// ✅ FIX: Maintain original signatures with count parameter
export const useVipPosts = (
  count: number = 20,
  options: UsePostsOptions = {}
): UsePostsReturn => {
  const { enabled = true, staleTime = 5 * 60 * 1000, sortBy } = options;

  const {
    data: posts = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts", "vip", count, sortBy],
    queryFn: () => MockPostsService.getVipPostsAsync(count, sortBy),
    enabled,
    staleTime,
    gcTime: 10 * 60 * 1000, // 10 minutes
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
    posts, // ✅ FIX: Now returns Post[] type
    isLoading,
    error: error as Error | null,
    refetch,
  };
};

export const useRecentPosts = (
  count: number = 20,
  options: UsePostsOptions = {}
): UsePostsReturn => {
  const { enabled = true, staleTime = 5 * 60 * 1000, sortBy } = options;

  const {
    data: posts = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts", "recent", count, sortBy],
    queryFn: () => MockPostsService.getRecentPostsAsync(count, sortBy),
    enabled,
    staleTime,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error && "status" in error && typeof error.status === "number") {
        if (error.status >= 400 && error.status < 500) {
          return false;
        }
      }
      return failureCount < 3;
    },
  });

  return {
    posts, // ✅ FIX: Now returns Post[] type
    isLoading,
    error: error as Error | null,
    refetch,
  };
};

export const usePremiumPosts = (
  count: number = 20,
  options: UsePostsOptions = {}
): UsePostsReturn => {
  const { enabled = true, staleTime = 5 * 60 * 1000, sortBy } = options;

  const {
    data: posts = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts", "premium", count, sortBy],
    queryFn: () => MockPostsService.getPremiumPostsAsync(count, sortBy),
    enabled,
    staleTime,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error && "status" in error && typeof error.status === "number") {
        if (error.status >= 400 && error.status < 500) {
          return false;
        }
      }
      return failureCount < 3;
    },
  });

  return {
    posts, // ✅ FIX: Now returns Post[] type
    isLoading,
    error: error as Error | null,
    refetch,
  };
};

export default {
  useVipPosts,
  useRecentPosts,
  usePremiumPosts,
};
