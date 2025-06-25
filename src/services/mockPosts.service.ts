// src/services/mockPosts.service.ts - FIXED VERSION
import type { Post, PostFeature, VehiclePost } from "@/types/post.types";

// ✅ FIX: Use unified Post types instead of separate VehicleData
const createPostFeature = (
  type: "barter" | "credit",
  icon: string,
  tooltip: string,
  enabled: boolean = true
): PostFeature => ({
  type,
  icon,
  tooltip,
  enabled,
});

// Mock features using proper types
const mockFeatures: PostFeature[] = [
  createPostFeature("barter", "/assets/images/barter.svg", "Barter mümkündür"),
  createPostFeature("credit", "/assets/images/percent.svg", "Kredit mümkündür"),
];

// Generate mock vehicle post data
const generateMockVehiclePost = (
  id: string,
  type: "vip" | "premium" | "recent"
): VehiclePost => {
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
  const fuelTypes = ["Benzin", "Dizel", "Elektrik", "Hibrid"];

  const make = makes[Math.floor(Math.random() * makes.length)];
  const modelList = models[make as keyof typeof models];
  const model = modelList[Math.floor(Math.random() * modelList.length)];
  const year = years[Math.floor(Math.random() * years.length)];
  const engineSize =
    engineSizes[Math.floor(Math.random() * engineSizes.length)];
  const mileage = mileages[Math.floor(Math.random() * mileages.length)];
  const transmission =
    transmissions[Math.floor(Math.random() * transmissions.length)];
  const fuelType = fuelTypes[Math.floor(Math.random() * fuelTypes.length)];

  // Random features (0-2 features)
  const featureCount = Math.floor(Math.random() * 3);
  const vehicleFeatures = mockFeatures
    .sort(() => 0.5 - Math.random())
    .slice(0, featureCount);

  const basePrice =
    type === "vip"
      ? 45000 + Math.random() * 100000
      : type === "premium"
      ? 25000 + Math.random() * 50000
      : 15000 + Math.random() * 30000;

  const subtitle =
    type === "vip"
      ? `${year}, ${engineSize} L, ${mileage.toLocaleString()} km`
      : undefined;

  return {
    id,
    title: `${make} ${model}`,
    subtitle,
    price: Math.round(basePrice),
    currency: "₼",
    location: locations[Math.floor(Math.random() * locations.length)],
    date: `${Math.floor(Math.random() * 28) + 1}.01.2025, ${Math.floor(
      Math.random() * 24
    )}:${Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, "0")}`,
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

// ✅ FIX: Mock service now returns proper Post[] types
export class MockPostsService {
  // Get VIP posts
  static getVipPosts(count: number = 10): Post[] {
    return Array.from({ length: count }, (_, i) =>
      generateMockVehiclePost(`vip-${i + 1}`, "vip")
    );
  }

  // Get recent posts
  static getRecentPosts(count: number = 20, sortBy?: string): Post[] {
    const posts = Array.from({ length: count }, (_, i) =>
      generateMockVehiclePost(`recent-${i + 1}`, "recent")
    );

    // Simple sorting implementation
    if (sortBy) {
      return posts.sort((a, b) => {
        switch (sortBy) {
          case "price_asc":
            return a.price - b.price;
          case "price_desc":
            return b.price - a.price;
          case "date":
          default:
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
      });
    }

    return posts;
  }

  // Get premium posts
  static getPremiumPosts(count: number = 15): Post[] {
    return Array.from({ length: count }, (_, i) =>
      generateMockVehiclePost(`premium-${i + 1}`, "premium")
    );
  }

  // Get filtered posts
  static getFilteredPosts(
    filters: Record<string, any>,
    count: number = 20
  ): Post[] {
    const posts = [
      ...this.getVipPosts(Math.floor(count * 0.2)),
      ...this.getPremiumPosts(Math.floor(count * 0.3)),
      ...this.getRecentPosts(Math.floor(count * 0.5)),
    ];

    // Apply filters (simplified implementation)
    let filteredPosts = [...posts];

    // Apply make filter
    if (filters.make) {
      filteredPosts = filteredPosts.filter(
        (p) =>
          (p as VehiclePost).make &&
          (p as VehiclePost)
            .make!.toLowerCase()
            .includes(filters.make.toLowerCase())
      );
    }

    // Apply price range filter
    if (filters.minPrice) {
      filteredPosts = filteredPosts.filter((p) => p.price >= filters.minPrice);
    }
    if (filters.maxPrice) {
      filteredPosts = filteredPosts.filter((p) => p.price <= filters.maxPrice);
    }

    // Apply sorting
    if (filters.sortBy) {
      filteredPosts = filteredPosts.sort((a, b) => {
        switch (filters.sortBy) {
          case "price_asc":
            return a.price - b.price;
          case "price_desc":
            return b.price - a.price;
          case "year":
            const yearA = (a as VehiclePost).year || 0;
            const yearB = (b as VehiclePost).year || 0;
            return yearB - yearA;
          case "mileage":
            const mileageA = (a as VehiclePost).mileage || 0;
            const mileageB = (b as VehiclePost).mileage || 0;
            return mileageA - mileageB;
          case "date":
          default:
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
      });
    }

    return filteredPosts.slice(0, count);
  }

  // Async versions for React Query
  static async getVipPostsAsync(
    count: number = 10,
    sortBy?: string
  ): Promise<Post[]> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    let posts = this.getVipPosts(count);

    // Apply sorting if specified
    if (sortBy) {
      posts = posts.sort((a, b) => {
        switch (sortBy) {
          case "price_asc":
            return a.price - b.price;
          case "price_desc":
            return b.price - a.price;
          case "date":
          default:
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
      });
    }

    return posts;
  }

  static async getRecentPostsAsync(
    count: number = 20,
    sortBy?: string
  ): Promise<Post[]> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return this.getRecentPosts(count, sortBy);
  }

  static async getPremiumPostsAsync(
    count: number = 15,
    sortBy?: string
  ): Promise<Post[]> {
    await new Promise((resolve) => setTimeout(resolve, 700));
    let posts = this.getPremiumPosts(count);

    // Apply sorting if specified
    if (sortBy) {
      posts = posts.sort((a, b) => {
        switch (sortBy) {
          case "price_asc":
            return a.price - b.price;
          case "price_desc":
            return b.price - a.price;
          case "date":
          default:
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
      });
    }

    return posts;
  }

  static async getFilteredPostsAsync(
    filters: Record<string, any>,
    count: number = 20
  ): Promise<Post[]> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return this.getFilteredPosts(filters, count);
  }
}
