// src/hooks/useBrands.ts
import { useQuery } from "@tanstack/react-query";

export interface Brand {
  id: string;
  name: string;
  slug: string;
  count: number;
  logo?: string;
}

// Mock data for brands
const mockBrands: Brand[] = [
  {
    id: "1",
    name: "Mercedes",
    slug: "mercedes",
    count: 1245,
    logo: "/assets/images/brands/mercedes.png",
  },
  {
    id: "2",
    name: "BMW",
    slug: "bmw",
    count: 982,
    logo: "/assets/images/brands/bmw.png",
  },
  {
    id: "3",
    name: "Toyota",
    slug: "toyota",
    count: 765,
    logo: "/assets/images/brands/toyota.png",
  },
  {
    id: "4",
    name: "Audi",
    slug: "audi",
    count: 643,
    logo: "/assets/images/brands/audi.png",
  },
  {
    id: "5",
    name: "Volkswagen",
    slug: "volkswagen",
    count: 598,
    logo: "/assets/images/brands/volkswagen.png",
  },
  {
    id: "6",
    name: "Honda",
    slug: "honda",
    count: 489,
    logo: "/assets/images/brands/honda.png",
  },
  {
    id: "7",
    name: "Hyundai",
    slug: "hyundai",
    count: 423,
    logo: "/assets/images/brands/hyundai.png",
  },
  {
    id: "8",
    name: "Kia",
    slug: "kia",
    count: 387,
    logo: "/assets/images/brands/kia.png",
  },
  {
    id: "9",
    name: "Nissan",
    slug: "nissan",
    count: 352,
    logo: "/assets/images/brands/nissan.png",
  },
  {
    id: "10",
    name: "Ford",
    slug: "ford",
    count: 328,
    logo: "/assets/images/brands/ford.png",
  },
  {
    id: "11",
    name: "Lexus",
    slug: "lexus",
    count: 289,
    logo: "/assets/images/brands/lexus.png",
  },
  {
    id: "12",
    name: "Mazda",
    slug: "mazda",
    count: 276,
    logo: "/assets/images/brands/mazda.png",
  },
];

// Simulated API call to fetch brands
const fetchBrands = async (): Promise<Brand[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockBrands;
};

// Hook for fetching brands
export const useBrands = (options: { enabled?: boolean } = {}) => {
  const { enabled = true } = options;

  const {
    data: brands = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["vehicleBrands"],
    queryFn: fetchBrands,
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    brands,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};

export default useBrands;
