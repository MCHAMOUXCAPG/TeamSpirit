import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Slider from "react-native-slider";
import { AirbnbRating } from "react-native-ratings";

import { questionType } from "../models/interfaces";
import colors from "../config/colors";

const ratingCompleted = (starRating) => {
  console.log(starRating);
}

const slidingCompleted = (slideRating) => {
  console.log(slideRating);
}

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
            return <TouchableOpacity><Image key={index} source={image} style={{ height: 40, width: 40 }} /></TouchableOpacity>;
          })}
        </View>
      ) : null}
       {type == questionType.slider ? (
          <View style={Styles.emojis}>
           <TouchableOpacity>
              <Image
                style={{ height: 40, width: 40 }}
                source={images[0]}
              />
            </TouchableOpacity>
             <Slider 
          value={2} 
          minimumValue={0} 
          maximumValue={4} 
          step={1} 
          minimumTrackTintColor={colors.primary} 
          thumbTintColor={colors.primary} 
          onSlidingComplete={slidingCompleted} 
          style={{width: "50%"}}  
        />
            <TouchableOpacity>
              <Image
                style={{ height: 40, width: 40 }}
                source={images[1]}
              />
            </TouchableOpacity>
        </View>
       
      ) : null}
      {type == questionType.stars ? (
        <AirbnbRating 
          defaultRating={0} 
          count={5} 
          size={40} 
          showRating={false} 
          onFinishRating={ratingCompleted} 
        />
      ) : null}
      {type == questionType.twoIcons ? (
        <View style={Styles.emojis}>
           <TouchableOpacity>
              <Image
                style={{ height: 40, width: 40 }}
                source={images[0]}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{ height: 40, width: 30 }}
                source={images[1]}
              />
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
  rating: {
    
  }
});

export default Question;
