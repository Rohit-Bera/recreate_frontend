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
  CreditCardIcon,
  IdentificationIcon,
  ClipboardDocumentListIcon,
  InformationCircleIcon,
  PowerIcon,
  UserIcon,
  CheckBadgeIcon,
  ChatBubbleLeftRightIcon,
  QueueListIcon,
} from "react-native-heroicons/solid";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import WorkerNav from "./WorkerNav";
import { workerData } from "../../services/WorkerData.reducer";
import { useDispatch } from "react-redux";
import Logo from "../../assets/REcREATE.png";

// basically fro tab

const WorkerAccount = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

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

  const fromAccount = true;

  const logOut = () => {
    const onClickOk = () => {
      const _id = "";
      const city = "";
      const email = "";
      const name = "";
      const phone = "";
      const state = "";
      const pincode = "";
      const type = "";
      const profession = "";
      const workerExperience = "";

      const token = "";

      const user = {
        _id,
        city,
        email,
        name,
        phone,
        pincode,
        type,
        profession,
        workerExperience,
        state,
      };

      dispatch(workerData({ user, token }));

      ToastAndroid.show(
        `Log out Successfull!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );

      navigation.navigate("Login");
    };

    Alert.alert("Log out", "Are you sure , you want to log out ?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => onClickOk(),
      },
    ]);
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView>
        <View
          style={{
            backgroundColor: "#B9F3FC",
            padding: 5,
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
        </View>
        {/* main container */}
        <View style={{ margin: 13, marginTop: 25 }}>
          <View
            style={{
              justifyContent: "space-around",
              flexDirection: "row",
              height: 230,
              //   backgroundColor: "pink",
            }}
          >
            <View style={{ justifyContent: "space-around" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#38b6ff",
                  height: 207,
                  width: 160,
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderRadius: 8,
                }}
              >
                <IdentificationIcon color={"white"} size={80} />
                <Text style={{ color: "white", fontSize: 20 }}>My Profile</Text>
              </TouchableOpacity>
            </View>

            <View style={{ justifyContent: "space-around" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#38b6ff",
                  height: 95,
                  width: 160,
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderRadius: 8,
                }}
              >
                <InformationCircleIcon color={"white"} size={45} />
                <Text style={{ fontSize: 19, color: "white" }}>About</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#38b6ff",
                  height: 95,
                  width: 160,
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderRadius: 8,
                }}
              >
                <CheckBadgeIcon color={"white"} size={45} />
                <Text style={{ fontSize: 19, color: "white" }}>
                  Verification
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              //   backgroundColor: "green",
              height: 130,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#38b6ff",
                height: 95,
                width: 160,
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: 8,
              }}
            >
              <ClipboardDocumentListIcon color={"white"} size={45} />
              <Text style={{ fontSize: 19, color: "white" }}>My Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#38b6ff",
                height: 95,
                width: 160,
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: 8,
              }}
            >
              <CreditCardIcon color={"white"} size={45} />
              <Text style={{ fontSize: 19, color: "white" }}>
                Pay commission
              </Text>
            </TouchableOpacity>
          </View>
          {/* diff */}
          <View
            style={{
              justifyContent: "space-around",
              flexDirection: "row",
              height: 230,
              //   backgroundColor: "pink",
              alignItems: "center",
            }}
          >
            <View
              style={{
                justifyContent: "space-around",
                // backgroundColor: "green",
                height: 210,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#38b6ff",
                  height: 100,
                  width: 170,
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderRadius: 8,
                }}
              >
                <ChatBubbleLeftRightIcon color={"white"} size={45} />
                <Text style={{ fontSize: 19, color: "white" }}>
                  Worker support
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#38b6ff",
                  height: 100,
                  width: 170,
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderRadius: 8,
                }}
              >
                <QueueListIcon color={"white"} size={45} />
                <Text style={{ fontSize: 19, color: "white" }}>
                  Privacy policy
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: "space-around" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#38b6ff",
                  height: 207,
                  width: 160,
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderRadius: 8,
                }}
                onPress={() => logOut()}
              >
                <PowerIcon color={"white"} size={100} />
                <Text
                  style={{
                    color: "white",
                    fontSize: 23,
                  }}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default WorkerAccount;
