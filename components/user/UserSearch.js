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
import { MagnifyingGlassCircleIcon } from "react-native-heroicons/outline";

// basically fro tab

const UserSearch = () => {
  const navigation = useNavigation();
  const [services, setServices] = useState([]);

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

  const getServices = async () => {};

  if (userToken !== "") {
    return (
      <KeyboardAwareScrollView>
        <SafeAreaView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              margin: 20,
              alignItems: "center",
              // backgroundColor: "green",
            }}
          >
            <TextInput
              style={{
                fontSize: 20,
                width: 290,
                padding: 8,
                borderWidth: 2,
                borderRadius: 8,
                borderColor: "#30E3DF",
              }}
              placeholder="eg : carpenter.."
            />
            <TouchableOpacity
              style={{
                flexDirection: "row",
                backgroundColor: "#30E3DF",
                borderRadius: 4,
                alignItems: "center",
                justifyContent: "space-around",
                height: 50,
                width: 50,
              }}
            >
              <MagnifyingGlassCircleIcon color={"white"} size={40} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  } else {
    return (
      <SafeAreaView>
        <View>
          <Text>User search with nav</Text>
          <Text>User is not logged in!</Text>
        </View>
      </SafeAreaView>
    );
  }
};

export default UserSearch;
