import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type LoginScreenProps = {
  onLogin: () => void;
};

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Staff Directory</Text>
          <Text style={styles.subtitle}>
            Sign in to access employee contacts and departments.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="name@company.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
            />
          </View>

          <Pressable
            onPress={onLogin}
            disabled={!isFormValid}
            style={({ pressed }) => [
              styles.button,
              !isFormValid && styles.buttonDisabled,
              pressed && isFormValid && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>

          <Text style={styles.helperText}>
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
    backgroundColor: colors.background,
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
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textMuted,
  },
  form: {
    backgroundColor: colors.primaryText,
    borderRadius: 16,
    padding: spacing.xxxl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputGroup: {
    marginBottom: spacing.xxxl,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: colors.borderInput,
    borderRadius: 12,
    paddingHorizontal: spacing.xl,
    fontSize: 16,
    backgroundColor: colors.primaryText,
    color: colors.textPrimary,
  },
  button: {
    marginTop: spacing.sm,
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.textPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: colors.buttonDisabled,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: colors.primaryText,
    fontSize: 16,
    fontWeight: "600",
  },
  helperText: {
    marginTop: spacing.xl,
    fontSize: 13,
    color: colors.textMuted,
    textAlign: "center",
  },
});
