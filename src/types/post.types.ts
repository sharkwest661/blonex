// src/types/post.types.ts

export interface PostFeature {
  icon: string;
  tooltip: string;
  type:
    | "barter"
    | "credit"
    | "delivery"
    | "warranty"
    | "insurance"
    | "exchange";
}

export interface PostStore {
  id: string;
  name: string;
  icon?: string;
  href: string;
  verified?: boolean;
  rating?: number;
}

export interface PostLocation {
  city: string;
  district?: string;
  metro?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface PostImage {
  id: string;
  url: string;
  alt?: string;
  isPrimary?: boolean;
  width?: number;
  height?: number;
}

export interface PostContact {
  phone?: string;
  email?: string;
  whatsapp?: string;
  telegram?: string;
  showPhone?: boolean;
}

export interface PostStats {
  views: number;
  favorites: number;
  shares?: number;
  updatedAt: string;
  publishedAt: string;
}

// Main Post interface
export interface Post {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  price: number;
  currency: string;
  location: PostLocation;
  images: PostImage[];
  primaryImage: string; // URL of the primary image
  href: string;
  slug: string;

  // Post metadata
  type: "regular" | "vip" | "premium";
  category: {
    id: string;
    name: string;
    slug: string;
    parentId?: string;
  };

  // Special flags
  isChance?: boolean;
  isFeatured?: boolean;
  isUrgent?: boolean;
  isNegotiable?: boolean;

  // Additional features
  features?: PostFeature[];
  store?: PostStore;
  contact?: PostContact;
  stats?: PostStats;

  // Timestamps
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;

  // SEO and meta
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];

  // User information
  userId: string;
  userName?: string;
  userAvatar?: string;
  userVerified?: boolean;
}

// Simplified Post interface for cards/lists (THIS IS WHAT PostCard USES)
export interface PostCardData {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  currency: string;
  location: string;
  date: string;
  time: string;
  image: string;
  imageAlt?: string;
  href: string;
  type?: "regular" | "vip" | "premium";
  isChance?: boolean;
  features?: PostFeature[];
  store?: {
    name: string;
    icon?: string;
    href: string;
  };
}

// API Response types
export interface PostsResponse {
  data: Post[];
  pagination: {
    current: number;
    total: number;
    perPage: number;
    totalItems: number;
  };
  filters?: {
    category?: string;
    location?: string;
    priceRange?: [number, number];
    type?: string[];
  };
}

export interface PostDetailsResponse {
  data: Post;
  related?: Post[];
  breadcrumbs?: {
    name: string;
    href: string;
  }[];
}

// Search and Filter types
export interface PostFilters {
  category?: string[];
  location?: string[];
  priceMin?: number;
  priceMax?: number;
  type?: ("regular" | "vip" | "premium")[];
  features?: string[];
  dateRange?: {
    from: string;
    to: string;
  };
  sortBy?: "date" | "price" | "popularity" | "relevance";
  sortOrder?: "asc" | "desc";
}

export interface PostSearchParams {
  query?: string;
  filters?: PostFilters;
  page?: number;
  perPage?: number;
}

// Form types for creating/editing posts
export interface CreatePostData {
  title: string;
  subtitle?: string;
  description: string;
  price: number;
  currency: string;
  categoryId: string;
  location: PostLocation;
  features?: string[];
  contact: PostContact;
  images: File[] | string[];
  type?: "regular" | "vip" | "premium";
  isNegotiable?: boolean;
  tags?: string[];
}

export interface UpdatePostData extends Partial<CreatePostData> {
  id: string;
}

// Favorites and user interactions
export interface FavoritePost {
  postId: string;
  userId: string;
  createdAt: string;
}

export interface PostInteraction {
  postId: string;
  userId?: string;
  type: "view" | "favorite" | "share" | "contact" | "call";
  timestamp: string;
  metadata?: Record<string, any>;
}

// Component prop types
export interface PostCardProps {
  post: PostCardData;
  className?: string;
  onFavoriteToggle?: (postId: string, isFavorite: boolean) => void;
  isChecked?: boolean;
  onCheckedChange?: (postId: string, isChecked: boolean) => void;
  variant?: "default" | "compact" | "featured" | "list";
  showStore?: boolean;
  showFeatures?: boolean;
  lazyLoading?: boolean;
}

export interface PostListProps {
  posts: PostCardData[];
  loading?: boolean;
  error?: string | null;
  onLoadMore?: () => void;
  hasMore?: boolean;
  variant?: "grid" | "list";
  columns?: 2 | 3 | 4 | 5;
  className?: string;
}

export interface PostGridProps extends PostListProps {
  variant: "grid";
  columns?: 2 | 3 | 4 | 5;
  gap?: "small" | "medium" | "large";
}

// Utility types
export type PostType = Post["type"];
export type PostCategory = Post["category"];
export type PostFeatureType = PostFeature["type"];
export type PostSortOption = PostFilters["sortBy"];

// Error types
export interface PostError {
  code: string;
  message: string;
  field?: string;
  details?: Record<string, any>;
}

export interface PostValidationError extends PostError {
  field: string;
  value?: any;
}
