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
import { colors } from "../theme/colors";
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <Text style={styles.title}>Directory</Text>
          <Text style={styles.subtitle}>
            Search employees by name, role, department, or location.
          </Text>
        </View>

        <View style={styles.actionsRow}>
          <Pressable onPress={onLogout} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Log out</Text>
          </Pressable>
        </View>

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search employees..."
          style={styles.searchInput}
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
              <Text style={styles.emptyTitle}>No employees found</Text>
              <Text style={styles.emptyText}>
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
    backgroundColor: colors.background,
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
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
  },
  actionsRow: {
    flexDirection: "row",
    marginBottom: spacing.xxl,
  },
  secondaryButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 10,
    backgroundColor: colors.secondarySurface,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  searchInput: {
    height: 52,
    borderWidth: 1,
    borderColor: colors.borderInput,
    borderRadius: 12,
    paddingHorizontal: spacing.xl,
    fontSize: 16,
    backgroundColor: colors.primaryText,
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
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textMuted,
    textAlign: "center",
  },
});
