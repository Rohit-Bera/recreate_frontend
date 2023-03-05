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
  AtSymbolIcon,
  EyeIcon,
  EyeSlashIcon,
} from "react-native-heroicons/solid";
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
  const [showPwd, setShowPwd] = useState(true);
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
        console.log("user: ", user);

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
          navigation.navigate("UserNav");
        } else if (user.type === "worker") {
          dispatch(workerData({ user, token }));
          navigation.navigate("WorkerNav");
        } else if (user.type === "admin") {
          console.log("user.type: ", user.type);
          dispatch(adminData({ user, token }));
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

      setLogUser({ email: "", password: "" });
    }
  };

  const signInWeb = async () => {
    setLoader(true);
    if (logUser.email === "" || logUser.password === "") {
      console.log("logUser: ", logUser);

      alert("please enter all details");

      setLoader(false);
    } else {
      const reply = await loginServices(logUser);

      const { response, error } = reply;

      if (response) {
        const { token, user } = response;
        console.log("user: ", user);

        console.log("response: ", response);

        setLoader(false);
        setLogUser({
          email: "",
          password: "",
        });

        alert(`Sign in Successfull!`);

        if (user.type === "user") {
          dispatch(userData({ user, token }));
          navigation.navigate("UserServices");
        } else if (user.type === "worker") {
          dispatch(workerData({ user, token }));
          navigation.navigate("WorkerRequests");
        } else if (user.type === "admin") {
          dispatch(adminData({ user, token }));
          navigation.navigate("theOwnerAdmin");
        }

        // navigation.navigate("Home");
      } else if (error) {
        console.log("error consoled: ", error);
        alert(`${error.message}`);
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
              marginTop: 15,
              marginBottom: 15,
            }}
          >
            <Image source={loginSVG} style={{ height: 240, width: 320 }} />
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
              value={logUser.email}
              onChangeText={(text) => setFields(text, "email")}
            />
            <Text>Password</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextInput
                secureTextEntry={showPwd}
                style={{
                  backgroundColor: inputColor,
                  fontSize: 15,
                  fontWeight: "700",
                  borderRadius: 5,
                  height: 40,
                  color: "#38b6ff",
                  padding: 10,
                  width: 300,
                }}
                value={logUser.password}
                onChangeText={(text) => setFields(text, "password")}
              />
              <TouchableOpacity
                onPress={() =>
                  showPwd === false ? setShowPwd(true) : setShowPwd(false)
                }
              >
                {showPwd === true ? (
                  <EyeIcon size={30} color={"#38b6ff"} />
                ) : (
                  <EyeSlashIcon size={30} color={"#38b6ff"} />
                )}
              </TouchableOpacity>
            </View>
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
              height: "90vh",
              width: "53vw",
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
                height: "80vh",
                width: "30vw",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "column",
                // backgroundColor: "blue",
              }}
            >
              <h4>Sign In to REcREATE</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  // backgroundColor: "green",
                  width: "90%",
                }}
              >
                <h5 style={{}}>Email Address</h5>
                <TextInput
                  type="text"
                  style={{
                    height: 17,
                    width: 150,
                    fontSize: "10px",
                    border: "1px solid blue",
                    outline: "none",
                    backgroundColor: "aqua",
                    borderRadius: "5px",
                    boxShadow: "0px 0px 12px 2px #38b6ff",
                    color: "black",
                  }}
                  onChangeText={(text) => setFields(text, "email")}
                />
                <h5>Password</h5>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    type="text"
                    style={{
                      height: 17,
                      width: 150,
                      fontSize: "10px",
                      border: "1px solid blue",
                      outline: "none",
                      backgroundColor: "aqua",
                      borderRadius: "5px",
                      boxShadow: "0px 0px 12px 2px #38b6ff",
                      color: "black",
                    }}
                    secureTextEntry={showPwd}
                    onChangeText={(text) => setFields(text, "password")}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      showPwd === false ? setShowPwd(true) : setShowPwd(false)
                    }
                  >
                    {showPwd === true ? (
                      <EyeIcon size={15} color={"aqua"} />
                    ) : (
                      <EyeSlashIcon size={15} color={"aqua"} />
                    )}
                  </TouchableOpacity>
                </span>
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
                      height: 23,
                      borderRadius: 5,
                      backgroundColor: "#38b6ff",
                      outline: "none",
                      border: "2px solid #38b6ff",
                      width: 100,
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                    onPress={() => signInWeb()}
                  >
                    {onLoad ? (
                      <ActivityIndicator size={10} color={"white"} />
                    ) : (
                      <Text style={{ color: "white", fontSize: 15 }}>
                        sign In
                      </Text>
                    )}
                  </TouchableOpacity>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default LoginScreen;
