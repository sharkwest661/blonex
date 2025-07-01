// src/stores/useFavoritesStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useEffect, useState } from "react";

interface FavoritesState {
  favorites: string[];
  toggleFavorite: (postId: string) => void;
  addFavorite: (postId: string) => void;
  removeFavorite: (postId: string) => void;
  isFavorite: (postId: string) => boolean;
  getFavoritesCount: () => number;
  clearFavorites: () => void;
}

// Create SSR-safe storage that won't cause hydration issues
const createSSRSafeStorage = () => {
  if (typeof window === "undefined") {
    // Return a no-op storage for server-side rendering
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }
  return localStorage;
};

// Main store with persistence
export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (postId: string) => {
        set((state) => {
          const isCurrentlyFavorite = state.favorites.includes(postId);
          if (isCurrentlyFavorite) {
            return {
              favorites: state.favorites.filter((id) => id !== postId),
            };
          } else {
            return {
              favorites: [...state.favorites, postId],
            };
          }
        });
      },

      addFavorite: (postId: string) => {
        set((state) => {
          if (!state.favorites.includes(postId)) {
            return {
              favorites: [...state.favorites, postId],
            };
          }
          return state;
        });
      },

      removeFavorite: (postId: string) => {
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== postId),
        }));
      },

      isFavorite: (postId: string) => {
        return get().favorites.includes(postId);
      },

      getFavoritesCount: () => {
        return get().favorites.length;
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: "bolbol-favorites",
      storage: createJSONStorage(() => createSSRSafeStorage()),
      skipHydration: true, // Skip automatic hydration to prevent SSR mismatch
      version: 1,
    }
  )
);

// Hydration-safe hook that handles SSR properly
export const useFavoritesStoreHydrated = () => {
  const [hydrated, setHydrated] = useState(false);
  const store = useFavoritesStore();

  useEffect(() => {
    // Only rehydrate on the client side
    if (typeof window !== "undefined") {
      useFavoritesStore.persist.rehydrate();
      setHydrated(true);
    }
  }, []);

  // Return store data only after hydration on client, or safe defaults on server
  if (typeof window === "undefined" || !hydrated) {
    // Return safe defaults for SSR and before hydration
    return {
      favorites: [],
      toggleFavorite: (postId: string) => {
        // After hydration, this will work normally
        if (hydrated) {
          store.toggleFavorite(postId);
        }
      },
      addFavorite: (postId: string) => {
        if (hydrated) {
          store.addFavorite(postId);
        }
      },
      removeFavorite: (postId: string) => {
        if (hydrated) {
          store.removeFavorite(postId);
        }
      },
      isFavorite: (postId: string) => {
        return hydrated ? store.isFavorite(postId) : false;
      },
      getFavoritesCount: () => {
        return hydrated ? store.getFavoritesCount() : 0;
      },
      clearFavorites: () => {
        if (hydrated) {
          store.clearFavorites();
        }
      },
    };
  }

  // Return actual store after hydration
  return store;
};

// Export convenience hooks for easier usage
export const useFavorites = () => {
  const { favorites } = useFavoritesStoreHydrated();
  return favorites;
};

export const useToggleFavorite = () => {
  const { toggleFavorite } = useFavoritesStoreHydrated();
  return toggleFavorite;
};

export const useIsFavorite = (postId: string) => {
  const { isFavorite } = useFavoritesStoreHydrated();
  return isFavorite(postId);
};

export const useFavoritesCount = () => {
  const { getFavoritesCount } = useFavoritesStoreHydrated();
  return getFavoritesCount();
};

// Default export
export default useFavoritesStore;
