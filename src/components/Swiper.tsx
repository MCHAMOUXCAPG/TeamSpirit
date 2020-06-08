import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Swiper from "react-native-swiper";
import Question from "./Question";
import Colors from "../config/colors";

var styles = StyleSheet.create({
  wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.white,
    fontSize: 30,
    fontWeight: "bold",
  },
  buttonRight: {
    color: Colors.white,
    backgroundColor: Colors.primary,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  buttonLeft: {
    color: Colors.white,
    backgroundColor: Colors.primary,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    width: 30,
    height: 30,
    borderRadius: 20,
  },
});

export default (props) => (
  <Swiper
    style={{ ...styles.wrapper, ...props.style }}
    showsButtons
    loop={false}
    dot={
      <View
        style={{
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
        }}
      />
    }
    activeDot={
      <View
        style={{
          backgroundColor: Colors.transparent,
          width: 15,
          height: 15,
          borderRadius: 15,
          borderWidth: 2,
          borderColor: Colors.green,
          marginLeft: 3,
          marginRight: 3,
          marginTop: 3,
          marginBottom: 3,
        }}
      />
    }
    dotColor={Colors.green}
    nextButton={<Text style={styles.buttonRight}>></Text>}
    prevButton={<Text style={styles.buttonLeft}> {"<"} </Text>}
    buttonWrapperStyle={{
      backgroundColor: Colors.transparent,
      flexDirection: "row",
      position: "absolute",
      top: 210,
      left: 0,
      flex: 1,
      paddingHorizontal: 80,
      paddingVertical: 10,
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <View testID="Hello" style={styles.slide}>
     <Question />
    </View>
    <View testID="Beautiful" style={styles.slide}>
     <Question />
    </View>
    <View testID="Simple" style={styles.slide}>
   <Question />
    </View>
    <View testID="Simple" style={styles.slide}>
    <Question />
    </View>
    <View testID="Simple" style={styles.slide}>
      <Question />
    </View>
    <View testID="Simple" style={styles.slide}>
     <Question />
    </View>
  </Swiper>
);
