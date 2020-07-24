import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./src/screens/HomeScreen";
import SurveyScreen from "./src/screens/SurveyScreen";
import FinalScreen from "./src/screens/FinalScreen";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SurveyScreen" component={SurveyScreen} />
        <Stack.Screen name="FinalScreen" component={FinalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
