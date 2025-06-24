// src/hooks/useListings.ts
import { useQuery } from "@tanstack/react-query";
import { VehicleData } from "@/components/Listings/VehicleCard";

// Mock data for vehicle listings
const mockVipListings: VehicleData[] = [
  {
    id: "vip-1",
    title: "Mercedes-Benz S 500 AMG 4Matic",
    subtitle: "2022, 4.0 L, 12,000 km",
    price: 149000,
    currency: "₼",
    location: "Bakı",
    date: "28.01.2025, 16:34",
    imageUrl: "/assets/images/example/post2.png",
    type: "vip",
    features: [
      {
        type: "barter",
        icon: "/assets/images/barter.svg",
        tooltip: "Barter mümkündür",
        enabled: true,
      },
      {
        type: "credit",
        icon: "/assets/images/percent.svg",
        tooltip: "Kredit mümkündür",
        enabled: true,
      },
    ],
    href: "/neqliyyat/mercedes-benz-s-500-amg-4matic-12345",
    hasVipBadge: true,
    hasPremiumBadge: true,
    year: 2022,
    make: "Mercedes-Benz",
    model: "S 500",
    mileage: 12000,
    engineSize: 4.0,
    transmission: "Avtomat",
    fuelType: "Benzin",
  },
  {
    id: "vip-2",
    title: "BMW X5 M Competition",
    subtitle: "2023, 4.4 L, 5,600 km",
    price: 132000,
    currency: "₼",
    location: "Bakı",
    date: "27.01.2025, 10:22",
    imageUrl: "/assets/images/example/post2.png",
    type: "vip",
    features: [
      {
        type: "credit",
        icon: "/assets/images/percent.svg",
        tooltip: "Kredit mümkündür",
        enabled: true,
      },
    ],
    href: "/neqliyyat/bmw-x5-m-competition-23456",
    hasVipBadge: true,
    hasPremiumBadge: true,
    year: 2023,
    make: "BMW",
    model: "X5 M",
    mileage: 5600,
    engineSize: 4.4,
    transmission: "Avtomat",
    fuelType: "Benzin",
  },
  {
    id: "vip-3",
    title: "Audi Q8 e-tron",
    subtitle: "2024, Elektrik, 3,200 km",
    price: 110000,
    currency: "₼",
    location: "Bakı",
    date: "26.01.2025, 14:15",
    imageUrl: "/assets/images/example/post2.png",
    type: "vip",
    features: [],
    href: "/neqliyyat/audi-q8-e-tron-34567",
    hasVipBadge: true,
    hasPremiumBadge: true,
    year: 2024,
    make: "Audi",
    model: "Q8 e-tron",
    mileage: 3200,
    transmission: "Avtomat",
    fuelType: "Elektrik",
  },
  {
    id: "vip-4",
    title: "Toyota Land Cruiser 300",
    subtitle: "2023, 3.5 L, 18,500 km",
    price: 125000,
    currency: "₼",
    location: "Bakı",
    date: "25.01.2025, 09:45",
    imageUrl: "/assets/images/example/post2.png",
    type: "vip",
    features: [
      {
        type: "barter",
        icon: "/assets/images/barter.svg",
        tooltip: "Barter mümkündür",
        enabled: true,
      },
    ],
    href: "/neqliyyat/toyota-land-cruiser-300-45678",
    hasVipBadge: true,
    hasPremiumBadge: true,
    year: 2023,
    make: "Toyota",
    model: "Land Cruiser 300",
    mileage: 18500,
    engineSize: 3.5,
    transmission: "Avtomat",
    fuelType: "Benzin",
  },
];

