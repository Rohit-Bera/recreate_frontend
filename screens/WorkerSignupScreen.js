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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { AtSymbolIcon } from "react-native-heroicons/solid";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// images
import Logo from "../assets/REcREATE.png";
import loginSVG from "../images/loginSVG.png";
import signupsvg from "../images/signupSVG.png";

const WorkerSignupScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  if (Platform.OS === "android") {
    useEffect(() => {
      const backAction = () => {
        navigation.navigate("Signup");
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
    }, []);
  }

  const inputColor = "#B9F3FC";

  if (Platform.OS === "android") {
    return (
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: inputColor }}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Image source={Logo} style={{ height: 150, width: 150 }} />
          </View>

          <View
            style={{
              margin: 20,
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Text style={{ fontSize: 20, marginBottom: 10 }}>
              Sign up as a{" "}
              <Text
                style={{ color: "#38b6ff", fontSize: 25, fontWeight: "700" }}
              >
                Worker
              </Text>
            </Text>
            <View>
              <Text style={{ fontSize: 15, marginTop: 8, marginBottom: 8 }}>
                Name
              </Text>
              <TextInput
                style={{
                  backgroundColor: "white",
                  fontSize: 13,
                  borderRadius: 5,
                  height: 40,
                  color: "#38b6ff",
                  fontSize: 15,
                  fontWeight: "700",
                  padding: 10,
                  width: 300,
                }}
                placeholder="eg: John Doe..."
              />
              <Text style={{ fontSize: 15, marginTop: 8, marginBottom: 8 }}>
                Email
              </Text>
              <TextInput
                style={{
                  backgroundColor: "white",
                  fontSize: 13,
                  borderRadius: 5,
                  height: 40,
                  color: "#38b6ff",
                  fontSize: 15,
                  fontWeight: "700",
                  padding: 10,
                  width: 300,
                }}
                placeholder="eg: johndoe@gmail.com..."
              />
              <Text style={{ fontSize: 15, marginTop: 8, marginBottom: 8 }}>
                Phone
              </Text>
              <TextInput
                style={{
                  backgroundColor: "white",
                  fontSize: 13,
                  borderRadius: 5,
                  height: 40,
                  color: "#38b6ff",
                  fontSize: 15,
                  fontWeight: "700",
                  padding: 10,
                  width: 300,
                }}
                keyboardType="numeric"
              />
              <Text style={{ fontSize: 15, marginTop: 8, marginBottom: 8 }}>
                Password
              </Text>
              <TextInput
                style={{
                  backgroundColor: "white",
                  fontSize: 13,
                  borderRadius: 5,
                  height: 40,
                  color: "#38b6ff",
                  fontSize: 15,
                  fontWeight: "700",
                  padding: 10,
                  width: 300,
                }}
              />
              <Text style={{ fontSize: 15, marginTop: 8, marginBottom: 8 }}>
                Address
              </Text>
              <TextInput
                style={{
                  backgroundColor: "white",
                  fontSize: 13,
                  borderRadius: 5,
                  height: 40,
                  color: "#38b6ff",
                  fontSize: 15,
                  fontWeight: "700",
                  padding: 10,
                  width: 300,
                }}
              />
              <Text style={{ fontSize: 15, marginTop: 8, marginBottom: 8 }}>
                City
              </Text>
              <TextInput
                style={{
                  backgroundColor: "white",
                  fontSize: 13,
                  borderRadius: 5,
                  height: 40,
                  color: "#38b6ff",
                  fontSize: 15,
                  fontWeight: "700",
                  padding: 10,
                  width: 300,
                }}
              />

              <TouchableOpacity
                style={{
                  backgroundColor: "#38b6ff",
                  fontSize: 13,
                  borderRadius: 5,
                  height: 40,
                  fontSize: 15,
                  fontWeight: "700",
                  padding: 10,
                  width: 300,
                  marginTop: 20,
                  marginBottom: 20,
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white" }}>Create Account</Text>
              </TouchableOpacity>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  // backgroundColor: "green",
                  // width: 225,
                }}
              >
                <Text>Already a member ?</Text>
                <TouchableOpacity
                  style={{
                    height: 25,
                    width: 60,
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text style={{ color: "grey" }}>Sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  } else {
    return (
      <div>
        <h3>Worker Signup page</h3>
      </div>
    );
  }
};

export default WorkerSignupScreen;
