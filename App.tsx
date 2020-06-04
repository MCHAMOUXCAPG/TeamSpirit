import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "./src/config/colors";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.primary }}>
        Welcome to Team Spirit Survey!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
