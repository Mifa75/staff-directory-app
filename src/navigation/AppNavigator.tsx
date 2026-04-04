import { NavigationContainer, type RouteProp } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { useState } from "react";

import { type Employee } from "../data/employees";
import EmployeeDetailScreen from "../screens/EmployeeDetailScreen";
import LoginScreen from "../screens/LoginScreen";
import { useThemeStore } from "../store/useThemeStore";
import { getColors } from "../theme/colors";
import MainTabs from "./MainTabs";

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  EmployeeDetail: { employee: Employee };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type MainTabsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MainTabs"
>;

type EmployeeDetailRouteProp = RouteProp<RootStackParamList, "EmployeeDetail">;

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = useThemeStore((state) => state.theme);
  const colors = getColors(theme);

  return (
    <NavigationContainer>
      <Stack.Navigator
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
          headerBackTitle: "Back",
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        {!isLoggedIn ? (
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {() => <LoginScreen onLogin={() => setIsLoggedIn(true)} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="MainTabs"
              options={{
                headerShown: false,
              }}
            >
              {({ navigation }: { navigation: MainTabsNavigationProp }) => (
                <MainTabs
                  onLogout={() => setIsLoggedIn(false)}
                  onSelectEmployee={(employee) =>
                    navigation.navigate("EmployeeDetail", { employee })
                  }
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="EmployeeDetail"
              options={{
                title: "Employee Details",
                headerBackTitle: "Back",
              }}
            >
              {({ route }: { route: EmployeeDetailRouteProp }) => (
                <EmployeeDetailScreen employee={route.params.employee} />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
