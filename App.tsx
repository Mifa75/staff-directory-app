import { useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { type Employee } from "./src/data/employees";
import DirectoryScreen from "./src/screens/DirectoryScreen";
import EmployeeDetailScreen from "./src/screens/EmployeeDetailScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import LoginScreen from "./src/screens/LoginScreen";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [isViewingFavorites, setIsViewingFavorites] = useState(false);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      {!isLoggedIn ? (
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
      ) : selectedEmployee ? (
        <EmployeeDetailScreen
          employee={selectedEmployee}
          onBack={() => setSelectedEmployee(null)}
        />
      ) : isViewingFavorites ? (
        <FavoritesScreen
          onBack={() => setIsViewingFavorites(false)}
          onSelectEmployee={(employee) => {
            setSelectedEmployee(employee);
            setIsViewingFavorites(false);
          }}
        />
      ) : (
        <DirectoryScreen
          onLogout={() => {
            setIsLoggedIn(false);
            setSelectedEmployee(null);
            setIsViewingFavorites(false);
          }}
          onSelectEmployee={setSelectedEmployee}
          onOpenFavorites={() => setIsViewingFavorites(true)}
        />
      )}
    </SafeAreaProvider>
  );
}
