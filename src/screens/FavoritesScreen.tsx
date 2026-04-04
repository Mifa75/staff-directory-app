import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmployeeCard from "../components/EmployeeCard";
import { EMPLOYEES, type Employee } from "../data/employees";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { useThemeStore } from "../store/useThemeStore";
import { getColors } from "../theme/colors";
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

  const theme = useThemeStore((state) => state.theme);
  const colors = getColors(theme);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Favorites
        </Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
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
              <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
                No favorite contacts yet
              </Text>
              <Text style={[styles.emptyText, { color: colors.textMuted }]}>
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
