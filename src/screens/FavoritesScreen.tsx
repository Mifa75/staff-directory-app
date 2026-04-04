import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmployeeCard from "../components/EmployeeCard";
import { EMPLOYEES, type Employee } from "../data/employees";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type FavoritesScreenProps = {
  onSelectEmployee: (employee: Employee) => void;
};

export default function FavoritesScreen({
  onSelectEmployee,
}: FavoritesScreenProps) {
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const favoriteEmployees = EMPLOYEES.filter((employee) =>
    favoriteIds.includes(employee.id),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.subtitle}>
          Quick access to your saved employee contacts.
        </Text>

        <FlatList
          data={favoriteEmployees}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
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
              <Text style={styles.emptyTitle}>No favorite contacts yet</Text>
              <Text style={styles.emptyText}>
                Save employees from the directory to see them here.
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
