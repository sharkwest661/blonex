// src/utils/debugStoreRenders.ts - Utility for debugging store render issues
import { useRef, useEffect } from "react";

/**
 * Hook to debug component re-renders and identify what's causing them
 * Use this temporarily to find the source of infinite loops
 */
export const useWhyDidYouUpdate = (
  name: string,
  props: Record<string, any>
) => {
  // Get a mutable ref object where we can store props for comparison next time this hook runs.
  const previousProps = useRef<Record<string, any>>();

  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props });

      // Use this object to keep track of changed props
      const changedProps: Record<string, { from: any; to: any }> = {};

      // Iterate through keys and identify changed props
      allKeys.forEach((key) => {
        // If previous is different from current
        if (previousProps.current![key] !== props[key]) {
          // Add to changedProps
          changedProps[key] = {
            from: previousProps.current![key],
            to: props[key],
          };
        }
      });

      // If changedProps not empty then output to console
      if (Object.keys(changedProps).length) {
        console.log("[why-did-you-update]", name, changedProps);
      }
    }

    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  });
};

/**
 * Hook to track store subscriptions and detect potential issues
 */
export const useStoreDebugger = (storeName: string, storeState: any) => {
  const renderCount = useRef(0);
  const lastState = useRef(storeState);

  useEffect(() => {
    renderCount.current += 1;

    if (renderCount.current > 10) {
      console.warn(`🚨 [${storeName}] High render count:`, renderCount.current);
      console.log("Current state:", storeState);
      console.log("Previous state:", lastState.current);

      // Check if state is actually changing
      const stateChanged =
        JSON.stringify(lastState.current) !== JSON.stringify(storeState);
      console.log("State actually changed:", stateChanged);
    }

    lastState.current = storeState;
  });

  return renderCount.current;
};

/**
 * Add this to your store to track subscriptions
 */
export const createStoreDebugger = (storeName: string) => {
  let subscriptionCount = 0;

  return {
    onSubscribe: () => {
      subscriptionCount++;
      console.log(
        `📊 [${storeName}] New subscription. Total: ${subscriptionCount}`
      );
    },
    onUnsubscribe: () => {
      subscriptionCount--;
      console.log(
        `📊 [${storeName}] Unsubscribed. Total: ${subscriptionCount}`
      );
    },
    getSubscriptionCount: () => subscriptionCount,
  };
};

// Example usage in components:
/*
// In your component:
const NeqliyyatPage = () => {
  const sortBy = useVehicleFilterStore((state) => state.sortBy);
  const setSortBy = useVehicleFilterStore((state) => state.setSortBy);
  
  // Debug renders
  const renderCount = useStoreDebugger('NeqliyyatPage', { sortBy });
  
  // Debug prop changes
  useWhyDidYouUpdate('NeqliyyatPage', { 
    sortBy,
    setSortBy: setSortBy.toString() // Convert function to string for comparison
  });
  
  console.log(`NeqliyyatPage render #${renderCount}`);
  
  // Rest of component...
};
*/
