import React from "react";
import { View, StyleSheet, Text } from "react-native";

const SurveyScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Survey!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
  },
});

export default SurveyScreen;
