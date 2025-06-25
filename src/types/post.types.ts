// src/types/post.types.ts - UNIFIED TYPES
export interface PostFeature {
  type: "barter" | "credit";
  icon: string;
  tooltip: string;
  enabled: boolean;
}

export interface Post {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  currency: string;
  location: string;
  date: string;
  imageUrl: string;
  type: "vip" | "premium" | "recent";
  features: PostFeature[];
  href: string;
  hasVipBadge?: boolean;
  hasPremiumBadge?: boolean;
  isStore?: boolean;
  storeInfo?: {
    name: string;
    logo: string;
    href: string;
  };
}

// Vehicle extends Post for vehicle-specific properties
export interface VehiclePost extends Post {
  year?: number;
  make?: string;
  model?: string;
  mileage?: number;
  engineSize?: number;
  transmission?: string;
  fuelType?: string;
}

// Legacy alias for backward compatibility
export type VehicleData = VehiclePost;

// Feature type utilities
export const createFeature = (
  type: "barter" | "credit",
  icon: string,
  tooltip: string,
  enabled: boolean = true
): PostFeature => ({
  type,
  icon,
  tooltip,
  enabled,
});

// Type guards
export const isValidFeatureType = (
  type: string
): type is "barter" | "credit" => {
  return type === "barter" || type === "credit";
};

export const sanitizeFeatures = (features: any[]): PostFeature[] => {
  return features
    .filter((feature) => isValidFeatureType(feature.type))
    .map((feature) => ({
      type: feature.type as "barter" | "credit",
      icon: feature.icon,
      tooltip: feature.tooltip,
      enabled: feature.enabled ?? true,
    }));
};
