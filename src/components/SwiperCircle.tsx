import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../config/colors";

const SwiperCircle = () => {
  return (
    <View style={styles.container}>
      <View style={styles.redCircle} />
      <View style={styles.activeCircle} />
      <View style={styles.inactiveCircle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  activeCircle: {
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
