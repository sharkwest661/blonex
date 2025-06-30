// src/utils/formatters.ts
// Utility functions for consistent data formatting

/**
 * Format price with consistent comma separators
 * Avoids hydration mismatches by not using toLocaleString()
 */
export const formatPrice = (price: number | string): string => {
  if (typeof price === "string") return price;

  // Manual formatting to avoid locale differences between server/client
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Format currency with price and symbol
 */
export const formatCurrency = (
  price: number | string,
  currency: string = "₼"
): string => {
  return `${formatPrice(price)} ${currency}`;
};

/**
 * Format date consistently
 */
export const formatDate = (date: string | Date): string => {
  if (typeof date === "string") return date;

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}.${month}.${year}, ${hours}:${minutes}`;
};

/**
 * Format large numbers (like view counts)
 */
export const formatCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return formatPrice(count);
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
};

/**
 * Format phone number
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, "");

  // Format Azerbaijan phone numbers: +994 XX XXX XX XX
  if (cleaned.startsWith("994") && cleaned.length === 12) {
    return `+${cleaned.substring(0, 3)} ${cleaned.substring(
      3,
      5
    )} ${cleaned.substring(5, 8)} ${cleaned.substring(
      8,
      10
    )} ${cleaned.substring(10)}`;
  }

  return phone; // Return original if not standard format
};
