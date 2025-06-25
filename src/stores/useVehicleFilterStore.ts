// src/stores/useVehicleFilterStore.ts - HYDRATION FIX
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useEffect, useState } from "react";

export type VehicleCondition = "all" | "new" | "used";

export interface VehicleFilterState {
  sortBy: string;
  make: string | null;
  model: string | null;
  minPrice: number | null;
  maxPrice: number | null;
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
  hasCredit: boolean;
  hasBarter: boolean;
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

// ✅ FIX: SSR-safe storage
const createSSRSafeStorage = () => {
  if (typeof window === "undefined") {
    // Server-side: return mock storage
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }
  // Client-side: return real localStorage
  return localStorage;
};

export const useVehicleFilterStore = create<VehicleFilterState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setSortBy: (sortBy: string) => {
        const currentState = get();
        if (currentState.sortBy !== sortBy) {
          set({ sortBy });
        }
      },

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
      ) => {
        const currentState = get();
        if (currentState[key] !== value) {
          set({ [key]: value } as Pick<VehicleFilterState, K>);
        }
      },

      resetFilters: () => set(initialState),

      toggleFeature: (feature: string) =>
        set((state) => {
          const equipment = state.equipment.includes(feature)
            ? state.equipment.filter((item) => item !== feature)
            : [...state.equipment, feature];
          return { equipment };
        }),

      setCondition: (condition: VehicleCondition) => {
        const currentState = get();
        if (currentState.condition !== condition) {
          set({ condition });
        }
      },

      toggleCredit: () => set((state) => ({ hasCredit: !state.hasCredit })),

      toggleBarter: () => set((state) => ({ hasBarter: !state.hasBarter })),
    }),
    {
      name: "vehicle-filters",
      storage: createJSONStorage(() => createSSRSafeStorage()),
      // ✅ FIX: Skip hydration to prevent mismatch
      skipHydration: true,
    }
  )
);

// ✅ FIX: Custom hook for hydration-safe usage
export const useVehicleFilterStoreHydrated = () => {
  const [hydrated, setHydrated] = useState(false);
  const store = useVehicleFilterStore();

  useEffect(() => {
    // Rehydrate the store on client side
    useVehicleFilterStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  return hydrated
    ? store
    : {
        ...initialState,
        // Provide no-op functions during SSR
        setSortBy: () => {},
        setMake: () => {},
        setModel: () => {},
        setPriceRange: () => {},
        setFilter: () => {},
        resetFilters: () => {},
        toggleFeature: () => {},
        setCondition: () => {},
        toggleCredit: () => {},
        toggleBarter: () => {},
      };
};

export default useVehicleFilterStore;
