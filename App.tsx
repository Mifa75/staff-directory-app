import { useEffect } from "react";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppNavigator";
import { useFavoritesStore } from "./src/store/useFavoritesStore";

export default function App() {
  const loadFavorites = useFavoritesStore((state) => state.loadFavorites);
  const hasHydrated = useFavoritesStore((state) => state.hasHydrated);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  if (!hasHydrated) {
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
