import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Employee } from "../data/employees";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { useRecentContactsStore } from "../store/useRecentContactsStore";
import { useThemeStore } from "../store/useThemeStore";
import { getColors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { openEmail, openPhone } from "../utils/contactActions";

type EmployeeDetailsScreenProps = {
  employee: Employee;
};

type LabelValueProps = {
  label: string;
  value: string;
  labelColor: string;
  valueColor: string;
};

function LabelValue({ label, value, labelColor, valueColor }: LabelValueProps) {
  return (
    <View style={styles.infoRow}>
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      <Text style={[styles.value, { color: valueColor }]}>{value}</Text>
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

  const theme = useThemeStore((state) => state.theme);
  const colors = getColors(theme);

  useEffect(() => {
    addRecentContact(employee.id);
  }, [employee.id, addRecentContact]);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <View style={styles.container}>
        <View
          style={[
            styles.headerCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View
            style={[styles.avatar, { backgroundColor: colors.textPrimary }]}
          >
            <Text style={[styles.avatarText, { color: colors.primaryText }]}>
              {getInitials(employee.name)}
            </Text>
          </View>

          <Text style={[styles.name, { color: colors.textPrimary }]}>
            {employee.name}
          </Text>
          <Text style={[styles.role, { color: colors.textSecondary }]}>
            {employee.role}
          </Text>
          <Text style={[styles.meta, { color: colors.textMuted }]}>
            {employee.department} • {employee.location}
          </Text>
          <Pressable
            onPress={() => toggleFavorite(employee.id)}
            style={[
              styles.favoriteButton,
              { backgroundColor: colors.warningSurface },
            ]}
          >
            <Text
              style={[styles.favoriteButtonText, { color: colors.warningText }]}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Text>
          </Pressable>
        </View>

        <View
          style={[
            styles.infoCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <LabelValue
            label="Email"
            value={employee.email}
            labelColor={colors.textMuted}
            valueColor={colors.textPrimary}
          />
          <LabelValue
            label="Phone"
            value={employee.phone}
            labelColor={colors.textMuted}
            valueColor={colors.textPrimary}
          />
          <LabelValue
            label="Manager"
            value={employee.manager}
            labelColor={colors.textMuted}
            valueColor={colors.textPrimary}
          />
        </View>

        <View style={styles.actionsRow}>
          <Pressable
            onPress={() => openEmail(employee.email)}
            style={({ pressed }) => [
              [styles.primaryButton, { backgroundColor: colors.textPrimary }],
              pressed && styles.buttonPressed,
            ]}
          >
            <Text
              style={[styles.primaryButtonText, { color: colors.primaryText }]}
            >
              Email
            </Text>
          </Pressable>

          <Pressable
            onPress={() => openPhone(employee.phone)}
            style={({ pressed }) => [
              [styles.secondaryButton, { backgroundColor: colors.border }],
              pressed && styles.buttonPressed,
            ]}
          >
            <Text
              style={[
                styles.secondaryButtonText,
                { color: colors.textPrimary },
              ]}
            >
              Call
            </Text>
          </Pressable>
        </View>
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
  buttonPressed: {
    opacity: 0.8,
  },
  headerCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: spacing.xxxxl,
    alignItems: "center",
    marginBottom: spacing.xxl,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xxl,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "700",
  },
  name: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  role: {
    fontSize: 17,
    marginBottom: spacing.xs,
  },
  meta: {
    fontSize: 15,
  },
  favoriteButton: {
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: 10,
  },
  favoriteButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  infoCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: spacing.xxxl,
    marginBottom: spacing.xxxl,
  },
  infoRow: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: spacing.xxs,
    textTransform: "uppercase",
  },
  value: {
    fontSize: 16,
  },
  actionsRow: {
    flexDirection: "row",
    gap: spacing.lg,
  },
  primaryButton: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
