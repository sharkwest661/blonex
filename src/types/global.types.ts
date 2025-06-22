// src/types/global.types.ts

// Generic ID type
export type ID = string;

// Generic response status
export type Status = "idle" | "loading" | "success" | "error";

// Common filter types
export type SortOrder = "asc" | "desc";
export type SortField = string;

// Language types
export type Language = "az" | "en" | "ru";

// Currency types
export type Currency = "AZN" | "USD" | "EUR";

// Theme types
export type Theme = "light" | "dark" | "system";

// Device types
export type DeviceType = "mobile" | "tablet" | "desktop";

// Navigation item
export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
  isExternal?: boolean;
  requiresAuth?: boolean;
}

// Breadcrumb item
export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

// Meta information for SEO
export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  canonical?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

// Common component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  testId?: string;
}

// Form field types
export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "tel"
    | "number"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio"
    | "file"
    | "date";
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: Array<{ value: string; label: string }>;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    custom?: (value: unknown) => boolean | string;
  };
}

// Notification types
export type NotificationType = "success" | "error" | "warning" | "info";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  actions?: Array<{
    label: string;
    action: () => void;
  }>;
}

// Modal props
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

// Loading state
export interface LoadingState {
  isLoading: boolean;
  loadingText?: string;
  progress?: number;
}

// Error state
export interface ErrorState {
  hasError: boolean;
  error?: Error | string;
  errorCode?: string;
  retryAction?: () => void;
}

// Coordinates for map/location
export interface Coordinates {
  lat: number;
  lng: number;
}

// Address information
export interface Address {
  street?: string;
  city: string;
  region?: string;
  postalCode?: string;
  country?: string;
  coordinates?: Coordinates;
}

// File information
export interface FileInfo {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  thumbnailUrl?: string;
  uploadedAt: Date;
}

// Social media links
export interface SocialMediaLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  whatsapp?: string;
  telegram?: string;
}

// Contact information
export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
  address?: Address;
  socialMedia?: SocialMediaLinks;
}

// Date range
export interface DateRange {
  start: Date;
  end: Date;
}

// Price range
export interface PriceRange {
  min: number;
  max: number;
  currency: Currency;
}

// Generic API error
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: Date;
}

// Environment variables (for type safety)
export interface EnvironmentVariables {
  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_SITE_URL: string;
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?: string;
  NEXT_PUBLIC_ANALYTICS_ID?: string;
}

// Window size for responsive design
export interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

// Generic dropdown option
export interface DropdownOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
  icon?: string;
  description?: string;
}

// Export types that might be used as defaults elsewhere
export type { BaseComponentProps as default };
