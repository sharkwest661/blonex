// src/services/mockPosts.service.ts
import { VehicleData, VehicleFeature } from "@/components/Listings/VehicleCard";

// Mock features
const mockFeatures: VehicleFeature[] = [
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
];

// Generate mock vehicle data
const generateMockVehicle = (
  id: string,
  type: "vip" | "premium" | "recent"
): VehicleData => {
  const makes = [
    "Mercedes-Benz",
    "BMW",
    "Audi",
    "Toyota",
    "Honda",
    "Hyundai",
    "Kia",
    "Lexus",
    "Volkswagen",
    "Nissan",
  ];
  const models = {
    "Mercedes-Benz": ["S 500", "E 200", "C 180", "GLE 450", "G 63 AMG"],
    BMW: ["X5", "X6", "X7", "7 Series", "5 Series"],
    Audi: ["A6", "A8", "Q7", "Q8", "RS6"],
    Toyota: ["Land Cruiser", "Camry", "RAV4", "Corolla", "Prado"],
    Honda: ["CR-V", "Civic", "Accord", "Pilot", "HR-V"],
    Hyundai: ["Tucson", "Santa Fe", "Elantra", "Sonata", "Palisade"],
    Kia: ["Sportage", "Sorento", "K5", "Seltos", "Telluride"],
    Lexus: ["RX", "LX", "ES", "GX", "NX"],
    Volkswagen: ["Tiguan", "Touareg", "Passat", "Golf", "Atlas"],
    Nissan: ["X-Trail", "Qashqai", "Patrol", "Altima", "Murano"],
  };

  const locations = ["Bakı", "Sumqayıt", "Gəncə", "Xırdalan", "Mingəçevir"];
  const years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018];
  const engineSizes = [1.5, 1.6, 2.0, 2.5, 3.0, 3.5, 4.0, 4.4];
  const mileages = [0, 5000, 10000, 15000, 20000, 30000, 40000, 50000, 60000];
  const transmissions = ["Avtomat", "Mexaniki", "Robotlaşdırılmış"];
  const fuelTypes = ["Benzin", "Dizel", "Hibrid", "Elektrik", "LPG"];

  const randomIndex = Math.floor(Math.random() * 10);
  const make = makes[randomIndex % makes.length];
  const modelOptions = models[make as keyof typeof models] || models["Toyota"];
  const model = modelOptions[Math.floor(Math.random() * modelOptions.length)];

  const year = years[Math.floor(Math.random() * years.length)];
  const engineSize =
    engineSizes[Math.floor(Math.random() * engineSizes.length)];
  const mileage = mileages[Math.floor(Math.random() * mileages.length)];
  const transmission =
    transmissions[Math.floor(Math.random() * transmissions.length)];
  const fuelType = fuelTypes[Math.floor(Math.random() * fuelTypes.length)];

  // Price varies by type
  let price = 0;
  if (type === "vip") {
    price = 80000 + Math.floor(Math.random() * 70000);
  } else if (type === "premium") {
    price = 50000 + Math.floor(Math.random() * 40000);
  } else {
    price = 20000 + Math.floor(Math.random() * 30000);
  }

  // Generate subtitle for VIP listings
  let subtitle = undefined;
  if (type === "vip") {
    subtitle = `${year}, ${engineSize} L, ${mileage.toLocaleString()} km`;
  }

  // Generate features
  const hasCredit = Math.random() > 0.5;
  const hasBarter = Math.random() > 0.7;
  const vehicleFeatures = [];

  if (hasCredit) {
    vehicleFeatures.push(mockFeatures[1]); // Credit
  }

  if (hasBarter) {
    vehicleFeatures.push(mockFeatures[0]); // Barter
  }

  return {
    id: `${type}-${id}`,
    title: `${make} ${model}`,
    subtitle,
    price,
    currency: "₼",
    location: locations[Math.floor(Math.random() * locations.length)],
    date: `${Math.floor(Math.random() * 28) + 1}.${
      Math.floor(Math.random() * 12) + 1
    }.2025, ${Math.floor(Math.random() * 24)}:${Math.floor(
      Math.random() * 60
    )}`,
    imageUrl: "/assets/images/example/post2.png",
    type,
    features: vehicleFeatures,
    href: `/neqliyyat/${make.toLowerCase().replace(/\s+/g, "-")}-${model
      .toLowerCase()
      .replace(/\s+/g, "-")}-${id}`,
    hasVipBadge: type === "vip",
    hasPremiumBadge: type === "vip" || type === "premium",
    year,
    make,
    model,
    mileage,
    engineSize,
    transmission,
    fuelType,
  };
};

