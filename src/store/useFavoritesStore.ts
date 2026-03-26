import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const FAVORITES_STORAGE_KEY = "favorite-employee-ids";

type FavotitesStore = {
  favoriteIds: string[];
  hasHydrated: boolean;
  toggleFavorite: (employeeId: string) => void;
  isFavorite: (employeedId: string) => boolean;
  loadFavorites: () => Promise<void>;
};

export const useFavoritesStore = create<FavotitesStore>((set, get) => ({
  favoriteIds: [],
  hasHydrated: false,

  toggleFavorite: async (employeeId: string) => {
    const currentFavoriteIds = get().favoriteIds;

    const updatedFavoriteIds = currentFavoriteIds.includes(employeeId)
      ? currentFavoriteIds.filter((id) => id !== employeeId)
      : [...currentFavoriteIds, employeeId];

    set({ favoriteIds: updatedFavoriteIds });

    try {
      await AsyncStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(updatedFavoriteIds),
      );
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  },

  isFavorite: (employeeId: string) => {
    return get().favoriteIds.includes(employeeId);
  },

  loadFavorites: async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);

      if (storedFavorites) {
        const parsedFavorites: string[] = JSON.parse(storedFavorites);
        set({ favoriteIds: parsedFavorites, hasHydrated: true });
        return;
      }

      set({ favoriteIds: [], hasHydrated: true });
    } catch (error) {
      console.error("Failed to load favorites:", error);
      set({ favoriteIds: [], hasHydrated: true });
    }
  },
}));
