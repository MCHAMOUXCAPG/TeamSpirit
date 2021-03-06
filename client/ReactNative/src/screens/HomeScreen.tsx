import React, { useState, useEffect } from "react";
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
import Constants from "expo-constants";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  const codeValidationService: CodeValidationService = new CodeValidationService();
  const uniqueUserId: any = Constants.deviceId;

  // Function that resets input when there has been an error with the code.
  const resetInputHandler = () => {
    setLoading(false);
    setInputText("");
  };

  // Function that sends the code to the database in order to see if it exists.
  async function sendCode(inputText: IValidationCode) {
    await codeValidationService
      .sendCode(inputText)
      .then((res) => {
        if (res.status == 200) {
          navigation.navigate("SurveyScreen", {
            surveyCode: inputText,
            projectName: res.data.TeamName,
            userId: uniqueUserId,
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
            err.response.data.Message,
            [{ text: "Ok", style: "cancel" }],
            { cancelable: false }
          );
        }
      });
  }

  var Hashes = require("jshashes");
  var SHA256 = new Hashes.SHA256();

  // Function that sends the user hashed to the databse when the code is correctly inserted.
  const submitHandler = () => {
    setLoading(true);
    closeKeyboard();
    sendCode({ code: inputText, user: SHA256.hex(uniqueUserId) });
  };

  const openKeyboard = () => {
    setKeyboard(true);
  };

  const closeKeyboard = () => {
    Keyboard.dismiss();
    setKeyboard(false);
  };

  // Function that closes the keyboard when the user presses the back button on the mobile device.
  useEffect(() => {
    const handleBackButtonClick = () => {
      closeKeyboard();
      return true;
    };
    const keyboardHandler = Keyboard.addListener(
      "keyboardDidHide",
      handleBackButtonClick
    );
    return () => keyboardHandler.remove();
  }, []);

  return (
    <KeyboardAvoidingView
      style={keyboard ? styles.container : styles.imgBackground}
    >
      <TouchableWithoutFeedback onPress={closeKeyboard}>
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
            <Text style={keyboard ? styles.title2 : styles.title}>
              Welcome to Team Spirit Survey!
            </Text>
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
              onFocus={openKeyboard}
              onChangeText={(inputText) => setInputText(inputText)}
              value={inputText}
              autoCapitalize="characters"
            />
            <TouchableOpacity onPress={submitHandler} style={styles.submit}>
              <Text style={styles.insideButton}>Start</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
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
  title2: {
    position: "absolute",
    width: "90%",
    top: "50%",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 22,
    lineHeight: 23,
    textAlign: "center",
    color: colors.white,
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
    width: wp("45%"),
    height: hp("9%"),
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
    fontSize: hp("3%"),
    paddingBottom: hp("1.6%"),
    paddingTop: hp("2.2%"),
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
