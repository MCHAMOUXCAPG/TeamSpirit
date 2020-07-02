import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import Question from "./Question";
import Colors from "../config/colors";
import questions from "../models/questions";
import { AntDesign } from "@expo/vector-icons";

const SwiperComponent = (props: any) => {
  return (
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
            borderColor: Colors.transparent,
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
            borderColor: Colors.transparent,
            marginLeft: 3,
            marginRight: 3,
            marginTop: 3,
            marginBottom: 3,
          }}
        />
      }
      dotColor={Colors.green}
      nextButton={
        <AntDesign name="rightcircle" style={styles.buttonRight} size={60} />
      }
      prevButton={
        <AntDesign name="leftcircle" style={styles.buttonLeft} size={60} />
      }
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
      onIndexChanged={(index) => {
        props.setCurrentQuestion(index);
      }}
    >
      {questions.map((question) => {
        return (
          <View
            testID={question.number.toString()}
            style={styles.slide}
            key={question.number}
          >
            <Question
              activeIcon={props.activeIcon}
              setActiveIcon={props.setActiveIcon}
              setQuestionsState={props.setQuestionsState}
              questionsState={props.questionsState}
              number={question.number}
              question={question.question}
              type={question.type}
              images={question.images}
              useForceUpdate={props.useForceUpdate}
            />
          </View>
        );
      })}
    </Swiper>
  );
};

var styles = StyleSheet.create({
  wrapper: {},
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
    top: 10,
    left: 30,
    color: Colors.primary,
  },
  buttonLeft: {
    top: 10,
    right: 30,
    color: Colors.primary,
  },
});

export default SwiperComponent;
