import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import colors from "../config/colors";

const SucessScreen = () => {
  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require("../assets/homeBackground.png")}
        style={styles.imgBackground}
      >
        <Text style={styles.message}>
          Thank you for submitting your answers!
        </Text>
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
  imgBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    flex: 1,
    position: "absolute",
    width: "80%",
    top: "50%",
    fontFamily: "Roboto",
    fontStyle: "normal",
    textAlign: "center",
    fontSize: 25,
    color: colors.white,
  },
});

export default SucessScreen;
