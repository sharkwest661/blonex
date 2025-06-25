import { create } from "zustand";

// Types
import type { Mark, Model, Color, FuelType, BodyType, City } from "@/types";

interface FilterState {
  // Search state
  searchTerm: string;

  // Filter values
  selectedMark: Mark | null;
  selectedModel: Model | null;
  priceRange: { min: string; max: string };
  selectedColor: Color | null;
  selectedFuelType: FuelType | null;
  selectedBodyType: BodyType | null;
  engineSizeRange: { min: string; max: string };
  yearRange: { min: string; max: string };
  selectedTransmission: string | null;
  selectedCity: City | null;
  carCondition: "all" | "new" | "used";
  mileageRange: { min: string; max: string };
  selectedDrive: string | null;
  selectedSeats: string | null;
  powerRange: { min: string; max: string };
  isCredit: boolean;
  isBarter: boolean;
  selectedFeatures: number[];

  // Actions
  setSearchTerm: (searchTerm: string) => void;
  setSelectedMark: (mark: Mark | null) => void;
  setSelectedModel: (model: Model | null) => void;
  setPriceRange: (range: { min: string; max: string }) => void;
  setSelectedColor: (color: Color | null) => void;
  setSelectedFuelType: (fuelType: FuelType | null) => void;
  setSelectedBodyType: (bodyType: BodyType | null) => void;
  setEngineSizeRange: (range: { min: string; max: string }) => void;
  setYearRange: (range: { min: string; max: string }) => void;
  setSelectedTransmission: (transmission: string | null) => void;
  setSelectedCity: (city: City | null) => void;
  setCarCondition: (condition: "all" | "new" | "used") => void;
  setMileageRange: (range: { min: string; max: string }) => void;
  setSelectedDrive: (drive: string | null) => void;
  setSelectedSeats: (seats: string | null) => void;
  setPowerRange: (range: { min: string; max: string }) => void;
  setIsCredit: (isCredit: boolean) => void;
  setIsBarter: (isBarter: boolean) => void;
  toggleFeature: (featureId: number) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  // Initial state
  searchTerm: "",
  selectedMark: null,
  selectedModel: null,
  priceRange: { min: "", max: "" },
  selectedColor: null,
  selectedFuelType: null,
  selectedBodyType: null,
  engineSizeRange: { min: "", max: "" },
  yearRange: { min: "", max: "" },
  selectedTransmission: null,
  selectedCity: null,
  carCondition: "all",
  mileageRange: { min: "", max: "" },
  selectedDrive: null,
  selectedSeats: null,
  powerRange: { min: "", max: "" },
  isCredit: false,
  isBarter: false,
  selectedFeatures: [],

  // Actions
  setSearchTerm: (searchTerm) => set({ searchTerm }),

  setSelectedMark: (mark) =>
    set((state) => {
      // Reset model when mark changes
      if (state.selectedMark?.id !== mark?.id) {
        return { selectedMark: mark, selectedModel: null };
      }
      return { selectedMark: mark };
    }),

  setSelectedModel: (model) => set({ selectedModel: model }),

  setPriceRange: (range) => set({ priceRange: range }),

  setSelectedColor: (color) => set({ selectedColor: color }),

  setSelectedFuelType: (fuelType) => set({ selectedFuelType: fuelType }),

  setSelectedBodyType: (bodyType) => set({ selectedBodyType: bodyType }),

  setEngineSizeRange: (range) => set({ engineSizeRange: range }),

  setYearRange: (range) => set({ yearRange: range }),

  setSelectedTransmission: (transmission) =>
    set({ selectedTransmission: transmission }),

  setSelectedCity: (city) => set({ selectedCity: city }),

  setCarCondition: (condition) => set({ carCondition: condition }),

  setMileageRange: (range) => set({ mileageRange: range }),

  setSelectedDrive: (drive) => set({ selectedDrive: drive }),

  setSelectedSeats: (seats) => set({ selectedSeats: seats }),

  setPowerRange: (range) => set({ powerRange: range }),

  setIsCredit: (isCredit) => set({ isCredit }),

  setIsBarter: (isBarter) => set({ isBarter }),

  toggleFeature: (featureId) =>
    set((state) => {
      const isSelected = state.selectedFeatures.includes(featureId);

      if (isSelected) {
        return {
          selectedFeatures: state.selectedFeatures.filter(
            (id) => id !== featureId
          ),
        };
      } else {
        return {
          selectedFeatures: [...state.selectedFeatures, featureId],
        };
      }
    }),

  resetFilters: () =>
    set({
      selectedMark: null,
      selectedModel: null,
      priceRange: { min: "", max: "" },
      selectedColor: null,
      selectedFuelType: null,
      selectedBodyType: null,
      engineSizeRange: { min: "", max: "" },
      yearRange: { min: "", max: "" },
      selectedTransmission: null,
      selectedCity: null,
      carCondition: "all",
      mileageRange: { min: "", max: "" },
      selectedDrive: null,
      selectedSeats: null,
      powerRange: { min: "", max: "" },
      isCredit: false,
      isBarter: false,
      selectedFeatures: [],
    }),
}));
