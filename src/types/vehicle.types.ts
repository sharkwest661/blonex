// src/types/vehicle.ts - Centralized vehicle types
export interface VehicleFeature {
  type: "barter" | "credit" | string; // Allow both specific types and generic strings
  icon: string;
  tooltip: string;
  enabled: boolean;
}

export interface VehicleData {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  currency: string;
  location: string;
  date: string;
  imageUrl: string;
  type: "vip" | "premium" | "recent";
  features: VehicleFeature[];
  href: string;
  hasVipBadge?: boolean;
  hasPremiumBadge?: boolean;

  // Vehicle-specific properties
  year?: number;
  make?: string;
  model?: string;
  mileage?: number;
  engineSize?: number;
  transmission?: string;
  fuelType?: string;
}

// Export additional vehicle-related types
export type VehicleType = "vip" | "premium" | "recent";
export type VehicleCondition = "all" | "new" | "used";
export type VehicleFuelType =
  | "petrol"
  | "diesel"
  | "electric"
  | "hybrid"
  | "gas"
  | "Benzin"
  | "Dizel";
export type VehicleTransmission =
  | "manual"
  | "automatic"
  | "variator"
  | "Avtomat"
  | "Mexaniki";

// Specific feature types for type safety where needed
export type VehicleFeatureType = "barter" | "credit";

// Props interfaces for components
export interface VehicleCardProps {
  vehicle: VehicleData;
  className?: string;
  onFavoriteToggle?: (id: string, isFavorite: boolean) => void;
}

export interface VehicleListingsSectionProps {
  title: string;
  listings: VehicleData[];
  isLoading?: boolean;
  error?: Error | null;
  emptyMessage?: string;
  seeAllLink?: string;
  seeAllText?: string;
  className?: string;
}

// API response types
export interface VehicleSearchParams {
  make?: string | null;
  model?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  color?: string | null;
  fuelType?: VehicleFuelType | null;
  bodyType?: string | null;
  minEngineSize?: number | null;
  maxEngineSize?: number | null;
  minYear?: number | null;
  maxYear?: number | null;
  transmission?: VehicleTransmission | null;
  city?: string | null;
  condition?: VehicleCondition | null;
  minMileage?: number | null;
  maxMileage?: number | null;
  hasCredit?: boolean;
  hasBarter?: boolean;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export interface VehicleSearchResponse {
  vehicles: VehicleData[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Hook options and return types
export interface UseListingsOptions {
  enabled?: boolean;
  staleTime?: number;
  sortBy?: string;
}

export interface UseListingsReturn {
  listings: VehicleData[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
