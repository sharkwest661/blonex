// src/stores/useVehicleFilterStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type VehicleCondition = "all" | "new" | "used";

export interface VehicleFilterState {
  // Sort options
  sortBy: string;

  // Make/model filters
  make: string | null;
  model: string | null;

  // Price range
  minPrice: number | null;
  maxPrice: number | null;

  // Vehicle specifics
  color: string | null;
  fuelType: string | null;
  bodyType: string | null;
  minEngineSize: number | null;
  maxEngineSize: number | null;
  minYear: number | null;
  maxYear: number | null;
  transmission: string | null;
  city: string | null;
  condition: VehicleCondition;
  minMileage: number | null;
  maxMileage: number | null;
  driveType: string | null;
  seatsCount: string | null;
  minPower: number | null;
  maxPower: number | null;

  // Features
  hasCredit: boolean;
  hasBarter: boolean;

  // Car equipment/features
  equipment: string[];

  // Actions
  setSortBy: (sortBy: string) => void;
  setMake: (make: string | null) => void;
  setModel: (model: string | null) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  setFilter: <K extends keyof VehicleFilterState>(
    key: K,
    value: VehicleFilterState[K]
  ) => void;
  resetFilters: () => void;
  toggleFeature: (feature: string) => void;
  setCondition: (condition: VehicleCondition) => void;
  toggleCredit: () => void;
  toggleBarter: () => void;
}

// Default/initial state values
const initialState = {
  sortBy: "date",
  make: null,
  model: null,
  minPrice: null,
  maxPrice: null,
  color: null,
  fuelType: null,
  bodyType: null,
  minEngineSize: null,
  maxEngineSize: null,
  minYear: null,
  maxYear: null,
  transmission: null,
  city: null,
  condition: "all" as VehicleCondition,
  minMileage: null,
  maxMileage: null,
  driveType: null,
  seatsCount: null,
  minPower: null,
  maxPower: null,
  hasCredit: false,
  hasBarter: false,
  equipment: [],
};

// Create the store with persistence
export const useVehicleFilterStore = create<VehicleFilterState>()(
  persist(
    (set) => ({
      // Initial state
      ...initialState,

      // Actions
      setSortBy: (sortBy: string) => set({ sortBy }),

      setMake: (make: string | null) =>
        set({
          make,
          model: null, // Reset model when make changes
        }),

      setModel: (model: string | null) => set({ model }),

      setPriceRange: (minPrice: number | null, maxPrice: number | null) =>
        set({ minPrice, maxPrice }),

      setFilter: <K extends keyof VehicleFilterState>(
        key: K,
        value: VehicleFilterState[K]
      ) => set({ [key]: value } as Pick<VehicleFilterState, K>),

      resetFilters: () => set(initialState),

      toggleFeature: (feature: string) =>
        set((state) => {
          const equipment = state.equipment.includes(feature)
            ? state.equipment.filter((item) => item !== feature)
            : [...state.equipment, feature];
          return { equipment };
        }),

      setCondition: (condition: VehicleCondition) => set({ condition }),

      toggleCredit: () => set((state) => ({ hasCredit: !state.hasCredit })),

      toggleBarter: () => set((state) => ({ hasBarter: !state.hasBarter })),
    }),
    {
      name: "vehicle-filters",
      // Only store specific fields to avoid storage bloat
      partialize: (state) => ({
        sortBy: state.sortBy,
        make: state.make,
        model: state.model,
        minPrice: state.minPrice,
        maxPrice: state.maxPrice,
        condition: state.condition,
        minYear: state.minYear,
        maxYear: state.maxYear,
        hasCredit: state.hasCredit,
        hasBarter: state.hasBarter,
      }),
    }
  )
);

export default useVehicleFilterStore;
