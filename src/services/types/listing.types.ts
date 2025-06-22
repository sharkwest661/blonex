// src/services/types/listing.types.ts

// Listing status
export type ListingStatus =
  | "active"
  | "inactive"
  | "sold"
  | "pending"
  | "expired";

// Listing type/promotion level
export type ListingType = "standard" | "premium" | "vip" | "featured";

// Listing condition
export type ListingCondition = "new" | "like_new" | "good" | "fair" | "poor";

// Currency types
export type Currency = "AZN" | "USD" | "EUR";

// Listing image
export interface ListingImage {
  id: string;
  url: string;
  thumbnailUrl: string;
  altText?: string;
  order: number;
  isMain: boolean;
}

// Listing location
export interface ListingLocation {
  city: string;
  region?: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Listing contact info
export interface ListingContact {
  name: string;
  phone: string;
  email?: string;
  preferredContactMethod: "phone" | "email" | "both";
  showPhoneNumber: boolean;
}

// Listing features/attributes
export interface ListingFeature {
  type: string;
  value: string | number | boolean;
  displayName: string;
}

// Main listing interface
export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: Currency;
  categoryId: string;
  categoryName: string;
  subcategoryId?: string;
  subcategoryName?: string;
  images: ListingImage[];
  location: ListingLocation;
  contact: ListingContact;
  features: ListingFeature[];
  condition?: ListingCondition;
  status: ListingStatus;
  type: ListingType;
  userId: string;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
  viewCount: number;
  favoriteCount: number;
  isNegotiable: boolean;
  isUrgent: boolean;
  tags: string[];
}

// Listing creation/update payload
export interface CreateListingPayload {
  title: string;
  description: string;
  price: number;
  currency: Currency;
  categoryId: string;
  subcategoryId?: string;
  images: File[] | string[]; // Files for new uploads, URLs for existing
  location: Omit<ListingLocation, "coordinates">;
  contact: ListingContact;
  features: Omit<ListingFeature, "displayName">[];
  condition?: ListingCondition;
  type?: ListingType;
  isNegotiable?: boolean;
  isUrgent?: boolean;
  tags?: string[];
}

export interface UpdateListingPayload extends Partial<CreateListingPayload> {
  id: string;
}

// Listing filters for search/browse
export interface ListingFilters {
  q?: string;
  category?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  features?: Record<string, unknown> | string[];
  condition?: string[];
  type?: string[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  dateRange?: {
    start?: string;
    end?: string;
  };
}

// Listing summary for lists/grids
export interface ListingSummary {
  id: string;
  title: string;
  price: number;
  currency: Currency;
  mainImage?: ListingImage;
  location: Pick<ListingLocation, "city">;
  type: ListingType;
  createdAt: string;
  viewCount: number;
  favoriteCount: number;
  isNegotiable: boolean;
  isUrgent: boolean;
}

// Listing statistics
export interface ListingStats {
  totalListings: number;
  activeListings: number;
  viewsToday: number;
  viewsThisWeek: number;
  viewsThisMonth: number;
  favoritesToday: number;
  averagePrice: number;
  categoryBreakdown: Record<string, number>;
}

export default Listing;
