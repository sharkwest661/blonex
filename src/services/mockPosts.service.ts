// src/services/mockPosts.service.ts
import { Post, PostFeature } from "@/components/PostCard";

// Mock features
const mockFeatures: PostFeature[] = [
  {
    type: "barter",
    icon: "/assets/img/barter.svg",
    tooltip: "Barter mümkündür",
    enabled: true,
  },
  {
    type: "credit",
    icon: "/assets/img/percent.svg",
    tooltip: "Kredit mümkündür",
    enabled: true,
  },
];

// Generate mock posts
const generateMockPost = (
  id: number,
  type: "vip" | "premium" | "recent"
): Post => {
  const titles = [
    "Samsung Galaxy S12 phone sell",
    "iPhone 15 Pro Max ideal vəziyyətdə",
    "BMW X5 2020 model",
    "MacBook Pro M3 yeni model",
    "Mənzil satılır Yasamal rayonu",
    "Sony PlayStation 5 original",
    "Nike Air Jordan sneakers",
    "Canon EOS R5 kamera",
    "Laptop Asus ROG gaming",
    "Samsung 55 inch QLED TV",
  ];

  const locations = ["Bakı", "Sumqayıt", "Gəncə", "Xırdalan", "Mingəçevir"];

  const prices = [450, 1250, 2180, 750, 890, 1500, 320, 2800, 950, 1650];

  return {
    id: `${type}-${id}`,
    title: titles[id % titles.length],
    subtitle: type === "vip" ? "2020, 4.0 L, 23 000 km" : undefined,
    price: prices[id % prices.length],
    currency: "₼",
    location: locations[id % locations.length],
    date: "28.01.2021, 16:34",
    imageUrl: "/assets/img/example/post2.png",
    type,
    features: id % 3 === 0 ? mockFeatures : mockFeatures.slice(0, 1),
    href: `/listing/${type}-${id}`,
    hasVipBadge: type === "vip",
    hasPremiumBadge: type === "premium" || type === "vip",
  };
};

export class MockPostsService {
  static getVipPosts(count: number = 20): Post[] {
    return Array.from({ length: count }, (_, i) => generateMockPost(i, "vip"));
  }

  static getRecentPosts(count: number = 20): Post[] {
    return Array.from({ length: count }, (_, i) =>
      generateMockPost(i, "recent")
    );
  }

  static getPremiumPosts(count: number = 20): Post[] {
    return Array.from({ length: count }, (_, i) =>
      generateMockPost(i, "premium")
    );
  }

  // Simulate API delay
  static async getVipPostsAsync(count: number = 20): Promise<Post[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getVipPosts(count));
      }, 1000);
    });
  }

  static async getRecentPostsAsync(count: number = 20): Promise<Post[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getRecentPosts(count));
      }, 800);
    });
  }

  static async getPremiumPostsAsync(count: number = 20): Promise<Post[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getPremiumPosts(count));
      }, 600);
    });
  }
}

export default MockPostsService;
