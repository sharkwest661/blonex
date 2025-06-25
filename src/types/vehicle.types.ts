/**
 * Type definitions for vehicle-related entities
 * Used in vehicle listings, filters, and search functionality
 */

export interface Mark {
  id: number;
  name: string;
  count?: number;
}

export interface Model {
  id: number;
  name: string;
  count?: number;
}

export interface Color {
  id: number;
  name: string;
}

export interface FuelType {
  id: number;
  name: string;
}

export interface BodyType {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
}

export interface Feature {
  id: number;
  name: string;
}

export interface VehicleListing {
  id: number;
  title: string;
  price: number;
  currency: string;
  location: string;
  year: number;
  mileage: number;
  engineSize: number;
  transmission: string;
  fuelType: string;
  bodyType: string;
  color: string;
  isNew: boolean;
  isCredit: boolean;
  isBarter: boolean;
  features: number[];
  images: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  markId: number;
  modelId: number;
  cityId: number;
}
