// src/hooks/useDebounce.ts
import { useState, useEffect } from "react";

/**
 * Custom hook for debouncing values
 * Useful for search inputs, API calls, and performance optimization
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 500ms)
 * @returns The debounced value
 *
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 *
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     // Make API call with debounced value
 *     searchAPI(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 * ```
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the specified delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer if the value or delay changes
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]); // Re-run effect when value or delay changes

  return debouncedValue;
}

/**
 * Alternative hook that provides both debounced value and loading state
 * Useful when you want to show loading indicators during debouncing
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 500ms)
 * @returns Object with debounced value and isDebouncing state
 */
export function useDebounceWithLoading<T>(
  value: T,
  delay: number = 500
): { debouncedValue: T; isDebouncing: boolean } {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isDebouncing, setIsDebouncing] = useState<boolean>(false);

  useEffect(() => {
    // Set loading state if value is different from debounced value
    setIsDebouncing(value !== debouncedValue);

    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, debouncedValue]);

  return { debouncedValue, isDebouncing };
}

/**
 * Hook for debouncing callbacks/functions
 * Useful for debouncing expensive operations or API calls directly
 *
 * @param callback - The function to debounce
 * @param delay - Delay in milliseconds (default: 500ms)
 * @param deps - Dependency array for the callback
 * @returns The debounced callback function
 */
export function useDebounceCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 500,
  deps: React.DependencyList = []
): T {
  const [debouncedCallback, setDebouncedCallback] = useState<T | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCallback(() => callback);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [...deps, delay]);

  return (debouncedCallback || callback) as T;
}

export default useDebounce;
