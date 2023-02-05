import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  BackHandler,
  Alert,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { WrenchScrewdriverIcon } from "react-native-heroicons/solid";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// images
import Logo from "../../assets/REcREATE.png";
// import loginSVG from "../images/loginSVG.png";
// import signupsvg from "../images/signupSVG.png";

// basically fro tab

const UserNav = () => {
  const navigation = useNavigation();

  // useEffect(() => {
  const backAction = () => {
    Alert.alert("Exit App", "Exiting the application", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );
  // }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  //   --------------------------

  return (
    <View
      style={{
        backgroundColor: "#B9F3FC",
      }}
    >
      <Image
        source={Logo}
        style={{
          height: 100,
          width: 115,
          marginLeft: 20,
        }}
      />
      <View
        style={{
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <WrenchScrewdriverIcon color={"#38b6ff"} size={40} />
          <Text>services</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>coupons</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserNav;
