import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../config/colors";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [inputText, setInputText] = useState("");

  const resetInputHandler = () => {
    setInputText("");
  };

  const submitHandler = () => {
    if (inputText === "Test") {
      navigation.navigate("SurveyScreen", { surveyCode: inputText });
      Keyboard.dismiss();
      resetInputHandler();
    } else {
      Alert.alert("", "The project does not exist, try again!", [
        {
          text: "Ok!",
          style: "destructive",
          onPress: resetInputHandler,
        },
      ]);
      Keyboard.dismiss();
      return;
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ImageBackground
            source={require("../assets/homeBackground.png")}
            style={styles.imgBackground}
          >
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
});

export default HomeScreen;
