import { NavigationContainer, type RouteProp } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, Text } from "react-native";

import { type Employee } from "../data/employees";
import DirectoryScreen from "../screens/DirectoryScreen";
import EmployeeDetailScreen from "../screens/EmployeeDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import LoginScreen from "../screens/LoginScreen";

export type RootStackParamList = {
  Login: undefined;
  Directory: undefined;
  Favorites: undefined;
  EmployeeDetail: { employee: Employee };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type DirectoryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Directory"
>;

type FavoritesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Favorites"
>;

type EmployeeDetailRouteProp = RouteProp<RootStackParamList, "EmployeeDetail">;

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {() => <LoginScreen onLogin={() => setIsLoggedIn(true)} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="Directory"
              options={{
                headerTitle: "Directory",
                headerRight: () => (
                  <Pressable onPress={() => setIsLoggedIn(false)}>
                    <Text style={{ color: "#0F172A", fontWeight: "600" }}>
                      Log out
                    </Text>
                  </Pressable>
                ),
              }}
            >
              {({
                navigation,
              }: {
                navigation: DirectoryScreenNavigationProp;
              }) => (
                <DirectoryScreen
                  onLogout={() => setIsLoggedIn(false)}
                  onOpenFavorites={() => navigation.navigate("Favorites")}
                  onSelectEmployee={(employee) =>
                    navigation.navigate("EmployeeDetail", { employee })
                  }
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="Favorites"
              options={{ headerTitle: "Favorites" }}
            >
              {({
                navigation,
              }: {
                navigation: FavoritesScreenNavigationProp;
              }) => (
                <FavoritesScreen
                  onBack={() => navigation.goBack()}
                  onSelectEmployee={(employee) =>
                    navigation.navigate("EmployeeDetail", { employee })
                  }
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="EmployeeDetail"
              options={{ headerTitle: "Employee Details" }}
            >
              {({
                route,
                navigation,
              }: {
                route: EmployeeDetailRouteProp;
                navigation: DirectoryScreenNavigationProp;
              }) => (
                <EmployeeDetailScreen
                  employee={route.params.employee}
                  onBack={() => navigation.goBack()}
                />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
