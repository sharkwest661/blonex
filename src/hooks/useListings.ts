// src/hooks/useListings.ts - FIXED VERSION
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type {
  VehicleData,
  VehicleFeature,
  UseListingsOptions,
  UseListingsReturn,
} from "@/types/vehicle.types";

// Mock data (this would come from your API in a real app)
const mockVipListings: VehicleData[] = [
  {
    id: "vip-1",
    title: "BMW X5",
    price: 45000,
    currency: "₼",
    location: "Bakı",
    date: "28.01.2025, 14:30",
    imageUrl: "/assets/images/example/post2.png",
    type: "vip",
    features: [
      {
        type: "credit",
        icon: "/assets/images/percent.svg",
        tooltip: "Kredit mümkündür",
        enabled: true,
      },
      {
        type: "barter",
        icon: "/assets/images/barter.svg",
        tooltip: "Barter mümkündür",
        enabled: true,
      },
    ] as VehicleFeature[],
    href: "/neqliyyat/bmw-x5-12345",
    hasVipBadge: true,
    hasPremiumBadge: true,
    year: 2022,
    make: "BMW",
    model: "X5",
    mileage: 15000,
    engineSize: 3.0,
    transmission: "Avtomat",
    fuelType: "Benzin",
  },
  // Add more mock VIP listings...
];

const mockRecentListings: VehicleData[] = [
  {
    id: "recent-1",
    title: "Toyota Camry",
    price: 28000,
    currency: "₼",
    location: "Bakı",
    date: "28.01.2025, 15:45",
    imageUrl: "/assets/images/example/post2.png",
    type: "recent",
    features: [
      {
        type: "credit",
        icon: "/assets/images/percent.svg",
        tooltip: "Kredit mümkündür",
        enabled: true,
      },
    ] as VehicleFeature[],
    href: "/neqliyyat/toyota-camry-67890",
    year: 2021,
    make: "Toyota",
    model: "Camry",
    mileage: 32000,
    engineSize: 2.5,
    transmission: "Avtomat",
    fuelType: "Benzin",
  },
  // Add more mock recent listings...
];

// ✅ FIX: Memoized API functions to prevent recreation on every render
const fetchVipListings = async (): Promise<VehicleData[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockVipListings;
};

const fetchRecentListings = async (options?: {
  sortBy?: string;
}): Promise<VehicleData[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Sort listings based on options
  let listings = [...mockRecentListings];

  if (options?.sortBy) {
    listings = sortListings(listings, options.sortBy);
  }

  return listings;
};

// ✅ FIX: Stable sort function that doesn't change references
const sortListings = (
  listings: VehicleData[],
  sortBy: string
): VehicleData[] => {
  const sortedListings = [...listings];

  switch (sortBy) {
    case "price_asc":
      return sortedListings.sort((a, b) => a.price - b.price);
    case "price_desc":
      return sortedListings.sort((a, b) => b.price - a.price);
    case "mileage":
      return sortedListings.sort((a, b) => (a.mileage || 0) - (b.mileage || 0));
    case "year":
      return sortedListings.sort((a, b) => (b.year || 0) - (a.year || 0));
    case "date":
    default:
      // Default is already sorted by date
      return sortedListings;
  }
};

// ✅ FIX: VIP listings hook with stable configuration
export const useVipListings = (
  options: UseListingsOptions = {}
): UseListingsReturn => {
  // ✅ FIX: Memoize options to prevent unnecessary re-fetches
  const memoizedOptions = useMemo(
    () => ({
      enabled: options.enabled ?? true,
      staleTime: options.staleTime ?? 5 * 60 * 1000,
    }),
    [options.enabled, options.staleTime]
  );

  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["vipListings"], // ✅ FIX: Stable query key
    queryFn: fetchVipListings,
    enabled: memoizedOptions.enabled,
    staleTime: memoizedOptions.staleTime,
    // ✅ FIX: Add refetchOnWindowFocus: false to prevent unnecessary refetches
    refetchOnWindowFocus: false,
    // ✅ FIX: Add retry configuration
    retry: 2,
    retryDelay: 1000,
  });

  // ✅ FIX: Memoize return object to prevent unnecessary re-renders
  return useMemo(
    () => ({
      listings: data,
      isLoading,
      error: error as Error | null,
      refetch,
    }),
    [data, isLoading, error, refetch]
  );
};

// ✅ FIX: Recent listings hook with stable configuration
export const useRecentListings = (
  options: UseListingsOptions = {}
): UseListingsReturn => {
  // ✅ FIX: Memoize options and provide stable defaults
  const memoizedOptions = useMemo(
    () => ({
      enabled: options.enabled ?? true,
      staleTime: options.staleTime ?? 5 * 60 * 1000,
      sortBy: options.sortBy ?? "date",
    }),
    [options.enabled, options.staleTime, options.sortBy]
  );

  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    // ✅ FIX: Include sortBy in query key for proper cache invalidation
    queryKey: ["recentListings", memoizedOptions.sortBy],
    queryFn: () => fetchRecentListings({ sortBy: memoizedOptions.sortBy }),
    enabled: memoizedOptions.enabled,
    staleTime: memoizedOptions.staleTime,
    // ✅ FIX: Prevent unnecessary refetches
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
  });

  // ✅ FIX: Memoize return object
  return useMemo(
    () => ({
      listings: data,
      isLoading,
      error: error as Error | null,
      refetch,
    }),
    [data, isLoading, error, refetch]
  );
};

// ✅ FIX: Export stable object to prevent import issues
const useListingsHooks = {
  useVipListings,
  useRecentListings,
};

export default useListingsHooks;
