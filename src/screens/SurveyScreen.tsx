import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";

import colors from "../config/colors";
import SwiperComponent from "../components/Swiper";
import SwiperCircle from "../components/SwiperCircle";
import { IQuestionStatus, IQuestionResponse } from "../models/interfaces";

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
}

const SurveyScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const forceUpdate = useForceUpdate();
  const { surveyCode } = route.params;
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Exit App",
        "Do you want to exit?",
        [
          {
            text: "No",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "Yes", onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false }
      );
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);
  const handleSurveyCompletion = () => {
    console.log(questionsResponse);
    navigation.navigate("SuccessScreen");
  };
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [questionsState, setQuestionsState] = useState<IQuestionStatus[]>([
    { valid: false, answer: 0, status: "active", touched: true },
    { valid: false, answer: 0, status: "", touched: false },
    { valid: true, answer: 5, status: "", touched: false },
    { valid: true, answer: 5, status: "", touched: false },
    { valid: false, answer: 0, status: "", touched: false },
    { valid: false, answer: 0, status: "", touched: false },
  ]);

  const [questionsResponse, setQuestionsResponse] = useState<
    IQuestionResponse[]
  >([
    { number: 1, note: 0, surveyCode: surveyCode },
    { number: 2, note: 0, surveyCode: surveyCode },
    { number: 3, note: 5, surveyCode: surveyCode },
    { number: 4, note: 5, surveyCode: surveyCode },
    { number: 5, note: 0, surveyCode: surveyCode },
    { number: 6, note: 0, surveyCode: surveyCode },
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
    currentQuestionStatus[currentQuestion].answer =
      currentQuestionStatus[currentQuestion].answer;
    setQuestionsState(currentQuestionStatus);
    const response = questionsResponse;
    console.log(currentQuestionStatus[currentQuestion].answer);
    response[currentQuestion].note =
      currentQuestionStatus[currentQuestion].answer;
    setQuestionsResponse(response);
    if (count === questionsState.length) {
      setDisabled(false);
      forceUpdate();
    }
    console.log(questionsResponse);
    forceUpdate();
  }, [questionsState, activeIcon, currentQuestion]);

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
