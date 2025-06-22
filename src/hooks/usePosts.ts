// src/hooks/usePosts.ts
import { useQuery } from "@tanstack/react-query";
import { Post } from "@/components/PostCard";
import { MockPostsService } from "@/services/mockPosts.service";

interface UsePostsOptions {
  enabled?: boolean;
  staleTime?: number;
}

interface UsePostsReturn {
  posts: Post[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useVipPosts = (
  count: number = 20,
  options: UsePostsOptions = {}
): UsePostsReturn => {
  const { enabled = true, staleTime = 5 * 60 * 1000 } = options;

  const {
    data: posts = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts", "vip", count],
    queryFn: () => MockPostsService.getVipPostsAsync(count),
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
    posts,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};

export const useRecentPosts = (
  count: number = 20,
  options: UsePostsOptions = {}
): UsePostsReturn => {
  const { enabled = true, staleTime = 5 * 60 * 1000 } = options;

  const {
    data: posts = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts", "recent", count],
    queryFn: () => MockPostsService.getRecentPostsAsync(count),
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
    posts,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};

export const usePremiumPosts = (
  count: number = 20,
  options: UsePostsOptions = {}
): UsePostsReturn => {
  const { enabled = true, staleTime = 5 * 60 * 1000 } = options;

  const {
    data: posts = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts", "premium", count],
    queryFn: () => MockPostsService.getPremiumPostsAsync(count),
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
    posts,
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
