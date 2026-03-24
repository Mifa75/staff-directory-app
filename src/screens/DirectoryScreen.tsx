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

type Employee = {
  id: string;
  name: string;
  role: string;
  department: string;
  location: string;
  email: string;
};

type DirectoryScreenProps = {
  onLogout: () => void;
};

const EMPLOYEES: Employee[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Product Designer",
    department: "Design",
    location: "Edinburgh",
    email: "sarah.johnson@company.com",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Frontend Developer",
    department: "Engineering",
    location: "London",
    email: "michael.chen@company.com",
  },
  {
    id: "3",
    name: "Priya Patel",
    role: "HR Manager",
    department: "People",
    location: "Manchester",
    email: "priya.patel@company.com",
  },
  {
    id: "4",
    name: "James Walker",
    role: "Sales Lead",
    department: "Sales",
    location: "Bristol",
    email: "james.walker@company.com",
  },
  {
    id: "5",
    name: "Elena Rossi",
    role: "Mobile Developer",
    department: "Engineering",
    location: "Edinburgh",
    email: "elena.rossi@company.com",
  },
];

export default function DirectoryScreen({ onLogout }: DirectoryScreenProps) {
  const [search, setSearch] = useState("");

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
          <View>
            <Text style={styles.title}>Directory</Text>
            <Text style={styles.subtitle}>
              Search employees by name, role, department, or location.
            </Text>
          </View>

          <Pressable onPress={onLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Log out</Text>
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
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.role}>{item.role}</Text>
                <Text style={styles.meta}>
                  {item.department} • {item.location}
                </Text>
                <Text style={styles.email}>{item.email}</Text>
              </View>
            </View>
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

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  topRow: {
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: "#475569",
    marginBottom: 16,
  },
  logoutButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#E2E8F0",
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  searchInput: {
    height: 52,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 24,
    gap: 12,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 16,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  role: {
    fontSize: 15,
    color: "#334155",
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#2563EB",
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
