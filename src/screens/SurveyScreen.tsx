import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  Alert,
  ActivityIndicator,
} from "react-native";

import colors from "../config/colors";
import SwiperComponent from "../components/Swiper";
import SwiperCircle from "../components/SwiperCircle";
import { IQuestionStatus, IQuestionResponse } from "../models/interfaces";
import { SurveyService } from "../services/Services";
import QuestionsContext from "../context/questionsContext";
import DeviceInfo from "react-native-device-info";

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
  const { surveyCode, projectName } = route.params;
  const surveyService: SurveyService = new SurveyService();
  const [loading, setLoading] = useState(false);
  async function sendSurvey(surveyCode: string, body: IQuestionResponse[]) {
    await surveyService
      .sendSurvey(surveyCode, body)
      .then((res) => {
        if ((res.status = 200)) {
          navigation.navigate("SuccessScreen");
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err.request.status == 0) {
          Alert.alert(
            "Network Error!",
            "Please verify you have internet access.",
            [{ text: "Ok", style: "cancel" }],
            { cancelable: false }
          );
        } else {
          Alert.alert(
            "Oops!",
            err.response.data.message,
            [{ text: "Ok", style: "cancel" }],
            { cancelable: false }
          );
        }
      });
  }
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Exit App",
        "Do you want to exit?",
        [
          {
            text: "No",
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
    setLoading(true);
    sendSurvey(surveyCode, questionsResponse);
  };
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [questionsState, setQuestionsState] = useState<IQuestionStatus[]>([
    { valid: false, status: "active", touched: true },
    { valid: false, status: "", touched: false },
    { valid: true, status: "", touched: false },
    { valid: true, status: "", touched: false },
    { valid: false, status: "", touched: false },
    { valid: false, status: "", touched: false },
  ]);

  const [uniqueUserId, setUniqueUserId] = useState("");
  useEffect(() => {
    let uniqueId: any = undefined;
    if (localStorage.getItem("uniqueIdTS")) {
      uniqueId = localStorage.getItem("uniqueIdTS");
    } else {
      uniqueId = DeviceInfo.getUniqueId();
      localStorage.setItem("uniqueIdTS", uniqueId);
    }
    setUniqueUserId(uniqueId);
    // get the uniqueId, if not exists, create a new one
  }, []);

  const [questionsResponse, setQuestionsResponse] = useState<
    IQuestionResponse[]
  >([
    { number: 1, note: 0, surveyCode: surveyCode, user: uniqueUserId },
    { number: 2, note: 0, surveyCode: surveyCode, user: uniqueUserId },
    { number: 3, note: 5, surveyCode: surveyCode, user: uniqueUserId },
    { number: 4, note: 5, surveyCode: surveyCode, user: uniqueUserId },
    { number: 5, note: 0, surveyCode: surveyCode, user: uniqueUserId },
    { number: 6, note: 0, surveyCode: surveyCode, user: uniqueUserId },
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
    const response = questionsResponse;
    setQuestionsResponse(response);
    if (count === questionsState.length) {
      setDisabled(false);
      forceUpdate();
    }
    forceUpdate();
  }, [questionsState, activeIcon, currentQuestion]);

  return (
    <QuestionsContext.Provider
      value={{
        questionsResponse: questionsResponse,
        setQuestionsResponse: setQuestionsResponse,
        disabled: disabled,
        setDisabled: setDisabled,
      }}
    >
      <ImageBackground
        source={require("../assets/surveyBackfround.png")}
        style={styles.container}
      >
        {loading ? (
          <View style={styles.activityIndicatorBackground}>
            <ActivityIndicator
              size="large"
              color={colors.primary}
              style={styles.activityIndicator}
            />
          </View>
        ) : null}
        <Text style={styles.project}>{projectName}</Text>
        <View style={styles.swiper}>
          <SwiperComponent
            activeIcon={activeIcon}
            setActiveIcon={setActiveIcon}
            setCurrentQuestion={setCurrentQuestion}
            setQuestionsState={setQuestionsState}
            questionsState={questionsState}
            useForceUpdate={useForceUpdate}
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
    </QuestionsContext.Provider>
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
    right: "37%",
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
    bottom: "7%",
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
  activityIndicator: {
    margin: "auto",
  },
  activityIndicatorBackground: {
    zIndex: 150,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});

export default SurveyScreen;
