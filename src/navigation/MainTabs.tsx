import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { Employee } from "../data/employees";
import DirectoryScreen from "../screens/DirectoryScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import RecentsScreen from "../screens/RecentsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { useThemeStore } from "../store/useThemeStore";
import { getColors } from "../theme/colors";

export type MainTabParamList = {
  DirectoryTab: undefined;
  FavoritesTab: undefined;
  RecentsTab: undefined;
  SettingsTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

type MainTabsProps = {
  onLogout: () => void;
  onSelectEmployee: (employee: Employee) => void;
};

export default function MainTabs({
  onLogout,
  onSelectEmployee,
}: MainTabsProps) {
  const theme = useThemeStore((state) => state.theme);
  const colors = getColors(theme);

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerShadowVisible: false,
        headerTitleStyle: {
          color: colors.textPrimary,
          fontWeight: "700",
        },
        headerTintColor: colors.textPrimary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.textPrimary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="DirectoryTab"
        options={{
          title: "Directory",
          tabBarLabel: "Directory",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      >
        {() => (
          <DirectoryScreen
            onLogout={onLogout}
            onSelectEmployee={onSelectEmployee}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="FavoritesTab"
        options={{
          title: "Favorites",
          tabBarLabel: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star-outline" size={size} color={color} />
          ),
        }}
      >
        {() => <FavoritesScreen onSelectEmployee={onSelectEmployee} />}
      </Tab.Screen>

      <Tab.Screen
        name="RecentsTab"
        options={{
          title: "Recents",
          tabBarLabel: "Recents",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      >
        {() => <RecentsScreen onSelectEmployee={onSelectEmployee} />}
      </Tab.Screen>

      <Tab.Screen
        name="SettingsTab"
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      >
        {() => <SettingsScreen onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
