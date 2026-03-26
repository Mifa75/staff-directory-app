import { create } from "zustand";

type FavotitesStore = {
  favoriteIds: string[];
  toggleFavorite: (employeeId: string) => void;
  isFavorite: (employeedId: string) => boolean;
};

export const useFavoritesStore = create<FavotitesStore>((set, get) => ({
  favoriteIds: [],

  toggleFavorite: (employeeId: string) => {
    const currentFavoriteIds = get().favoriteIds;

    if (currentFavoriteIds.includes(employeeId)) {
      set({
        favoriteIds: currentFavoriteIds.filter((id) => id !== employeeId),
      });
      return;
    }
    set({
      favoriteIds: [...currentFavoriteIds, employeeId],
    });
  },

  isFavorite: (employeeId: string) => {
    return get().favoriteIds.includes(employeeId);
  },
}));
