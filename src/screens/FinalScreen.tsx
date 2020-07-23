import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import colors from "../config/colors";

const FinalScreen = ({ route, navigation }) => {
  const { message } = route.params;

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);
  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require("../assets/homeBackground.png")}
        style={styles.imgBackground}
      >
      <TouchableOpacity onPress={() => navigation.reset({
        routes:[{name:'HomeScreen'}],
      })} style={styles.submit}>
              <Text style={styles.insideButton}>Back</Text>
      </TouchableOpacity>
        <Text style={styles.message}>{message}</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  imgBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    flex: 1,
    position: "absolute",
    width: "80%",
    top: "50%",
    fontFamily: "Roboto",
    fontStyle: "normal",
    textAlign: "center",
    fontSize: 25,
    color: colors.white,
  },
  submit: {
    width: wp("35%"),
    height: hp("8%"),
    top: hp('22%'),
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 40,
  },
  insideButton: {
    textAlign: "center",
    fontSize: hp('3.2%'),
    paddingBottom: hp("1.5%"),
    paddingTop: hp("1.7%"),
    color: colors.white,
  },
});

export default FinalScreen;
