import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Employee } from "../data/employees";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { useRecentContactsStore } from "../store/useRecentContactsStore";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { openEmail, openPhone } from "../utils/contactActions";

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
}: EmployeeDetailsScreenProps) {
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const addRecentContact = useRecentContactsStore(
    (state) => state.addRecentContact,
  );

  const isFavorite = favoriteIds.includes(employee.id);

  useEffect(() => {
    addRecentContact(employee.id);
  }, [employee.id, addRecentContact]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
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
          <Pressable
            onPress={() => openEmail(employee.email)}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>Email</Text>
          </Pressable>

          <Pressable
            onPress={() => openPhone(employee.phone)}
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}
          >
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
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.xxxl,
    paddingTop: spacing.lg,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  headerCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xxxxl,
    alignItems: "center",
    marginBottom: spacing.xxl,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.textPrimary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xxl,
  },
  avatarText: {
    color: colors.primaryText,
    fontSize: 24,
    fontWeight: "700",
  },
  name: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  role: {
    fontSize: 17,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  meta: {
    fontSize: 15,
    color: colors.textMuted,
  },
  favoriteButton: {
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: 10,
    backgroundColor: colors.warningSurface,
  },
  favoriteButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.warningText,
  },
  infoCard: {
    backgroundColor: colors.primaryText,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xxxl,
    marginBottom: spacing.xxxl,
  },
  infoRow: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textMuted,
    marginBottom: spacing.xxs,
    textTransform: "uppercase",
  },
  value: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  actionsRow: {
    flexDirection: "row",
    gap: spacing.lg,
  },
  primaryButton: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.textPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: colors.primaryText,
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
});
