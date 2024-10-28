import "./gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Notes from "./screens/Notes";
import CreateNotes from "./screens/CreateNotes";
import DetailsNotes from "./screens/DetailsNotes";

export default function App() {
  const Stack = createStackNavigator();

  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Notas"
          component={Notes}
          options={{
            title: "Notas",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#F7B5CA" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Crear"
          component={CreateNotes}
          options={{
            title: "Crear Notas",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#F7B5CA" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Detalles"
          component={DetailsNotes}
          options={{
            title: "Detalles de Nota",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#F7B5CA" },
            headerTintColor: "white",
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
