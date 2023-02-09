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
import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//
import AdminDashboard from "./AdminDashboard";
import UserServices from "../components/user/UserServices";
import WorkerRequests from "../components/worker/WorkerRequests";

const HomeScreen = () => {
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

  const userToken = useSelector((state) => state.user).token;
  console.log("userToken: ", userToken);
  const workerToken = useSelector((state) => state.worker).token;
  console.log("workerToken: ", workerToken);
  const adminToken = useSelector((state) => state.admin).token;
  console.log("adminToken: ", adminToken);

  if (Platform.OS === "android" || Platform.OS === "ios") {
    if (userToken !== "") {
      return <UserServices />;
    } else if (workerToken !== "") {
      return <WorkerRequests />;
    } else {
      return <UserServices />;
    }
  } else {
    return <AdminDashboard />;
  }
};

export default HomeScreen;
