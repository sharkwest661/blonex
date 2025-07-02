// src/hooks/useFavoritesData.ts
"use client";
import { useQuery } from "@tanstack/react-query";
import { useFavoritesStoreHydrated } from "@/stores/useFavoritesStore";
import { listingsService } from "@/services/listings.service";
import type { Post } from "@/types/post.types";
import type { ListingSummary } from "@/services/types/listing.types";

// Mock data for development when API is not available
const generateMockPost = (id: string): Post => {
  const storeNames = [
    "Kontakt Home",
    "World Telecom",
    "Optimal Electronics",
    "TechMart",
    "Digital Plaza",
  ];
  const hasStore = Math.random() > 0.4; // 60% chance of having store

  return {
    id,
    title: `Samsung Galaxy S12 ${id.slice(-3)}`,
    subtitle: "16/256GB, Space Gray",
    price: 2180,
    currency: "₼",
    location: "Bakı",
    date: "28.01.2021, 16:34",
    imageUrl: `/assets/images/example/post${
      (parseInt(id.slice(-1)) % 5) + 1
    }.png`,
    href: `/listing/${id}`,
    type:
      Math.random() > 0.7 ? "vip" : Math.random() > 0.5 ? "premium" : "regular",
    hasVipBadge: Math.random() > 0.7,
    hasPremiumBadge: Math.random() > 0.8,
    isStore: hasStore,
    storeInfo: hasStore
      ? {
          name: storeNames[Math.floor(Math.random() * storeNames.length)],
          logo: "/assets/images/example/seller.svg",
          href: `/store/${id}`,
        }
      : undefined,
    features: [
      ...(Math.random() > 0.5
        ? [
            {
              type: "barter" as const,
              icon: "/assets/images/barter.svg",
              tooltip: "Barter mümkündür",
            },
          ]
        : []),
      ...(Math.random() > 0.5
        ? [
            {
              type: "credit" as const,
              icon: "/assets/images/percent.svg",
              tooltip: "Kredit mümkündür",
            },
          ]
        : []),
    ],
  };
};

// Transform API ListingSummary to Post format
const transformListingToPost = (listing: ListingSummary): Post => ({
  id: listing.id,
  title: listing.title,
  subtitle: undefined, // ListingSummary doesn't have subtitle
  price: listing.price,
  currency: listing.currency,
  location: listing.location.city,
  date: new Date(listing.createdAt).toLocaleDateString("az-AZ"),
  imageUrl: listing.mainImage?.url || "/assets/images/placeholder.png",
  href: `/listing/${listing.id}`,
  type:
    listing.type === "vip"
      ? "vip"
      : listing.type === "premium"
      ? "premium"
      : "recent",
  hasVipBadge: listing.type === "vip",
  hasPremiumBadge: listing.type === "premium",
  isStore: false, // ListingSummary doesn't have store info
  storeInfo: undefined,
  features: [
    // Add default features based on listing properties
    ...(listing.isNegotiable
      ? [
          {
            type: "barter" as const,
            icon: "/assets/images/barter.svg",
            tooltip: "Barter mümkündür",
            enabled: true,
          },
        ]
      : []),
  ],
});

export const useFavoritesData = () => {
  // Get favorite IDs from store (using hydration-safe version)
  const { favorites } = useFavoritesStoreHydrated();

  // Fetch full post data for favorites
  const {
    data: favoritePosts = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["favorites", favorites],
    queryFn: async (): Promise<Post[]> => {
      // If no favorites, return empty array
      if (!favorites || favorites.length === 0) {
        return [];
      }

      try {
        // Try to fetch from API
        const response = await listingsService.getFavoriteListings();

        // Filter posts to only include those in favorites and transform
        const filteredPosts = response.data
          .filter((listing) => favorites.includes(listing.id))
          .map(transformListingToPost);

        return filteredPosts;
      } catch (error) {
        console.warn(
          "API not available, using mock data for favorites:",
          error
        );

        // Fallback to mock data when API is not implemented
        return favorites.map(generateMockPost);
      }
    },
    enabled: favorites.length > 0, // Only run query if there are favorites
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
    retry: false, // Don't retry API calls during development
  });

  return {
    favoritePosts,
    isLoading,
    error: error as Error | null,
    refetch,
    favoritesCount: favorites.length,
    hasFavorites: favorites.length > 0,
  };
};
