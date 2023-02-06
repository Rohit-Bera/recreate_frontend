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
import { loginServices } from "../services/Oneforall";
import { useDispatch } from "react-redux";
import { userData } from "../services/UserData.reducer";
// images
import Logo from "../assets/REcREATE.png";
import loginSVG from "../images/loginSVG.png";
import { workerData } from "../services/WorkerData.reducer";
import { adminData } from "../services/AdminData.reducer";

const LoginScreen = ({ history }) => {
  const [logUser, setLogUser] = useState({
    email: "",
    password: "",
  });
  const [onLoad, setLoader] = useState(false);
  const dispatch = useDispatch();

  // navigation
  const navigation = useNavigation();
  const inputColor = "#B9F3FC";

  useEffect(() => {
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
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const setFields = (value, name) => {
    // console.log("field: ", field);
    // console.log("text: ", text);

    setLogUser({ ...logUser, [name]: value });
  };

  const signIn = async () => {
    setLoader(true);
    if (logUser.email === "" || logUser.password === "") {
      console.log("logUser: ", logUser);
      ToastAndroid.show(
        "please enter all details",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );

      setLoader(false);
    } else {
      const reply = await loginServices(logUser);

      const { response, error } = reply;

      if (response) {
        const { token, user } = response;

        console.log("response: ", response);

        setLoader(false);
        setLogUser({
          email: "",
          password: "",
        });

        ToastAndroid.show(
          `Sign in Successfull!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );

        if (user.type === "user") {
          dispatch(userData({ user, token }));
          navigation.navigate("UserServices");
        } else if (user.type === "worker") {
          dispatch(workerData({ user, token }));
          navigation.navigate("WorkerRequests");
        } else if (user.type === "admin") {
          dispatch(adminData({ token, user }));
          navigation.navigate("theOwnerAdmin");
        }

        // navigation.navigate("Home");
      } else if (error) {
        console.log("error consoled: ", error);
        ToastAndroid.show(
          `${error.message}`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        setLoader(false);
      }
    }
  };

  // ------------------------------------------------------

  if (Platform.OS === "android" || Platform.OS === "ios") {
    return (
      <KeyboardAwareScrollView
        style={{ flex: 1, margin: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <View
            style={{
              marginTop: 15,
              marginLeft: 20,
              width: 120,
            }}
          >
            <Image source={Logo} style={{ height: 100, width: 100 }} />
          </View>
          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Image source={loginSVG} style={{ height: 200, width: 250 }} />
          </View>

          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              paddingBottom: 10,
            }}
          >
            Sign in to REcREATE
          </Text>

          <View
            style={{
              height: 150,
              justifyContent: "space-around",
              flexDirection: "column",
            }}
          >
            <Text style={{ fontSize: 15 }}>Email Address</Text>
            <TextInput
              style={{
                backgroundColor: inputColor,
                fontSize: 13,
                borderRadius: 5,
                height: 40,
                color: "#38b6ff",
                fontSize: 15,
                fontWeight: "700",
                padding: 10,
              }}
              onChangeText={(text) => setFields(text, "email")}
            />
            <Text>Password</Text>
            <TextInput
              secureTextEntry={true}
              style={{
                backgroundColor: inputColor,
                fontSize: 15,
                fontWeight: "700",
                borderRadius: 5,
                height: 40,
                color: "#38b6ff",
                padding: 10,
              }}
              onChangeText={(text) => setFields(text, "password")}
            />
          </View>

          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 15,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("Forgotpassword")}
            >
              <Text style={{ color: "grey" }}>forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#38b6ff",
                height: 44,
                borderRadius: 5,
                flex: 0.5,
                justifyContent: "space-around",
                alignItems: "center",
              }}
              onPress={() => signIn()}
            >
              {onLoad ? (
                <ActivityIndicator size={30} color={"white"} />
              ) : (
                <Text style={{ color: "white" }}>sign In</Text>
              )}
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <Text style={{ padding: 10 }}>Not a Member?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={{ color: "grey" }}>Sign Up now</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  } else {
    return (
      <>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap');
        </style>

        <div
          style={{
            display: "flex",
            // justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {/* image */}
          <div
            style={{
              height: "100vh",
              width: "45vw",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "#B9F3FC",
            }}
          >
            <img
              src={require("../images/bubble-gum-one-time-password-on-the-phone.png")}
              style={{
                height: "50vh",
                width: "30vw",
              }}
            />
          </div>
          {/* form */}
          <div
            style={{
              height: "80vh",
              width: "50vw",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "column",
              // backgroundColor: "green",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                height: "20vh",
                width: "40vw",
              }}
            >
              <img src={Logo} style={{ height: "20vh" }} />
            </div>
            <div
              style={{
                fontFamily: "Raleway",
                height: "50vh",
                width: "30vw",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "column",
                // backgroundColor: "blue",
              }}
            >
              <h2>Sign In to REcREATE</h2>
              <form
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <h3 style={{}}>Email Address</h3>
                <input
                  type="text"
                  style={{
                    height: "4vh",
                    width: "20vw",
                    fontSize: "15px",
                    border: "1px solid blue",
                    outline: "none",
                    backgroundColor: "aqua",
                    borderRadius: "5px",
                    boxShadow: "0px 0px 12px 2px #38b6ff",
                  }}
                />
                <h3>Password</h3>
                <input
                  type="text"
                  style={{
                    height: "4vh",
                    width: "20vw",
                    fontSize: "15px",
                    border: "1px solid blue",
                    outline: "none",
                    backgroundColor: "aqua",
                    borderRadius: "5px",
                    boxShadow: "0px 0px 12px 2px #38b6ff",
                  }}
                />
                <div
                  style={{
                    height: "10vh",
                    width: "20vw",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      color: "grey",
                      height: "4vh",
                      width: "8vw",
                      outline: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "15px",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                    onPress={() => navigation.navigate("Forgotpassword")}
                  >
                    <Text>forgot password?</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      height: "5vh",
                      borderRadius: "8px",
                      backgroundColor: "#38b6ff",
                      outline: "none",
                      border: "2px solid #38b6ff",
                      width: "8vw",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                    onPress={() => signIn()}
                  >
                    <Text
                      style={{
                        color: "white",

                        fontSize: "15px",
                      }}
                    >
                      Sign In
                    </Text>
                  </TouchableOpacity>
                </div>

                <div
                  style={{
                    height: "10vh",
                    width: "18vw",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <h4>Not a Member ?</h4>
                  <TouchableOpacity
                    style={{
                      color: "grey",
                      height: "4vh",
                      width: "9vw",
                      outline: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "15px",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                    onPress={() => navigation.navigate("Signup")}
                  >
                    <Text>Sign Up now</Text>
                  </TouchableOpacity>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default LoginScreen;