// Mock service
export class MockPostsService {
  // Get VIP posts
  static getVipPosts(count: number = 10): VehicleData[] {
    return Array.from({ length: count }, (_, i) =>
      generateMockVehicle(`vip-${i + 1}`, "vip")
    );
  }

  // Get recent posts
  static getRecentPosts(count: number = 20): VehicleData[] {
    return Array.from({ length: count }, (_, i) =>
      generateMockVehicle(`recent-${i + 1}`, "recent")
    );
  }

  // Get premium posts
  static getPremiumPosts(count: number = 15): VehicleData[] {
    return Array.from({ length: count }, (_, i) =>
      generateMockVehicle(`premium-${i + 1}`, "premium")
    );
  }

  // Get filtered posts
  static getFilteredPosts(
    filters: Record<string, any>,
    count: number = 20
  ): VehicleData[] {
    // Create a base set of vehicles
    const vehicles = [
      ...this.getVipPosts(Math.floor(count * 0.2)),
      ...this.getPremiumPosts(Math.floor(count * 0.3)),
      ...this.getRecentPosts(Math.floor(count * 0.5)),
    ];

    // Apply filters (simplified implementation)
    let filteredVehicles = [...vehicles];

    // Apply make filter
    if (filters.make) {
      filteredVehicles = filteredVehicles.filter(
        (v) => v.make && v.make.toLowerCase() === filters.make.toLowerCase()
      );
    }

    // Apply model filter
    if (filters.model) {
      filteredVehicles = filteredVehicles.filter(
        (v) => v.model && v.model.toLowerCase() === filters.model.toLowerCase()
      );
    }

    // Apply price range filters
    if (filters.minPrice) {
      filteredVehicles = filteredVehicles.filter(
        (v) => v.price >= filters.minPrice
      );
    }

    if (filters.maxPrice) {
      filteredVehicles = filteredVehicles.filter(
        (v) => v.price <= filters.maxPrice
      );
    }

    // Apply year range filters
    if (filters.minYear) {
      filteredVehicles = filteredVehicles.filter(
        (v) => v.year && v.year >= filters.minYear
      );
    }

    if (filters.maxYear) {
      filteredVehicles = filteredVehicles.filter(
        (v) => v.year && v.year <= filters.maxYear
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price_asc":
          filteredVehicles.sort((a, b) => a.price - b.price);
          break;
        case "price_desc":
          filteredVehicles.sort((a, b) => b.price - a.price);
          break;
        case "year":
          filteredVehicles.sort((a, b) => (b.year || 0) - (a.year || 0));
          break;
        case "mileage":
          filteredVehicles.sort((a, b) => (a.mileage || 0) - (b.mileage || 0));
          break;
        case "date":
        default:
          // Already sorted by date
          break;
      }
    }

    // Ensure we don't return more than requested
    return filteredVehicles.slice(0, count);
  }

  // Async versions for React Query
  static async getVipPostsAsync(
    count: number = 10,
    sortBy?: string
  ): Promise<VehicleData[]> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const posts = this.getVipPosts(count);

    if (sortBy) {
      return this.sortPosts(posts, sortBy);
    }

    return posts;
  }

  static async getRecentPostsAsync(
    count: number = 20,
    sortBy?: string
  ): Promise<VehicleData[]> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const posts = this.getRecentPosts(count);

    if (sortBy) {
      return this.sortPosts(posts, sortBy);
    }

    return posts;
  }

  static async getPremiumPostsAsync(
    count: number = 15,
    sortBy?: string
  ): Promise<VehicleData[]> {
    await new Promise((resolve) => setTimeout(resolve, 700));
    const posts = this.getPremiumPosts(count);

    if (sortBy) {
      return this.sortPosts(posts, sortBy);
    }

    return posts;
  }

  static async getFilteredPostsAsync(
    filters: Record<string, any>,
    count: number = 20
  ): Promise<VehicleData[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.getFilteredPosts(filters, count);
  }

  // Helper method for sorting
  private static sortPosts(
    posts: VehicleData[],
    sortBy: string
  ): VehicleData[] {
    const sortedPosts = [...posts];

    switch (sortBy) {
      case "price_asc":
        return sortedPosts.sort((a, b) => a.price - b.price);
      case "price_desc":
        return sortedPosts.sort((a, b) => b.price - a.price);
      case "year":
        return sortedPosts.sort((a, b) => (b.year || 0) - (a.year || 0));
      case "mileage":
        return sortedPosts.sort((a, b) => (a.mileage || 0) - (b.mileage || 0));
      case "date":
      default:
        // Already sorted by date
        return sortedPosts;
    }
  }
}

export default MockPostsService;
