import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

import colors from "../config/colors";
import { CodeValidationService } from "../services/Services";
import { IValidationCode } from "../models/interfaces";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const codeValidationService: CodeValidationService = new CodeValidationService();

  const resetInputHandler = () => {
    setLoading(false);
    setInputText("");
  };

  async function sendCode(inputText: IValidationCode) {
    await codeValidationService
      .sendCode(inputText)
      .then((res) => {
        if (res.status == 200) {
          navigation.navigate("SurveyScreen", {
            surveyCode: inputText,
            projectName: res.data.TeamName,
          });
        }
      })
      .catch((err) => {
        resetInputHandler();
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

  const submitHandler = () => {
    setLoading(true);
    Keyboard.dismiss();
    sendCode({ code: inputText });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ImageBackground
            source={require("../assets/homeBackground.png")}
            style={styles.imgBackground}
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
            <View style={styles.contentAbove}>
              <Text style={styles.title}>Welcome to Team Spirit Survey!</Text>
            </View>
            <View style={styles.contentBelow}>
              <Text style={styles.textSentence1}>
                Please, answer the following 6 questions. It will take you a
                couple of minutes.
              </Text>
              <Text style={styles.textSentence2}>
                But first, write the code of your team:
              </Text>
              <TextInput
                style={styles.input}
                placeholder="My project is..."
                onChangeText={(inputText) => setInputText(inputText)}
                value={inputText}
                maxLength={10}
              />

              <TouchableOpacity onPress={submitHandler} style={styles.submit}>
                <Text style={styles.insideButton}>Start</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentAbove: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentBelow: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  title: {
    position: "absolute",
    width: "90%",
    top: "50%",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 22,
    lineHeight: 23,
    textAlign: "center",
    color: colors.primary,
  },
  textSentence1: {
    width: "90%",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 16,
    textAlign: "center",
    color: colors.white,
    marginBottom: 30,
  },
  textSentence2: {
    width: "90%",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 16,
    textAlign: "center",
    color: colors.white,
  },
  input: {
    width: "45%",
    height: 30,
    backgroundColor: colors.white,
    borderRadius: 20,
    marginBottom: 30,
    marginTop: 30,
    paddingLeft: 10,
  },
  submit: {
    width: "45%",
    height: 70,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 50,
  },
  imgBackground: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
  },
  insideButton: {
    textAlign: "center",
    fontSize: 24,
    lineHeight: 65,
    color: colors.white,
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

export default HomeScreen;
