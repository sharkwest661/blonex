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
  // Get filter state fields individually from the vehicle filter store
  const make = useVehicleFilterStore((state) => state.make);
  const model = useVehicleFilterStore((state) => state.model);
  const minPrice = useVehicleFilterStore((state) => state.minPrice);
  const maxPrice = useVehicleFilterStore((state) => state.maxPrice);
  const color = useVehicleFilterStore((state) => state.color);
  const fuelType = useVehicleFilterStore((state) => state.fuelType);
  const bodyType = useVehicleFilterStore((state) => state.bodyType);
  const minEngineSize = useVehicleFilterStore((state) => state.minEngineSize);
  const maxEngineSize = useVehicleFilterStore((state) => state.maxEngineSize);
  const minYear = useVehicleFilterStore((state) => state.minYear);
  const maxYear = useVehicleFilterStore((state) => state.maxYear);
  const transmission = useVehicleFilterStore((state) => state.transmission);
  const city = useVehicleFilterStore((state) => state.city);
  const condition = useVehicleFilterStore((state) => state.condition);
  const minMileage = useVehicleFilterStore((state) => state.minMileage);
  const maxMileage = useVehicleFilterStore((state) => state.maxMileage);
  const hasCredit = useVehicleFilterStore((state) => state.hasCredit);
  const hasBarter = useVehicleFilterStore((state) => state.hasBarter);
  const sortBy = useVehicleFilterStore((state) => state.sortBy);

  // Compose filters object
  const filters = {
    make,
    model,
    minPrice,
    maxPrice,
    color,
    fuelType,
    bodyType,
    minEngineSize,
    maxEngineSize,
    minYear,
    maxYear,
    transmission,
    city,
    condition,
    minMileage,
    maxMileage,
    hasCredit,
    hasBarter,
    sortBy,
  };

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
