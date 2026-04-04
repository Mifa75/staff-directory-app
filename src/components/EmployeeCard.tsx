import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Employee } from "../data/employees";
import { useThemeStore } from "../store/useThemeStore";
import { getColors } from "../theme/colors";
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
  const theme = useThemeStore((state) => state.theme);
  const colors = getColors(theme);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.mainPressable,
          pressed && styles.mainPressablePressed,
        ]}
      >
        <View style={[styles.avatar, { backgroundColor: colors.textPrimary }]}>
          <Text style={[styles.avatarText, { color: colors.primaryText }]}>
            {getInitials(employee.name)}
          </Text>
        </View>

        <View style={styles.cardContent}>
          <Text style={[styles.name, { color: colors.textPrimary }]}>
            {employee.name}
          </Text>
          <Text style={[styles.role, { color: colors.textSecondary }]}>
            {employee.role}
          </Text>
          <Text style={[styles.meta, { color: colors.textMuted }]}>
            {employee.department} • {employee.location}
          </Text>
          <Text style={[styles.email, { color: colors.accent }]}>
            {employee.email}
          </Text>
        </View>
      </Pressable>

      <Pressable
        onPress={onToggleFavorite}
        hitSlop={8}
        style={({ pressed }) => [
          styles.favoriteButton,
          { backgroundColor: colors.subtleSurface },
          pressed && styles.favoritePressed,
        ]}
      >
        <Text style={[styles.favoriteText, { color: colors.star }]}>
          {isFavorite ? "★" : "☆"}
        </Text>
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
    borderRadius: 16,
    borderWidth: 1,
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
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.lg,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "700",
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  role: {
    fontSize: 15,
    marginBottom: spacing.xs,
  },
  meta: {
    fontSize: 14,
    marginBottom: spacing.xs,
  },
  email: {
    fontSize: 14,
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: spacing.lg,
  },
  favoritePressed: {
    opacity: 0.75,
  },
  favoriteText: {
    fontSize: 20,
  },
});
