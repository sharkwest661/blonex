// src/stores/useFavoritesStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FavoritesState {
  favorites: string[]; // Array of post IDs
  toggleFavorite: (postId: string) => void;
  addFavorite: (postId: string) => void;
  removeFavorite: (postId: string) => void;
  isFavorite: (postId: string) => boolean;
  getFavoritesCount: () => number;
  clearFavorites: () => void;
}

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
      name: "bolbol-favorites", // Storage key
      storage: createJSONStorage(() => {
        // For SSR compatibility, check if we're in the browser
        if (typeof window !== "undefined") {
          return localStorage;
        }
        // Return a mock storage for SSR
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      // Optional: Add version for migration support
      version: 1,
      // Optional: Migrate function for future updates
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Migration logic for version 0 to 1
          return persistedState;
        }
        return persistedState;
      },
    }
  )
);

// Export individual hook functions for convenience
export const useFavorites = () => useFavoritesStore((state) => state.favorites);
export const useToggleFavorite = () =>
  useFavoritesStore((state) => state.toggleFavorite);
export const useIsFavorite = (postId: string) =>
  useFavoritesStore((state) => state.isFavorite(postId));
export const useFavoritesCount = () =>
  useFavoritesStore((state) => state.getFavoritesCount());

export default useFavoritesStore;
