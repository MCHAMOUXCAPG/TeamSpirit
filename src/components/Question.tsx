import React from "react";
import { View, Text, StyleSheet } from "react-native";

import colors from "../config/colors";

const Question = (props) => {
  return (
    <View style={{ ...Styles.container, ...props.style }}>
      <Text style={Styles.number}> Question {props.questionNum} </Text>
      <Text style={Styles.question}> {props.text} </Text>
      <View style={Styles.emojis}>{props.emojis}</View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: colors.primary,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: colors.white,
    margin: 15,
    height: 360,
    width: "90%",
    elevation: 3,
    paddingTop: 50,
    paddingBottom: 50,
    paddingHorizontal: 10,
  },
  number: {
    fontWeight: "100",
    fontSize: 18,
  },
  question: {
    fontSize: 24,
    textAlign: "center",
  },
  emojis: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default Question;
