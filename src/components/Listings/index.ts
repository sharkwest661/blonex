// src/components/Listings/index.ts - FIXED VERSION
export { VehicleCard } from "./VehicleCard";
export { VehicleListingsSection } from "./VehicleListingsSection";

// ✅ FIX: Export all types from centralized location to prevent conflicts
export type {
  VehicleData,
  VehicleFeature,
  VehicleCardProps,
  VehicleListingsSectionProps,
  VehicleType,
  VehicleCondition,
  VehicleFuelType,
  VehicleTransmission,
} from "@/types/vehicle.types";
