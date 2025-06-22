// src/services/types/user.types.ts

// User role types
export type UserRole = "user" | "admin" | "moderator" | "business";

// User status
export type UserStatus =
  | "active"
  | "inactive"
  | "suspended"
  | "pending_verification";

// User verification status
export interface UserVerification {
  email: boolean;
  phone: boolean;
  identity: boolean;
  business?: boolean;
}

// User preferences
export interface UserPreferences {
  language: "az" | "en" | "ru";
  currency: "AZN" | "USD" | "EUR";
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    marketing: boolean;
  };
  privacy: {
    showPhone: boolean;
    showEmail: boolean;
    showLastSeen: boolean;
  };
}

// User profile
export interface UserProfile {
  id: string;
  email: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatar?: string;
  bio?: string;
  location?: {
    city: string;
    region?: string;
  };
  dateOfBirth?: string;
  gender?: "male" | "female" | "other" | "prefer_not_to_say";
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    telegram?: string;
    whatsapp?: string;
  };
}

// Complete user interface
export interface User {
  id: string;
  profile: UserProfile;
  role: UserRole;
  status: UserStatus;
  verification: UserVerification;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
  lastSeenAt?: string;
  isOnline: boolean;
  listingCount: number;
  favoriteCount: number;
  rating?: {
    average: number;
    count: number;
  };
}

// Authentication payload
export interface LoginPayload {
  phone: string;
  password?: string;
  verificationCode?: string; // For SMS-based login
}

export interface RegisterPayload {
  phone: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  acceptedTerms: boolean;
}

// User update payload
export interface UpdateUserPayload {
  profile?: Partial<UserProfile>;
  preferences?: Partial<UserPreferences>;
}

// User statistics
export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  newUsersThisWeek: number;
  newUsersThisMonth: number;
  verifiedUsers: number;
  businessUsers: number;
  averageListingsPerUser: number;
}

// User activity
export interface UserActivity {
  id: string;
  userId: string;
  type:
    | "listing_created"
    | "listing_updated"
    | "listing_deleted"
    | "favorite_added"
    | "favorite_removed"
    | "profile_updated";
  details: Record<string, unknown>;
  createdAt: string;
}

// User session
export interface UserSession {
  id: string;
  userId: string;
  deviceInfo: {
    type: "mobile" | "desktop" | "tablet";
    os: string;
    browser: string;
    userAgent: string;
  };
  location?: {
    city: string;
    country: string;
    ip: string;
  };
  createdAt: string;
  lastActiveAt: string;
  isActive: boolean;
}

// Authentication context
export interface AuthUser {
  id: string;
  email: string;
  phone: string;
  displayName: string;
  avatar?: string;
  role: UserRole;
  isVerified: boolean;
  preferences: UserPreferences;
}

export default User;
