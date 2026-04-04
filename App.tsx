import { useEffect } from "react";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppNavigator";
import { useFavoritesStore } from "./src/store/useFavoritesStore";
import { useRecentContactsStore } from "./src/store/useRecentContactsStore";
import { useThemeStore } from "./src/store/useThemeStore";
import { getColors } from "./src/theme/colors";

export default function App() {
  const loadFavorites = useFavoritesStore((state) => state.loadFavorites);
  const hasFavoritesHydrated = useFavoritesStore((state) => state.hasHydrated);

  const loadRecentContacts = useRecentContactsStore(
    (state) => state.loadRecentContacts,
  );
  const hasRecentContactsHydrated = useRecentContactsStore(
    (state) => state.hasHydrated,
  );

  const loadTheme = useThemeStore((state) => state.loadTheme);
  const hasThemeHydrated = useThemeStore((state) => state.hasHydrated);
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    loadFavorites();
    loadRecentContacts();
    loadTheme();
  }, [loadFavorites, loadRecentContacts, loadTheme]);

  const isReady =
    hasFavoritesHydrated && hasRecentContactsHydrated && hasThemeHydrated;

  const colors = getColors(theme);

  if (!isReady) {
    return (
      <SafeAreaProvider>
        <View
          style={[
            styles.loadingContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <StatusBar
            barStyle={theme === "dark" ? "light-content" : "dark-content"}
          />
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
