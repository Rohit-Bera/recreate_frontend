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
import { AtSymbolIcon } from "react-native-heroicons/solid";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UserNav from "./UserNav";
import { useSelector } from "react-redux";

// basically fro tab

const UserRewards = () => {
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

  const fromRewards = true;

  const userToken = useSelector((state) => state.user).token;
  console.log("userToken: ", userToken);

  if (userToken !== "") {
    return (
      <SafeAreaView>
        <View
          style={{
            backgroundColor: "#B9F3FC",
            padding: 25,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              color: "black",
              fontWeight: "500",
            }}
          >
            Rewards
          </Text>
        </View>
        <View>
          <Text>User rewards with nav</Text>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <View
          style={{
            backgroundColor: "#B9F3FC",
            padding: 25,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              color: "black",
              fontWeight: "500",
            }}
          >
            Rewards
          </Text>
        </View>

        <View
          style={{
            height: "80%",
            width: "100%",
            // backgroundColor: "green",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text>No coupons found!</Text>
            <Text>Please login!</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

export default UserRewards;
