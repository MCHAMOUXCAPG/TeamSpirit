import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../config/colors";

const SwiperCircle = (props: any) => {
  const [questionsState, setQuestionsState] = useState([
    { valid: false, answer: 0, status: "active", touched: false },
    { valid: false, answer: 0, status: "" },
    { valid: true, answer: 5, status: "" },
    { valid: true, answer: 5, status: "" },
    { valid: false, answer: 0, status: "" },
    { valid: false, answer: 0, status: "" },
  ]);

  return (
    <View style={styles.container}>
      {props.state.map((question: any) => {
        if (question.status === "active") {
          return <View style={styles.activeCircle} />;
        } else if (question.status === "") {
          return <View style={styles.inactiveCircle} />;
        } else if (question.valid === true) {
          return <View style={styles.validCircle} />;
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  validCircle: {
    backgroundColor: Colors.transparent,
    width: 14,
    height: 14,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.green,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeCircle: {
    backgroundColor: Colors.accent,
    width: 14,
    height: 14,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.accent,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  inactiveCircle: {
    backgroundColor: Colors.transparent,
    width: 14,
    height: 14,
    borderRadius: 14,
    borderColor: "rgba(0,0,0,.2)",
    borderWidth: 2,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  redCircle: {
    backgroundColor: Colors.transparent,
    width: 14,
    height: 14,
    borderRadius: 14,
    borderColor: Colors.red,
    borderWidth: 2,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
});

export default SwiperCircle;
