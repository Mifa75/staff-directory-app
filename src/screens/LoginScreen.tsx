import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStore } from "../store/useThemeStore";
import { getColors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type LoginScreenProps = {
  onLogin: () => void;
};

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const theme = useThemeStore((state) => state.theme);
  const colors = getColors(theme);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            Staff Directory
          </Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            Sign in to access employee contacts and departments.
          </Text>
        </View>

        <View
          style={[
            styles.form,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="name@company.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={[
                styles.input,
                {
                  borderColor: colors.borderInput,
                  backgroundColor: colors.surface,
                  color: colors.textPrimary,
                },
              ]}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              Password
            </Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              style={[
                styles.input,
                {
                  borderColor: colors.borderInput,
                  backgroundColor: colors.surface,
                  color: colors.textPrimary,
                },
              ]}
            />
          </View>

          <Pressable
            onPress={onLogin}
            disabled={!isFormValid}
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: colors.textPrimary },
              !isFormValid && { backgroundColor: colors.buttonDisabled },
              pressed && isFormValid && styles.buttonPressed,
            ]}
          >
            <Text style={[styles.buttonText, { color: colors.primaryText }]}>
              Sign In
            </Text>
          </Pressable>

          <Text style={[styles.helperText, { color: colors.textMuted }]}>
            Demo version: enter any email and password.
          </Text>
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
    paddingHorizontal: spacing.xxxxl,
    paddingVertical: spacing.huge,
    justifyContent: "center",
  },
  header: {
    marginBottom: spacing.huge,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: spacing.lg,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  form: {
    borderRadius: 16,
    padding: spacing.xxxl,
    borderWidth: 1,
  },
  inputGroup: {
    marginBottom: spacing.xxxl,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: spacing.sm,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: spacing.xl,
    fontSize: 16,
  },
  button: {
    marginTop: spacing.sm,
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  helperText: {
    marginTop: spacing.xl,
    fontSize: 13,
    textAlign: "center",
  },
});
