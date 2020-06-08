import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import colors from "../config/colors";

const HomeScreen = () => {
  const [inputText, setInputText] = useState("");

  const submitHandler = () => {
    if (inputText === "Test") {
      console.log("Navigate to the survey");
    } else {
      Alert.alert("The project does not exist, try again");
    }
  };

  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require("../assets/homeBackground.png")}
        style={styles.imgBackground}
      >
        <View style={styles.contentAbove}>
          <Text style={styles.title}>Welcome to Team Spirit Survey!</Text>
        </View>
        <View style={styles.contentBelow}>
          <Text style={styles.textSentence1}>
            Please, answer the following 6 questions. It will take you a couple
            of minutes.
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
  );
};

const styles = StyleSheet.create({
  screen: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  contentAbove: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  contentBelow: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
    position: "absolute",
    width: "70%",
    top: "1%",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 16,
    textAlign: "center",
    color: colors.white,
  },
  textSentence2: {
    position: "absolute",
    width: "70%",
    top: "18%",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 16,
    textAlign: "center",
    color: colors.white,
  },
  input: {
    position: "absolute",
    width: "45%",
    height: "8%",
    top: "26%",
    backgroundColor: colors.white,
    borderRadius: 20,
  },
  submit: {
    position: "absolute",
    width: "45%",
    top: "47%",
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 50,
    paddingLeft: "20%",
    paddingRight: "20%",
    paddingTop: "10%",
    paddingBottom: "10%",
  },
  imgBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
  },
  insideButton: {
    textAlign: "center",
    fontSize: 24,
    color: colors.white,
  },
});

export default HomeScreen;
