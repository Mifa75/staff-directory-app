import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { Employee } from "../data/employees";
import DirectoryScreen from "../screens/DirectoryScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import RecentsScreen from "../screens/RecentsScreen";

export type MainTabParamList = {
  DirectoryTab: undefined;
  FavoritesTab: undefined;
  RecentsTab: undefined;
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
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleStyle: {
          color: "#0f172a",
          fontWeight: "700",
        },
        tabBarActiveTintColor: "#0f172a",
        tabBarInactiveTintColor: "#64748b",
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
    </Tab.Navigator>
  );
}
