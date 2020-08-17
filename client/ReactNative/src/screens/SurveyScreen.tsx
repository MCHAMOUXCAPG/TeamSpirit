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

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import colors from "../config/colors";
import SwiperComponent from "../components/Swiper";
import SwiperCircle from "../components/SwiperCircle";
import { IQuestionStatus, IQuestionResponse } from "../models/interfaces";
import { SurveyService } from "../services/Services";
import QuestionsContext from "../context/questionsContext";

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
  const { surveyCode, projectName, userId } = route.params;
  const surveyService: SurveyService = new SurveyService();
  const [loading, setLoading] = useState(false);

  // Function that sends the notes to the database.
  async function sendSurvey(surveyCode: string, body: IQuestionResponse[]) {
    await surveyService
      .sendSurvey(surveyCode, body)
      .then((res) => {
        if ((res.status = 200)) {
          navigation.navigate("FinalScreen", {
            message: "Thank you for submitting your answers!",
          });
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

  // Function that asks for your confirmation to leave when pressing the back buttton on the mobile device.
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
    sendSurvey(surveyCode.code, questionsResponse);
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

  var Hashes = require("jshashes");
  var SHA256 = new Hashes.SHA256();

  const uniqueUserId: any = userId;

  const [questionsResponse, setQuestionsResponse] = useState<
    IQuestionResponse[]
  >([
    {
      number: 1,
      note: 0,
      surveyCode: surveyCode.code,
      user: SHA256.hex(uniqueUserId),
    },
    {
      number: 2,
      note: 0,
      surveyCode: surveyCode.code,
      user: SHA256.hex(uniqueUserId),
    },
    {
      number: 3,
      note: 5,
      surveyCode: surveyCode.code,
      user: SHA256.hex(uniqueUserId),
    },
    {
      number: 4,
      note: 5,
      surveyCode: surveyCode.code,
      user: SHA256.hex(uniqueUserId),
    },
    {
      number: 5,
      note: 0,
      surveyCode: surveyCode.code,
      user: SHA256.hex(uniqueUserId),
    },
    {
      number: 6,
      note: 0,
      surveyCode: surveyCode.code,
      user: SHA256.hex(uniqueUserId),
    },
  ]);

  const [activeIcon, setActiveIcon] = useState([
    [false, false, false, false, false],
    [false, false, false, false, false],
    [],
    [],
    [],
    [false, false],
  ]);

  // Updates the cycle of life of the application.
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
        <View style={styles.projectView}>
          <Text style={styles.project}>{projectName}</Text>
        </View>
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
    color: colors.primary,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
  },
  projectView: {
    position: "relative",
    top: -64,
    marginLeft: wp("-50%"),
    width: wp("40%"),
    paddingLeft: 0,
  },
  swiper: {
    flex: 0.7,
    bottom: "14%",
  },
  circle: {
    alignItems: "center",
    justifyContent: "center",
    top: hp("0%"),
    left: wp("30%"),
    width: wp("40%"),
    backgroundColor: colors.transparent,
  },
  btn: {
    backgroundColor: colors.primary,
    width: wp("40%"),
    alignItems: "center",
    justifyContent: "center",
    height: hp("7%"),
    borderRadius: 30,
  },
  btnDisabled: {
    backgroundColor: colors.disabled,
    width: wp("40%"),
    alignItems: "center",
    justifyContent: "center",
    height: hp("7%"),
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
    width: wp("100%"),
    height: hp("100%"),
    justifyContent: "center",
  },
});

export default SurveyScreen;
