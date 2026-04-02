import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmployeeCard from "../components/EmployeeCard";
import { EMPLOYEES, type Employee } from "../data/employees";
import { useFavoritesStore } from "../store/useFavoritesStore";

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
    backgroundColor: "#F8FAFC",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: "#475569",
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyState: {
    marginTop: 40,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#64748B",
    textAlign: "center",
  },
});
