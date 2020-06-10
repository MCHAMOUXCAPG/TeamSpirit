import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Slider } from "react-native-elements";
import { AirbnbRating } from "react-native-ratings";

import { questionType, IQuestionStatus } from "../models/interfaces";
import colors from "../config/colors";

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
}

const Question = ({
  number,
  question,
  type,
  images,
  setQuestionsState,
  questionsState,
  activeIcon,
  setActiveIcon,
}: {
  number: number;
  question: string;
  type: questionType;
  images: any[];
  setQuestionsState: any;
  questionsState: IQuestionStatus[];
  activeIcon: any;
  setActiveIcon: any;
}) => {
  const forceUpdate = useForceUpdate();
  const handleClick5Icons = (index: number) => {
    const currentQuestionstate = questionsState;
    currentQuestionstate[number - 1] = {
      valid: true,
      answer: index * 2.5,
      touched: true,
    };
    setQuestionsState(currentQuestionstate);
    const active = activeIcon;
    active[number - 1] = [false, false, false, false, false];
    active[number - 1][index] = true;
    setActiveIcon(active);
    forceUpdate();
  };
  const handleClickSlider = (value: number) => {
    const currentQuestionstate = questionsState;
    currentQuestionstate[number - 1] = {
      valid: true,
      answer: value * 2.5,
      touched: true,
    };
    setQuestionsState(currentQuestionstate);
    forceUpdate();
  };

  const handleClickStars = (value: number) => {
    const currentQuestionstate = questionsState;
    currentQuestionstate[number - 1] = {
      valid: true,
      answer: (value - 1) * 2.5,
      touched: true,
    };
    setQuestionsState(currentQuestionstate);
    forceUpdate();
  };

  const handleClick2Icons = (index: number, mark: number) => {
    const currentQuestionstate = questionsState;
    currentQuestionstate[number - 1] = {
      valid: true,
      answer: mark,
      touched: true,
    };
    setQuestionsState(currentQuestionstate);
    const active = activeIcon;
    active[number - 1] = [false, false];
    active[number - 1][index] = true;
    setActiveIcon(active);
    forceUpdate();
  };
  return (
    <View style={{ ...Styles.container }}>
      <Text style={Styles.number}> Question {number} </Text>
      <Text style={Styles.question}> {question} </Text>
      {type == questionType.fiveIcons ? (
        <View style={Styles.emojis}>
          {images.map((image, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handleClick5Icons(index);
                }}
              >
                <View
                  style={
                    activeIcon[number - 1][index]
                      ? Styles.active
                      : Styles.inactive
                  }
                >
                  <Image source={image} style={{ height: 40, width: 40 }} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
      {type == questionType.slider ? (
        <View style={Styles.emojis}>
          <TouchableOpacity>
            <Image style={{ height: 40, width: 40 }} source={images[0]} />
          </TouchableOpacity>
          <Slider
            value={2}
            minimumValue={0}
            maximumValue={4}
            step={1}
            minimumTrackTintColor={colors.primary}
            thumbTintColor={colors.primary}
            onSlidingComplete={(value) => handleClickSlider(value)}
            style={{ width: "50%" }}
          />
          <TouchableOpacity>
            <Image style={{ height: 40, width: 40 }} source={images[1]} />
          </TouchableOpacity>
        </View>
      ) : null}
      {type == questionType.stars ? (
        <AirbnbRating
          defaultRating={0}
          count={5}
          size={40}
          showRating={false}
          onFinishRating={handleClickStars}
        />
      ) : null}
      {type == questionType.twoIcons ? (
        <View style={Styles.emojis}>
          <TouchableOpacity
            onPress={() => {
              handleClick2Icons(0, 5);
            }}
          >
            <View
              style={
                activeIcon[number - 1][0] ? Styles.active : Styles.inactive
              }
            >
              <Image style={{ height: 40, width: 40 }} source={images[0]} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleClick2Icons(1, 7.5);
            }}
          >
            <View
              style={
                activeIcon[number - 1][1] ? Styles.active : Styles.inactive
              }
            >
              <Image style={{ height: 40, width: 30 }} source={images[1]} />
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
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
  active: {
    borderColor: colors.transparent,
    borderWidth: 1,
    elevation: 5,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  inactive: {
    borderColor: colors.transparent,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
});

export default Question;
