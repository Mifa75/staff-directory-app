import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const RECENTS_STORAGE_KEY = "recent-contact-ids";
const MAX_RECENT_CONTACTS = 5;

type RecentContactsStore = {
  recentContactIds: string[];
  hasHydrated: boolean;
  addRecentContact: (employeeId: string) => Promise<void>;
  loadRecentContacts: () => Promise<void>;
};

export const useRecentContactsStore = create<RecentContactsStore>(
  (set, get) => ({
    recentContactIds: [],
    hasHydrated: false,

    addRecentContact: async (employeeId: string) => {
      const currentRecentIds = get().recentContactIds;

      const updatedRecentIds = [
        employeeId,
        ...currentRecentIds.filter((id) => id !== employeeId),
      ].slice(0, MAX_RECENT_CONTACTS);

      set({ recentContactIds: updatedRecentIds });

      try {
        await AsyncStorage.setItem(
          RECENTS_STORAGE_KEY,
          JSON.stringify(updatedRecentIds),
        );
      } catch {
        console.error("Failed to save recent contacts");
      }
    },

    loadRecentContacts: async () => {
      try {
        const storedRecentContacts =
          await AsyncStorage.getItem(RECENTS_STORAGE_KEY);

        if (storedRecentContacts) {
          const parsedRecentContacts: string[] =
            JSON.parse(storedRecentContacts);
          set({
            recentContactIds: parsedRecentContacts,
            hasHydrated: true,
          });
          return;
        }

        set({
          recentContactIds: [],
          hasHydrated: true,
        });
      } catch {
        console.error("Failed to load recent contacts");
        set({
          recentContactIds: [],
          hasHydrated: true,
        });
      }
    },
  }),
);
