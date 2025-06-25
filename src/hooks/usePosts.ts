// src/hooks/usePosts.ts - FIXED VERSION
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

// VIP Posts hook
export const useVipPosts = (options?: UsePostsOptions): UsePostsReturn => {
  const {
    data: posts = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts", "vip"],
    queryFn: () => MockPostsService.getVipPosts(),
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5 minutes
  });

  return {
    posts, // ✅ FIX: Now properly typed as Post[]
    isLoading,
    error: error as Error | null,
    refetch,
  };
};

// Recent Posts hook
export const useRecentPosts = (options?: UsePostsOptions): UsePostsReturn => {
  const {
    data: posts = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts", "recent", options?.sortBy],
    queryFn: () => MockPostsService.getRecentPosts(20, options?.sortBy),
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
  });

  return {
    posts, // ✅ FIX: Now properly typed as Post[]
    isLoading,
    error: error as Error | null,
    refetch,
  };
};

// Premium Posts hook
export const usePremiumPosts = (options?: UsePostsOptions): UsePostsReturn => {
  const {
    data: posts = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts", "premium"],
    queryFn: () => MockPostsService.getPremiumPosts(),
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
  });

  return {
    posts, // ✅ FIX: Now properly typed as Post[]
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
