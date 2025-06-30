// src/components/Listings/VehicleCard/index.ts - FIXED VERSION
export { default as VehicleCard } from "./VehicleCard";
export { default } from "./VehicleCard";

// ✅ FIX: Export types from centralized location to prevent conflicts
export type {
  VehicleData,
  VehicleFeature,
  VehicleCardProps,
} from "@/types/vehicle.types";
