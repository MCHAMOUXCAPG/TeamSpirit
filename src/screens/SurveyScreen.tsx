import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import colors from "../config/colors";
import SwiperComponent from "../components/Swiper";
import SwiperCircle from "../components/SwiperCircle";
import { IQuestionStatus } from "../models/interfaces";

const SurveyScreen = ({ navigation }: { navigation: any }) => {
  const handleSurveyCompletion = () => navigation.navigate("SuccessScreen");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [questionsState, setQuestionsState] = useState<IQuestionStatus[]>([
    { valid: false, answer: 0, status: "active", touched: false },
    { valid: false, answer: 0, status: "", touched: false },
    { valid: true, answer: 5, status: "", touched: false },
    { valid: true, answer: 5, status: "", touched: false },
    { valid: false, answer: 0, status: "", touched: false },
    { valid: false, answer: 0, status: "", touched: false },
  ]);
  const [activeIcon, setActiveIcon] = useState([
    [false, false, false, false, false],
    [false, false, false, false, false],
    [],
    [],
    [],
    [false, false],
  ]);

  useEffect(() => {
    let count = 0;
    const currentQuestionStatus = questionsState;
    currentQuestionStatus.map((question: IQuestionStatus) => {
      question.status = "";
      if (question.valid) {
        count++;
      }
    });
    currentQuestionStatus[currentQuestion].status = "active";
    currentQuestionStatus[currentQuestion].touched = true;
    setQuestionsState(currentQuestionStatus);
    if (count === questionsState.length) {
      setDisabled(false);
    }

    console.log(questionsState);
  });

  return (
    <ImageBackground
      source={require("../assets/surveyBackfround.png")}
      style={styles.container}
    >
      <Text style={styles.project}>Project's Name</Text>
      <View style={styles.swiper}>
        <SwiperComponent
          activeIcon={activeIcon}
          setActiveIcon={setActiveIcon}
          setCurrentQuestion={setCurrentQuestion}
          setQuestionsState={setQuestionsState}
          questionsState={questionsState}
        />
        <View style={styles.circle}>
          <SwiperCircle state={questionsState} />
        </View>
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
  circle: {
    alignItems: "center",
    justifyContent: "center",
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
