// src/hooks/useListings.ts - FIXED VERSION
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { VehiclePost as VehicleData } from "@/types/post.types";
import type {
  UseListingsOptions,
  UseListingsReturn,
} from "@/types/vehicle.types";

// Mock data using unified types
const createMockVehicleData = (
  id: string,
  type: "vip" | "premium" | "recent"
): VehicleData => ({
  id,
  title: type === "vip" ? "BMW X5" : "Toyota Camry",
  price: type === "vip" ? 45000 : 28000,
  currency: "₼",
  location: "Bakı",
  date: "28.01.2025, 14:30",
  imageUrl: "/assets/images/example/post2.png",
  type,
  features: [
    {
      type: "credit",
      icon: "/assets/images/percent.svg",
      tooltip: "Kredit mümkündür",
      enabled: true,
    },
    ...(type === "vip"
      ? [
          {
            type: "barter" as const,
            icon: "/assets/images/barter.svg",
            tooltip: "Barter mümkündür",
            enabled: true,
          },
        ]
      : []),
  ],
  href: `/neqliyyat/${type === "vip" ? "bmw-x5" : "toyota-camry"}-${id}`,
  hasVipBadge: type === "vip",
  hasPremiumBadge: type === "vip" || type === "premium",
  year: type === "vip" ? 2022 : 2021,
  make: type === "vip" ? "BMW" : "Toyota",
  model: type === "vip" ? "X5" : "Camry",
  mileage: type === "vip" ? 15000 : 32000,
  engineSize: type === "vip" ? 3.0 : 2.5,
  transmission: "Avtomat",
  fuelType: "Benzin",
});

const mockVipListings: VehicleData[] = Array.from({ length: 8 }, (_, i) =>
  createMockVehicleData(`vip-${i + 1}`, "vip")
);

const mockRecentListings: VehicleData[] = Array.from({ length: 12 }, (_, i) =>
  createMockVehicleData(`recent-${i + 1}`, "recent")
);

// Memoized API functions
const fetchVipListings = async (): Promise<VehicleData[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockVipListings;
};

const fetchRecentListings = async (options?: {
  sortBy?: string;
}): Promise<VehicleData[]> => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  let listings = [...mockRecentListings];

  // Apply sorting
  if (options?.sortBy) {
    listings = listings.sort((a, b) => {
      switch (options.sortBy) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "year":
          return (b.year || 0) - (a.year || 0);
        case "mileage":
          return (a.mileage || 0) - (b.mileage || 0);
        case "date":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  }

  return listings;
};

// Hook implementations
export const useVipListings = (
  options?: UseListingsOptions
): UseListingsReturn => {
  const {
    data: listings = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["listings", "vip"],
    queryFn: fetchVipListings,
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
  });

  return {
    listings,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};

export const useRecentListings = (
  options?: UseListingsOptions
): UseListingsReturn => {
  const sortBy = options?.sortBy;

  const {
    data: listings = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["listings", "recent", sortBy],
    queryFn: () => fetchRecentListings({ sortBy }),
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
  });

  return {
    listings,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};

export const usePremiumListings = (
  options?: UseListingsOptions
): UseListingsReturn => {
  const {
    data: listings = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["listings", "premium"],
    queryFn: fetchVipListings, // Reuse for now
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
  });

  return {
    listings,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
