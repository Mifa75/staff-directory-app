import { useEffect } from "react";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppNavigator";
import { useFavoritesStore } from "./src/store/useFavoritesStore";
import { useRecentContactsStore } from "./src/store/useRecentContactsStore";

export default function App() {
  const loadFavorites = useFavoritesStore((state) => state.loadFavorites);
  const hasFavoritesHydrated = useFavoritesStore((state) => state.hasHydrated);

  const loadRecentContacts = useRecentContactsStore(
    (state) => state.loadRecentContacts,
  );
  const hasRecentContactsHydrated = useRecentContactsStore(
    (state) => state.hasHydrated,
  );

  useEffect(() => {
    loadFavorites();
    loadRecentContacts();
  }, [loadFavorites, loadRecentContacts]);

  const isReady = hasFavoritesHydrated && hasRecentContactsHydrated;

  if (!isReady) {
    return (
      <SafeAreaProvider>
        <View style={styles.loadingContainer}>
          <StatusBar barStyle="dark-content" />
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
  },
});