const mockRecentListings: VehicleData[] = [
  {
    id: "recent-1",
    title: "Hyundai Tucson",
    price: 45000,
    currency: "₼",
    location: "Bakı",
    date: "28.01.2025, 18:10",
    imageUrl: "/assets/images/example/post2.png",
    type: "recent",
    features: [
      {
        type: "credit",
        icon: "/assets/images/percent.svg",
        tooltip: "Kredit mümkündür",
        enabled: true,
      },
    ],
    href: "/neqliyyat/hyundai-tucson-56789",
    year: 2022,
    make: "Hyundai",
    model: "Tucson",
    mileage: 24000,
    engineSize: 2.0,
    transmission: "Avtomat",
    fuelType: "Benzin",
  },
  {
    id: "recent-2",
    title: "Kia Sportage",
    price: 42000,
    currency: "₼",
    location: "Bakı",
    date: "28.01.2025, 16:45",
    imageUrl: "/assets/images/example/post2.png",
    type: "recent",
    features: [],
    href: "/neqliyyat/kia-sportage-67890",
    year: 2021,
    make: "Kia",
    model: "Sportage",
    mileage: 31000,
    engineSize: 1.6,
    transmission: "Avtomat",
    fuelType: "Benzin",
  },
  {
    id: "recent-3",
    title: "Lexus RX 350",
    price: 75000,
    currency: "₼",
    location: "Bakı",
    date: "28.01.2025, 15:30",
    imageUrl: "/assets/images/example/post2.png",
    type: "recent",
    features: [
      {
        type: "barter",
        icon: "/assets/images/barter.svg",
        tooltip: "Barter mümkündür",
        enabled: true,
      },
    ],
    href: "/neqliyyat/lexus-rx-350-78901",
    year: 2020,
    make: "Lexus",
    model: "RX 350",
    mileage: 45000,
    engineSize: 3.5,
    transmission: "Avtomat",
    fuelType: "Benzin",
  },
  {
    id: "recent-4",
    title: "Volkswagen Tiguan",
    price: 38000,
    currency: "₼",
    location: "Bakı",
    date: "28.01.2025, 14:20",
    imageUrl: "/assets/images/example/post2.png",
    type: "recent",
    features: [
      {
        type: "credit",
        icon: "/assets/images/percent.svg",
        tooltip: "Kredit mümkündür",
        enabled: true,
      },
      {
        type: "barter",
        icon: "/assets/images/barter.svg",
        tooltip: "Barter mümkündür",
        enabled: true,
      },
    ],
    href: "/neqliyyat/volkswagen-tiguan-89012",
    year: 2021,
    make: "Volkswagen",
    model: "Tiguan",
    mileage: 28500,
    engineSize: 2.0,
    transmission: "Avtomat",
    fuelType: "Dizel",
  },
  {
    id: "recent-5",
    title: "Nissan X-Trail",
    price: 35000,
    currency: "₼",
    location: "Bakı",
    date: "28.01.2025, 13:15",
    imageUrl: "/assets/images/example/post2.png",
    type: "recent",
    features: [
      {
        type: "credit",
        icon: "/assets/images/percent.svg",
        tooltip: "Kredit mümkündür",
        enabled: true,
      },
    ],
    href: "/neqliyyat/nissan-x-trail-90123",
    year: 2019,
    make: "Nissan",
    model: "X-Trail",
    mileage: 52000,
    engineSize: 2.5,
    transmission: "Avtomat",
    fuelType: "Benzin",
  },
  {
    id: "recent-6",
    title: "Honda CR-V",
    price: 39500,
    currency: "₼",
    location: "Sumqayıt",
    date: "28.01.2025, 12:30",
    imageUrl: "/assets/images/example/post2.png",
    type: "recent",
    features: [],
    href: "/neqliyyat/honda-cr-v-01234",
    year: 2020,
    make: "Honda",
    model: "CR-V",
    mileage: 34000,
    engineSize: 1.5,
    transmission: "Avtomat",
    fuelType: "Benzin",
  },
];

// Simulated API calls
const fetchVipListings = async (): Promise<VehicleData[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockVipListings;
};

const fetchRecentListings = async (options?: {
  sortBy?: string;
}): Promise<VehicleData[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Sort listings based on options
  let listings = [...mockRecentListings];

  if (options?.sortBy) {
    listings = sortListings(listings, options.sortBy);
  }

  return listings;
};

// Helper function to sort listings
const sortListings = (
  listings: VehicleData[],
  sortBy: string
): VehicleData[] => {
  const sortedListings = [...listings];

  switch (sortBy) {
    case "price_asc":
      return sortedListings.sort((a, b) => a.price - b.price);
    case "price_desc":
      return sortedListings.sort((a, b) => b.price - a.price);
    case "mileage":
      return sortedListings.sort((a, b) => (a.mileage || 0) - (b.mileage || 0));
    case "year":
      return sortedListings.sort((a, b) => (b.year || 0) - (a.year || 0));
    case "date":
    default:
      // Default is already sorted by date
      return sortedListings;
  }
};

// Types for hook options
interface UseListingsOptions {
  enabled?: boolean;
  staleTime?: number;
  sortBy?: string;
}

// Types for hook return values
interface UseListingsReturn {
  listings: VehicleData[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

// VIP listings hook
export const useVipListings = (
  options: UseListingsOptions = {}
): UseListingsReturn => {
  const { enabled = true, staleTime = 5 * 60 * 1000 } = options;

  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["vipListings"],
    queryFn: fetchVipListings,
    enabled,
    staleTime,
  });

  return {
    listings: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};

// Recent listings hook
export const useRecentListings = (
  options: UseListingsOptions = {}
): UseListingsReturn => {
  const {
    enabled = true,
    staleTime = 5 * 60 * 1000,
    sortBy = "date",
  } = options;

  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["recentListings", sortBy],
    queryFn: () => fetchRecentListings({ sortBy }),
    enabled,
    staleTime,
  });

  return {
    listings: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};

export default {
  useVipListings,
  useRecentListings,
};
