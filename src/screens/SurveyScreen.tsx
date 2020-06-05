import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import colors from "../config/colors";
import Question from "../components/Question";

const SurveyScreen = ({ navigation }) => {
  const handleSurveyCompletion = () => navigation.navigate("SuccessScreen");
  const [disabled, setDisabled] = useState(true);

  return (
    <ImageBackground
      source={require("../assets/surveyBackfround.png")}
      style={styles.container}
    >
      <Text style={styles.project}>Project's Name</Text>
      <Question style={styles.question} />
      <TouchableOpacity
        style={disabled ? styles.btnDisabled : styles.btn}
        activeOpacity={0.5}
        onPress={handleSurveyCompletion}
        disabled={disabled}
      >
        <Text style={styles.btnTitle}>Submit</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  project: {
    flex: 0.1,
    right: "28%",
    bottom: "14%",
    color: colors.primary,
    fontSize: 20,
    fontWeight: "bold",
  },
  question: {
    bottom: "14%",
  },
  btn: {
    top: "8%",
    backgroundColor: colors.primary,
    width: 160,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderRadius: 30,
  },
  btnDisabled: {
    top: "8%",
    backgroundColor: colors.disabled,
    width: 160,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderRadius: 30,
  },
  btnTitle: {
    color: colors.white,
    fontSize: 20,
  },
});

export default SurveyScreen;
