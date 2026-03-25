import { useMemo, useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { EMPLOYEES, type Employee } from "./src/data/employees";
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
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  function toggleFavorite(employeeId: string) {
    setFavoriteIds((currentFavoriteIds) => {
      if (currentFavoriteIds.includes(employeeId)) {
        return currentFavoriteIds.filter((id) => id !== employeeId);
      }

      return [...currentFavoriteIds, employeeId];
    });
  }

  const favoriteEmployees = useMemo(() => {
    return EMPLOYEES.filter((employee) => favoriteIds.includes(employee.id));
  }, [favoriteIds]);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      {!isLoggedIn ? (
        <LoginScreen
          onLogin={() => {
            setIsLoggedIn(true);
          }}
        />
      ) : selectedEmployee ? (
        <EmployeeDetailScreen
          employee={selectedEmployee}
          onBack={() => setSelectedEmployee(null)}
          isFavorite={favoriteIds.includes(selectedEmployee.id)}
          onToggleFavorite={() => toggleFavorite(selectedEmployee.id)}
        />
      ) : isViewingFavorites ? (
        <FavoritesScreen
          favoriteEmployees={favoriteEmployees}
          onBack={() => setIsViewingFavorites(false)}
          onSelectEmployee={(employee) => {
            setSelectedEmployee(employee);
            setIsViewingFavorites(false);
          }}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
        />
      ) : (
        <DirectoryScreen
          onLogout={() => {
            setIsLoggedIn(false);
            setSelectedEmployee(null);
            setIsViewingFavorites(false);
          }}
          onSelectEmployee={setSelectedEmployee}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
          onOpenFavorites={() => setIsViewingFavorites(true)}
        />
      )}
    </SafeAreaProvider>
  );
}
