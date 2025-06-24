// src/hooks/useListings.ts
import { useQuery } from "@tanstack/react-query";
import { MockPostsService } from "@/services/mockPosts.service";
import { Post } from "@/components/PostCard";

interface UseListingsOptions {
  enabled?: boolean;
  staleTime?: number;
  limit?: number;
  sortBy?: string;
}

interface UseListingsReturn {
  listings: Post[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Hook for fetching VIP vehicle listings
 */
export function useVipListings(
  options: UseListingsOptions = {}
): UseListingsReturn {
  const {
    limit = 10,
    sortBy,
    enabled = true,
    staleTime = 5 * 60 * 1000, // 5 minutes
  } = options;

  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["vehicleListings", "vip", limit, sortBy],
    queryFn: () => MockPostsService.getVipPostsAsync(limit, sortBy),
    enabled,
    staleTime,
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    listings: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
}

/**
 * Hook for fetching recent vehicle listings
 */
export function useRecentListings(
  options: UseListingsOptions = {}
): UseListingsReturn {
  const {
    limit = 15,
    sortBy = "date",
    enabled = true,
    staleTime = 5 * 60 * 1000, // 5 minutes
  } = options;

  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["vehicleListings", "recent", limit, sortBy],
    queryFn: () => MockPostsService.getRecentPostsAsync(limit, sortBy),
    enabled,
    staleTime,
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    listings: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
}

/**
 * Hook for fetching filtered vehicle listings
 */
export function useFilteredListings(
  filters: Record<string, any>,
  options: UseListingsOptions = {}
): UseListingsReturn {
  const {
    limit = 20,
    enabled = true,
    staleTime = 5 * 60 * 1000, // 5 minutes
  } = options;

  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["vehicleListings", "filtered", filters, limit],
    queryFn: () => MockPostsService.getFilteredPostsAsync(filters, limit),
    enabled,
    staleTime,
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    listings: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
}

export default {
  useVipListings,
  useRecentListings,
  useFilteredListings,
};
