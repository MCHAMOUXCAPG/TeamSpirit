import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import colors from "../config/colors";
import Swiper from "../components/Swiper";

const SurveyScreen = ({ navigation }: { navigation: any }) => {
  const handleSurveyCompletion = () => navigation.navigate("SuccessScreen");
  const [disabled, setDisabled] = useState(false);

  return (
    <ImageBackground
      source={require("../assets/surveyBackfround.png")}
      style={styles.container}
    >
      <Text style={styles.project}>Project's Name</Text>
      <View style={styles.swiper}>
        <Swiper />
      </View>
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
    right: "27%",
    bottom: "5%",
    color: colors.primary,
    fontSize: 20,
    fontWeight: "bold",
  },
  swiper: {
    flex: 0.7,
    bottom: "16%",
  },
  btn: {
    backgroundColor: colors.primary,
    width: 160,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderRadius: 30,
  },
  btnDisabled: {
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
