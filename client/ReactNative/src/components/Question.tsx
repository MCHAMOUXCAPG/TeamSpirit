import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Slider } from "react-native-elements";
import { AirbnbRating } from "react-native-ratings";

import {
  questionType,
  IQuestionStatus,
  IQuestionResponse,
} from "../models/interfaces";
import colors from "../config/colors";
import questionsContext from "../context/questionsContext";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const Question = ({
  number,
  question,
  type,
  images,
  setQuestionsState,
  questionsState,
  activeIcon,
  setActiveIcon,
  useForceUpdate,
}: {
  number: number;
  question: string;
  type: questionType;
  images: any[];
  setQuestionsState: any;
  questionsState: IQuestionStatus[];
  activeIcon: any;
  setActiveIcon: any;
  useForceUpdate: any;
}) => {
  const { questionsResponse, setQuestionsResponse, setDisabled } = useContext(
    questionsContext
  );
  const [sliderValue, setSliderValue] = useState(2);
  const forceUpdate = useForceUpdate();
  const checkDisabled = () => {
    let count = 0;
    const currentQuestionStatus = questionsState;
    currentQuestionStatus.map((question: IQuestionStatus) => {
      question.status = "";
      if (question.valid) {
        count++;
      }
    });
    if (count === questionsState.length) {
      console.log("disabled false");
      setDisabled(false);
      forceUpdate();
    }
  };
  const handleClick5Icons = (index: number) => {
    const currentQuestionstate = questionsState;
    const currentQuestionsResponse = questionsResponse;
    currentQuestionstate[number - 1] = {
      valid: true,
      touched: true,
    };
    currentQuestionsResponse[number - 1].note = index * 2.5;
    setQuestionsState(currentQuestionstate);
    setQuestionsResponse(currentQuestionsResponse);
    const active = activeIcon;
    active[number - 1] = [false, false, false, false, false];
    active[number - 1][index] = true;
    setActiveIcon(active);
    forceUpdate();
    checkDisabled();
  };
  const handleClickSlider = (value: number) => {
    const currentQuestionstate = questionsState;
    const currentQuestionsResponse = questionsResponse;
    currentQuestionstate[number - 1] = {
      valid: true,
      touched: true,
    };
    currentQuestionsResponse[number - 1].note = value * 2.5;
    setQuestionsState(currentQuestionstate);
    setQuestionsResponse(currentQuestionsResponse);
    forceUpdate();
    checkDisabled();
  };

  const handleClickStars = (value: number) => {
    const currentQuestionstate = questionsState;
    const currentQuestionsResponse = questionsResponse;
    currentQuestionstate[number - 1] = {
      valid: true,
      touched: true,
    };
    currentQuestionsResponse[number - 1].note = (value - 1) * 2.5;
    setQuestionsState(currentQuestionstate);
    setQuestionsResponse(currentQuestionsResponse);
    forceUpdate();
    checkDisabled();
  };

  const handleClick2Icons = (index: number, mark: number) => {
    const currentQuestionstate = questionsState;
    const currentQuestionsResponse = questionsResponse;
    currentQuestionstate[number - 1] = {
      valid: true,
      touched: true,
    };
    currentQuestionsResponse[number - 1].note = mark;
    setQuestionsState(currentQuestionstate);
    setQuestionsResponse(currentQuestionsResponse);
    const active = activeIcon;
    active[number - 1] = [false, false];
    active[number - 1][index] = true;
    setActiveIcon(active);
    forceUpdate();
    checkDisabled();
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
          <TouchableOpacity
            onPress={() => {
              setSliderValue(0);
              handleClickSlider(0);
            }}
          >
            <Image style={{ height: 40, width: 40 }} source={images[0]} />
          </TouchableOpacity>
          <Slider
            value={sliderValue}
            minimumValue={0}
            maximumValue={4}
            step={1}
            minimumTrackTintColor={colors.primary}
            thumbTintColor={colors.primary}
            onSlidingComplete={(value) => handleClickSlider(value)}
            style={{ width: "50%" }}
          />
          <TouchableOpacity
            onPress={() => {
              setSliderValue(4);
              handleClickSlider(4);
            }}
          >
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
    marginTop: hp("5%"),
    marginBottom: hp("8%"),
    height: hp("45%"),
    width: wp("90%"),
    elevation: 3,
    paddingTop: hp("8%"),
    paddingBottom: hp("6%"),
    paddingHorizontal: wp("3%"),
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
