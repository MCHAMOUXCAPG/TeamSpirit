import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../config/colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

// Each circle can have a different state; activeCircle (filled grey), validCircle (bordered green), invalidCircle (bordered red) & inactiveCircle (bordered grey).
const SwiperCircle = (props: any) => {
  return (
    <View style={styles.container}>
      {props.state.map((question: any, index: any) => {
        if (question.status === "active") {
          return <View style={styles.activeCircle} key={index} />;
        } else if (
          question.status === "" &&
          question.valid === true &&
          question.touched === true
        ) {
          return <View style={styles.validCircle} key={index} />;
        } else if (
          question.status === "" &&
          question.valid === false &&
          question.touched === true
        ) {
          return <View style={styles.invalidCircle} key={index} />;
        } else if (question.status == "" && question.touched === false) {
          return <View style={styles.inactiveCircle} key={index} />;
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: wp("32%"),
    height: hp("3%"),
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
  invalidCircle: {
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
