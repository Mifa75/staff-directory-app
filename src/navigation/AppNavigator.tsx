import { NavigationContainer, type RouteProp } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { useState } from "react";

import { type Employee } from "../data/employees";
import EmployeeDetailScreen from "../screens/EmployeeDetailScreen";
import LoginScreen from "../screens/LoginScreen";
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

type EmployeeDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EmployeeDetail"
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
              options={{ headerTitle: "Employee Details" }}
            >
              {({
                route,
                navigation,
              }: {
                route: EmployeeDetailRouteProp;
                navigation: EmployeeDetailScreenNavigationProp;
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
