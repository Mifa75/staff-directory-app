import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Employee } from "../data/employees";
import { useFavoritesStore } from "../store/useFavoritesStore";

type EmployeeDetailsScreenProps = {
  employee: Employee;
  onBack: () => void;
};

type LabelValueProps = {
  label: string;
  value: string;
};

function LabelValue({ label, value }: LabelValueProps) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
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

export default function EmployeeDetailScreen({
  employee,
  onBack,
}: EmployeeDetailsScreenProps) {
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const isFavorite = favoriteIds.includes(employee.id);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>

        <View style={styles.headerCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(employee.name)}</Text>
          </View>

          <Text style={styles.name}>{employee.name}</Text>
          <Text style={styles.role}>{employee.role}</Text>
          <Text style={styles.meta}>
            {employee.department} • {employee.location}
          </Text>
          <Pressable
            onPress={() => toggleFavorite(employee.id)}
            style={styles.favoriteButton}
          >
            <Text style={styles.favoriteButtonText}>
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Text>
          </Pressable>
        </View>

        <View style={styles.infoCard}>
          <LabelValue label="Email" value={employee.email} />
          <LabelValue label="Phone" value={employee.phone} />
          <LabelValue label="Manager" value={employee.manager} />
        </View>

        <View style={styles.actionsRow}>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Email</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Call</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
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
  backButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#E2E8F0",
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  headerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },
  name: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 6,
  },
  role: {
    fontSize: 17,
    color: "#334155",
    marginBottom: 6,
  },
  meta: {
    fontSize: 15,
    color: "#64748B",
  },
  favoriteButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#FEF3C7",
  },
  favoriteButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#92400E",
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 20,
    marginBottom: 20,
  },
  infoRow: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  value: {
    fontSize: 16,
    color: "#0F172A",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "600",
  },
});
