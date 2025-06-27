// Main Product Detail Page
export { default as ProductDetailPage } from "./ProductDetailPage";

// Individual Components
export { default as ProductCarousel } from "./ProductCarousel";
export { default as ProductInfo } from "./ProductInfo";
export { default as StoreProfile } from "./StoreProfile";
export { default as PromotionActions } from "./PromotionActions";
export { default as ReviewSection } from "./ReviewSection";
export { default as ComplaintModal } from "./ComplaintModal";
export { default as SimilarListings } from "./SimilarListings";

// Type exports - using interface names from the components
export type { ProductDetailPageProps } from "./ProductDetailPage";
export type ProductCarouselProps = {
  images: string[];
  title: string;
};
export type ProductInfoProps = {
  product: {
    id: string;
    title: string;
    price: number;
    currency: string;
    condition: string;
    location: string;
    viewCount: number;
    lastUpdated: string;
    breadcrumb: { name: string; href?: string }[];
    features: {
      delivery: boolean;
      barter: boolean;
      credit: boolean;
    };
    specifications: Record<string, string>;
    description: string;
  };
  isFavorite: boolean;
  onFavoriteToggle: () => void;
};
export type StoreProfileProps = {
  storeInfo: {
    name: string;
    logo: string;
    address: string;
    hours: string;
    phones: string[];
    totalListings: number;
  };
};
export type PromotionActionsProps = {
  className?: string;
};
export type ComplaintModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
export type SimilarListingsProps = {
  className?: string;
};
