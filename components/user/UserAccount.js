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
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { userData } from "../../services/UserData.reducer";
import UserNav from "./UserNav";
import {
  CreditCardIcon,
  IdentificationIcon,
  ClipboardDocumentListIcon,
  InformationCircleIcon,
  PowerIcon,
  UserIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  QueueListIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";

// basically fro tab

const UserAccount = () => {
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
      const token = "";
      const _id = "";
      const address = "";
      const city = "";
      const email = "";
      const name = "";
      const phone = "";
      const pincode = "";
      const type = "";

      const user = { _id, address, city, email, name, phone, pincode, type };

      dispatch(userData({ user, token }));

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

  const userToken = useSelector((state) => state.user).token;
  console.log("userToken: ", userToken);

  if (userToken !== "") {
    return (
      <KeyboardAwareScrollView>
        <SafeAreaView>
          <UserNav fromAccount />
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
                  <Text style={{ color: "white", fontSize: 20 }}>
                    My Profile
                  </Text>
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
                  <UsersIcon color={"white"} size={45} />
                  <Text style={{ fontSize: 19, color: "white" }}>
                    Developers
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
                  My Payments
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
                    Customer support
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
  } else {
    return (
      <KeyboardAwareScrollView>
        <SafeAreaView>
          <UserNav />
          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 25,
              //   backgroundColor: "green",
              margin: 15,
              height: 630,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#38b6ff",
                height: 70,
                width: 300,
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "row",
                borderRadius: 8,
                // padding: 15,
              }}
            >
              <InformationCircleIcon color={"white"} size={45} />
              <Text
                style={{
                  fontSize: 19,
                  color: "white",
                  //   backgroundColor: "pink",
                  width: 200,
                }}
              >
                About
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#38b6ff",
                height: 70,
                width: 300,
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
                borderRadius: 8,
                // padding: 15,
              }}
            >
              <UsersIcon color={"white"} size={45} />
              <Text
                style={{
                  fontSize: 19,
                  color: "white",
                  //   backgroundColor: "pink",
                  width: 200,
                }}
              >
                Developers
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#38b6ff",
                height: 70,
                width: 300,
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
                borderRadius: 8,
                // padding: 15,
              }}
            >
              <ChatBubbleLeftRightIcon color={"white"} size={45} />
              <Text
                style={{
                  fontSize: 19,
                  color: "white",
                  //   backgroundColor: "pink",
                  width: 200,
                }}
              >
                Customer support
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#38b6ff",
                height: 70,
                width: 300,
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
                borderRadius: 8,
                // padding: 15,
              }}
            >
              <QueueListIcon color={"white"} size={45} />
              <Text
                style={{
                  fontSize: 19,
                  color: "white",
                  //   backgroundColor: "pink",
                  width: 200,
                }}
              >
                Privacy policy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#38b6ff",
                height: 70,
                width: 300,
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
                borderRadius: 8,
                // padding: 15,
              }}
              onPress={() => navigation.navigate("Login")}
            >
              <PowerIcon color={"white"} size={40} />
              <Text
                style={{
                  fontSize: 19,
                  color: "white",
                  //   backgroundColor: "pink",
                  width: 200,
                }}
              >
                login
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
};

export default UserAccount;
