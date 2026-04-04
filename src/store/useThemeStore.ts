import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const THEME_STORAGE_KEY = "app-theme";

export type AppThemeMode = "light" | "dark";

type ThemeStore = {
  theme: AppThemeMode;
  hasHydrated: boolean;
  setTheme: (theme: AppThemeMode) => Promise<void>;
  toggleTheme: () => Promise<void>;
  loadTheme: () => Promise<void>;
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: "light",
  hasHydrated: false,

  setTheme: async (theme) => {
    set({ theme });

    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      console.error("Failed to save theme");
    }
  },

  toggleTheme: async () => {
    const nextTheme = get().theme === "light" ? "dark" : "light";
    set({ theme: nextTheme });

    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      console.error("Failed to save theme");
    }
  },

  loadTheme: async () => {
    try {
      const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);

      if (storedTheme === "light" || storedTheme === "dark") {
        set({
          theme: storedTheme,
          hasHydrated: true,
        });
        return;
      }

      set({
        theme: "light",
        hasHydrated: true,
      });
    } catch {
      console.error("Failed to load theme");
      set({
        theme: "light",
        hasHydrated: true,
      });
    }
  },
}));