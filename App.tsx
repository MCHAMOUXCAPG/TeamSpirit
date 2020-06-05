import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "./src/config/colors";
import HomeScreen from "./src/screens/HomeScreen";
import SuccessScreen from "./src/screens/SuccessScreen";

export default function App() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
