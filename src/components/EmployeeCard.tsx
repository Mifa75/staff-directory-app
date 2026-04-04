import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Employee } from "../data/employees";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

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
    <View style={styles.card}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.mainPressable,
          pressed && styles.mainPressablePressed,
        ]}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitials(employee.name)}</Text>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.name}>{employee.name}</Text>
          <Text style={styles.role}>{employee.role}</Text>
          <Text style={styles.meta}>
            {employee.department} • {employee.location}
          </Text>
          <Text style={styles.email}>{employee.email}</Text>
        </View>
      </Pressable>

      <Pressable
        onPress={onToggleFavorite}
        hitSlop={8}
        style={({ pressed }) => [
          styles.favoriteButton,
          pressed && styles.favoritePressed,
        ]}
      >
        <Text style={styles.favoriteText}>{isFavorite ? "★" : "☆"}</Text>
      </Pressable>
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

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xxl,
    marginBottom: spacing.lg,
  },
  mainPressable: {
    flex: 1,
    flexDirection: "row",
  },
  mainPressablePressed: {
    opacity: 0.85,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.xl,
  },
  avatarText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "700",
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: spacing.xxs,
  },
  role: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: spacing.xxs,
  },
  meta: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.xxs,
  },
  email: {
    fontSize: 14,
    color: colors.accent,
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.subtleSurface,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: spacing.lg,
  },
  favoritePressed: {
    opacity: 0.75,
  },
  favoriteText: {
    fontSize: 20,
    color: colors.star,
  },
});
