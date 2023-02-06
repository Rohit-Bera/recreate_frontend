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
import UserServices from "../components/user/UserServices";
import Logo from "../assets/REcREATE.png";
import UserBookings from "../components/user/UserBookings";
import UserRewards from "../components/user/UserRewards";
import UserAccount from "../components/user/UserAccount";
import { useSelector } from "react-redux";

// basically fro tab

const VisitorScreen = () => {
  const navigation = useNavigation();
  //   const [component, setComponent] = useState("services");

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

  //   return <UserServices />;

  return <Text>Visitor screen opened</Text>;
};

export default VisitorScreen;
