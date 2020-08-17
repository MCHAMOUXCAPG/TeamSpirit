import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import Question from "./Question";
import Colors from "../config/colors";
import questions from "../models/questions";
import { AntDesign } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

// Swiper shows the Question component in each slide.
const SwiperComponent = (props: any) => {
  return (
    <View style={styles.container}>
      <Swiper
        style={{ ...props.style }}
        showsButtons
        loop={false}
        dot={
          <View
            style={{
              backgroundColor: Colors.transparent,
              borderColor: Colors.transparent,
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: Colors.transparent,
              borderColor: Colors.transparent,
            }}
          />
        }
        nextButton={
          <AntDesign name="rightcircle" style={styles.buttonRight} size={46} />
        }
        prevButton={
          <AntDesign name="leftcircle" style={styles.buttonLeft} size={46} />
        }
        buttonWrapperStyle={{
          backgroundColor: Colors.transparent,
          flexDirection: "row",
          position: "absolute",
          top: hp("40%"),
          width: wp("90%"),
          height: hp("40%"),
          left: wp("5"),
          flex: 1,
          paddingHorizontal: wp("6%"),
          paddingBottom: 30,
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
    </View>
  );
};

var styles = StyleSheet.create({
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
    backgroundColor: Colors.transparent,
    height: 60,
    paddingTop: 7,
    paddingLeft: 7,
    width: 60,
    color: Colors.primary,
  },
  buttonLeft: {
    backgroundColor: Colors.transparent,
    height: 60,
    paddingTop: 7,
    paddingLeft: 7,
    width: 60,
    color: Colors.primary,
  },
  container: {
    flex: 1,
    top: 18,
  },
});

export default SwiperComponent;
