// src/hooks/useVehicleSearch.ts - FIXED VERSION
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState, useCallback, useEffect } from "react";
import {
  useVehicleFilterStore,
  VehicleFilterState,
} from "@/stores/useVehicleFilterStore";
import { MockPostsService } from "@/services/mockPosts.service";

/**
 * Custom hook for handling vehicle search and filtering
 * Combines state from filter store with query functionality
 */
export const useVehicleSearch = () => {
  // Get filter state from the vehicle filter store
  const filters = useVehicleFilterStore((state: VehicleFilterState) => ({
    make: state.make,
    model: state.model,
    minPrice: state.minPrice,
    maxPrice: state.maxPrice,
    color: state.color,
    fuelType: state.fuelType,
    bodyType: state.bodyType,
    minEngineSize: state.minEngineSize,
    maxEngineSize: state.maxEngineSize,
    minYear: state.minYear,
    maxYear: state.maxYear,
    transmission: state.transmission,
    city: state.city,
    condition: state.condition,
    minMileage: state.minMileage,
    maxMileage: state.maxMileage,
    hasCredit: state.hasCredit,
    hasBarter: state.hasBarter,
    sortBy: state.sortBy,
  }));

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  // Fetch listings with filters and pagination
  const {
    data: listings = [],
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["vehicleListings", "filtered", filters, page, limit],
    queryFn: () =>
      MockPostsService.getFilteredPostsAsync(
        {
          ...filters,
          page,
          limit,
        },
        limit
      ),
    // ✅ FIXED: Replace keepPreviousData with placeholderData in v5
    placeholderData: keepPreviousData,
    staleTime: 1 * 60 * 1000, // 1 minute
  });

  // Get total count from the mock service
  const totalCount = 125; // This would come from the API in a real application

  // Calculate pagination info
  const totalPages = Math.ceil(totalCount / limit);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  // Pagination functions
  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setPage((prev) => prev + 1);
    }
  }, [hasNextPage]);

  const previousPage = useCallback(() => {
    if (hasPreviousPage) {
      setPage((prev) => prev - 1);
    }
  }, [hasPreviousPage]);

  const goToPage = useCallback(
    (pageNumber: number) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setPage(pageNumber);
      }
    },
    [totalPages]
  );

  const changeLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when changing limit
  }, []);

  // Manual refetch function that preserves current filters
  const refetchWithCurrentFilters = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    // Data
    listings,
    totalCount,

    // Loading states
    isLoading,
    isFetching,
    error: error as Error | null,

    // Pagination
    page,
    limit,
    totalPages,
    hasNextPage,
    hasPreviousPage,

    // Actions
    nextPage,
    previousPage,
    goToPage,
    changeLimit,
    refetch: refetchWithCurrentFilters,

    // Current filters (for display/debugging)
    currentFilters: filters,
  };
};

export default useVehicleSearch;
