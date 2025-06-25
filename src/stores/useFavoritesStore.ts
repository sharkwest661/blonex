// src/stores/useFavoritesStore.ts - HYDRATION FIX
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

// ✅ FIX: SSR-safe storage
const createSSRSafeStorage = () => {
  if (typeof window === "undefined") {
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }
  return localStorage;
};

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
      // ✅ FIX: Skip hydration to prevent mismatch
      skipHydration: true,
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return persistedState;
        }
        return persistedState;
      },
    }
  )
);

// ✅ FIX: Hydration-safe hook
export const useFavoritesStoreHydrated = () => {
  const [hydrated, setHydrated] = useState(false);
  const store = useFavoritesStore();

  useEffect(() => {
    useFavoritesStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  return hydrated
    ? store
    : {
        favorites: [],
        toggleFavorite: () => {},
        addFavorite: () => {},
        removeFavorite: () => {},
        isFavorite: () => false,
        getFavoritesCount: () => 0,
        clearFavorites: () => {},
      };
};

// Export individual hydration-safe hooks
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

export default useFavoritesStore;
