import React from "react";
import { View, Text, StyleSheet, Image, Slider } from "react-native";

import { questionType } from "../models/interfaces";
import colors from "../config/colors";

const Question = ({
  number,
  question,
  type,
  images,
}: {
  number: number;
  question: string;
  type: questionType;
  images: any[];
}) => {
  return (
    <View style={{ ...Styles.container }}>
      <Text style={Styles.number}> Question {number} </Text>
      <Text style={Styles.question}> {question} </Text>
      {type == questionType.fiveIcons ? (
        <View style={Styles.emojis}>
          {images.map((image, index) => {
            return <Image key={index} source={image} height={20} width={20} />;
          })}
        </View>
      ) : null}
      {type == questionType.slider ? (
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
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
});

export default Question;
