import React from "react";
import { View, StyleSheet, Text } from "react-native";

import Question from "../components/Question";

const SurveyScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> SurveyScreen! </Text>
      <Question />
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
