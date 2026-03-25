import { useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { type Employee } from "./src/data/employees";
import DirectoryScreen from "./src/screens/DirectoryScreen";
import EmployeeDetailScreen from "./src/screens/EmployeeDetailScreen";
import LoginScreen from "./src/screens/LoginScreen";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );

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
      ) : (
        <DirectoryScreen
          onLogout={() => {
            setIsLoggedIn(false);
            setSelectedEmployee(null);
          }}
          onSelectEmployee={setSelectedEmployee}
        />
      )}
    </SafeAreaProvider>
  );
}
