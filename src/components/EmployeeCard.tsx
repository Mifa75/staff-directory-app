import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Employee } from "../data/employees";

type EmployeeCardProps = {
  employee: Employee;
  onPress: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export default function EmployeeCard({
  employee,
  onPress,
  isFavorite,
  onToggleFavorite,
}: EmployeeCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getInitials(employee.name)}</Text>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.topRow}>
          <Text style={styles.name}>{employee.name}</Text>

          <Pressable
            onPress={onToggleFavorite}
            style={({ pressed }) => [
              styles.favoriteButton,
              pressed && styles.favoritePressed,
            ]}
          >
            <Text style={styles.favoriteText}>{isFavorite ? "★" : "☆"}</Text>
          </Pressable>
        </View>

        <Text style={styles.role}>{employee.role}</Text>
        <Text style={styles.meta}>
          {employee.department} • {employee.location}
        </Text>
        <Text style={styles.email}>{employee.email}</Text>
      </View>
    </Pressable>
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
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 16,
    marginBottom: 12,
  },
  cardPressed: {
    opacity: 0.85,
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
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  favoriteButton: {
    minWidth: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  favoritePressed: {
    opacity: 0.8,
  },
  favoriteText: {
    fontSize: 20,
    color: "#F59E0B",
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
});
