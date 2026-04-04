import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStore } from "../store/useThemeStore";
import { getColors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type SettingsScreenProps = {
  onLogout: () => void;
};

export default function SettingsScreen({ onLogout }: SettingsScreenProps) {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const colors = getColors(theme);
  const isDarkMode = theme === "dark";

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Settings
        </Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Personalize the app experience.
        </Text>

        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={[styles.rowTitle, { color: colors.textPrimary }]}>
                Dark Mode
              </Text>
              <Text style={[styles.rowSubtitle, { color: colors.textMuted }]}>
                Switch between light and dark appearance.
              </Text>
            </View>

            <Switch value={isDarkMode} onValueChange={() => toggleTheme()} />
          </View>
        </View>

        <Pressable
          onPress={onLogout}
          style={[
            styles.logoutButton,
            {
              backgroundColor: colors.secondarySurface,
            },
          ]}
        >
          <Text
            style={[styles.logoutButtonText, { color: colors.secondaryText }]}
          >
            Log out
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.xxxl,
    paddingTop: spacing.lg,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: spacing.xxl,
  },
  card: {
    borderWidth: 1,
    borderRadius: 20,
    padding: spacing.xxl,
    marginBottom: spacing.xxl,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowText: {
    flex: 1,
    marginRight: spacing.lg,
  },
  rowTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  rowSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  logoutButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
