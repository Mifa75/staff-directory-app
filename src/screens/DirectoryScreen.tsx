import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmployeeCard from "../components/EmployeeCard";
import { EMPLOYEES, type Employee } from "../data/employees";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { useThemeStore } from "../store/useThemeStore";
import { getColors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type DirectoryScreenProps = {
  onLogout: () => void;
  onSelectEmployee: (employee: Employee) => void;
};

export default function DirectoryScreen({
  onLogout,
  onSelectEmployee,
}: DirectoryScreenProps) {
  const [search, setSearch] = useState("");

  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const theme = useThemeStore((state) => state.theme);
  const colors = getColors(theme);

  const filteredEmployees = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return EMPLOYEES;
    }

    return EMPLOYEES.filter((employee) => {
      return (
        employee.name.toLowerCase().includes(normalizedSearch) ||
        employee.role.toLowerCase().includes(normalizedSearch) ||
        employee.department.toLowerCase().includes(normalizedSearch) ||
        employee.location.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [search]);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <View style={styles.container}>
        <View style={styles.topRow}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            Directory
          </Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            Search employees by name, role, department, or location.
          </Text>
        </View>

        <View style={styles.actionsRow}>
          <Pressable
            onPress={onLogout}
            style={[
              styles.secondaryButton,
              { backgroundColor: colors.secondarySurface },
            ]}
          >
            <Text
              style={[
                styles.secondaryButtonText,
                { color: colors.secondaryText },
              ]}
            >
              Log out
            </Text>
          </Pressable>
        </View>

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search employees..."
          placeholderTextColor={colors.textMuted}
          style={[
            styles.searchInput,
            {
              borderColor: colors.borderInput,
              backgroundColor: colors.surface,
              color: colors.textPrimary,
            },
          ]}
        />

        <FlatList
          data={filteredEmployees}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          renderItem={({ item }) => (
            <EmployeeCard
              employee={item}
              onPress={() => onSelectEmployee(item)}
              isFavorite={favoriteIds.includes(item.id)}
              onToggleFavorite={() => toggleFavorite(item.id)}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
                No employees found
              </Text>
              <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                Try another name, department, role, or location.
              </Text>
            </View>
          }
        />
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
  topRow: {
    marginBottom: spacing.xxxl,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  actionsRow: {
    flexDirection: "row",
    marginBottom: spacing.xxl,
  },
  secondaryButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 10,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  searchInput: {
    height: 52,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: spacing.xl,
    fontSize: 16,
    marginBottom: spacing.xxl,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: spacing.xxxxl,
  },
  emptyState: {
    marginTop: spacing.huge,
    alignItems: "center",
    paddingHorizontal: spacing.xxxxl,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
});
