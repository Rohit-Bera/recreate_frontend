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
import {
  WrenchScrewdriverIcon,
  GiftIcon,
  ClipboardDocumentCheckIcon,
  UserCircleIcon,
} from "react-native-heroicons/solid";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// images
import Logo from "../../assets/REcREATE.png";
// import loginSVG from "../images/loginSVG.png";
// import signupsvg from "../images/signupSVG.png";

// basically fro tab

const UserNav = (prop) => {
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
    <KeyboardAwareScrollView>
      <View
        style={{
          backgroundColor: "#B9F3FC",
        }}
      >
        <Image
          source={Logo}
          style={{
            height: 90,
            width: 115,
            marginLeft: 20,
          }}
        />

        <View
          style={{
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            //   backgroundColor: "green",
            height: 60,
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "space-around",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("UserServices")}
          >
            <WrenchScrewdriverIcon
              color={prop.fromService === true ? "#38b6ff" : "#A8A8A8"}
              size={33}
            />
            <Text
              style={{
                color: prop.fromService === true ? "#38b6ff" : "#A8A8A8",
              }}
            >
              services
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              justifyContent: "space-around",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("UserBookings")}
          >
            <ClipboardDocumentCheckIcon
              color={prop.fromBookings === true ? "#38b6ff" : "#A8A8A8"}
              size={33}
            />
            <Text
              style={{
                color: prop.fromBookings === true ? "#38b6ff" : "#A8A8A8",
              }}
            >
              bookings
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              justifyContent: "space-around",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("UserRewards")}
          >
            <GiftIcon
              color={prop.fromRewards === true ? "#38b6ff" : "#A8A8A8"}
              size={33}
            />
            <Text
              style={{
                color: prop.fromRewards === true ? "#38b6ff" : "#A8A8A8",
              }}
            >
              coupons
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              justifyContent: "space-around",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("UserAccount")}
          >
            <UserCircleIcon
              color={prop.fromAccount === true ? "#38b6ff" : "#A8A8A8"}
              size={33}
            />
            <Text
              style={{
                color: prop.fromAccount === true ? "#38b6ff" : "#A8A8A8",
              }}
            >
              account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default UserNav;
