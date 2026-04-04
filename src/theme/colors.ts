import type { AppThemeMode } from "../store/useThemeStore";

const lightColors = {
  background: "#F8FAFC",
  surface: "#FFFFFF",
  textPrimary: "#0F172A",
  textSecondary: "#334155",
  textMuted: "#64748B",
  border: "#E2E8F0",
  borderInput: "#CBD5E1",
  primary: "#0F172A",
  primaryText: "#FFFFFF",
  secondarySurface: "#E2E8F0",
  secondaryText: "#0F172A",
  subtleSurface: "#F1F5F9",
  accent: "#2563EB",
  warningSurface: "#FEF3C7",
  warningText: "#92400E",
  star: "#F59E0B",
  buttonDisabled: "#94A3B8",
};

const darkColors = {
  background: "#020617",
  surface: "#0F172A",
  textPrimary: "#F8FAFC",
  textSecondary: "#CBD5E1",
  textMuted: "#94A3B8",
  border: "#1E293B",
  borderInput: "#334155",
  primary: "#E2E8F0",
  primaryText: "#0F172A",
  secondarySurface: "#1E293B",
  secondaryText: "#F8FAFC",
  subtleSurface: "#1E293B",
  accent: "#60A5FA",
  warningSurface: "#451A03",
  warningText: "#FCD34D",
  star: "#FBBF24",
  buttonDisabled: "#475569",
};

export function getColors(theme: AppThemeMode) {
  return theme === "dark" ? darkColors : lightColors;
}
