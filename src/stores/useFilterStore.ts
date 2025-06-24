// src/stores/useFilterStore.ts
import { create } from "zustand";

interface FilterState {
  // Sorting
  sortBy: string;
  setSortBy: (sortBy: string) => void;

  // Price range
  minPrice: number | null;
  maxPrice: number | null;
  setPriceRange: (min: number | null, max: number | null) => void;

  // Location filters
  location: string | null;
  setLocation: (location: string | null) => void;

  // Search query
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Category filters (for vehicle category)
  vehicleType: string[];
  setVehicleType: (types: string[]) => void;

  // Clear all filters
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  // Default values
  sortBy: "date",
  minPrice: null,
  maxPrice: null,
  location: null,
  searchQuery: "",
  vehicleType: [],

  // Actions
  setSortBy: (sortBy) => set({ sortBy }),

  setPriceRange: (min, max) =>
    set({
      minPrice: min,
      maxPrice: max,
    }),

  setLocation: (location) => set({ location }),

  setSearchQuery: (searchQuery) => set({ searchQuery }),

  setVehicleType: (types) => set({ vehicleType: types }),

  clearFilters: () =>
    set({
      sortBy: "date",
      minPrice: null,
      maxPrice: null,
      location: null,
      searchQuery: "",
      vehicleType: [],
    }),
}));

export default useFilterStore;
