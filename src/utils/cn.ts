// src/utils/cn.ts - FIXED AND IMPROVED
import clsx, { ClassValue } from "clsx";

/**
 * Combines class names using clsx
 * Handles undefined, null, false values gracefully
 *
 * @param classes - Class names to combine
 * @returns Combined class string
 */
export function cn(...classes: ClassValue[]): string {
  return clsx(classes);
}

// Alternative if you don't want to use clsx dependency
export function cnSimple(
  ...classes: (string | undefined | null | false)[]
): string {
  return classes.filter(Boolean).join(" ");
}

// Export default for backward compatibility
export default cn;
