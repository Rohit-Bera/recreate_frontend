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
  PencilIcon,
  PencilSquareIcon,
  NewspaperIcon,
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

  const userToken = useSelector((state) => state.user).token;
  console.log("userToken: ", userToken);
  const name = useSelector((state) => state.user).name;
  const phone = useSelector((state) => state.user).phone;
  const address = useSelector((state) => state.user).address;
  const city = useSelector((state) => state.user).city;
  const pincode = useSelector((state) => state.user).pincode;
  const email = useSelector((state) => state.user).email;

  if (userToken !== "") {
    return (
      <KeyboardAwareScrollView>
        <SafeAreaView style={{ marginBottom: 120 }}>
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
              My Account
            </Text>
          </View>
          {/* main container */}
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            {/* conatiner 1 */}
            <View
              style={{
                justifyContent: "space-around",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  justifyContent: "space-around",
                  height: 690,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#30E3DF",
                    height: 430,
                    width: 200,
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderRadius: 8,
                    shadowColor: "black",
                    elevation: 15,
                  }}
                >
                  <Text style={{ fontSize: 15 }}>{name}</Text>
                  <Text style={{ fontSize: 15 }}>{phone}</Text>
                  <Text style={{ fontSize: 15 }}>{address}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      width: 180,
                    }}
                  >
                    <Text style={{ fontSize: 15 }}>{city}</Text>
                    <Text style={{ fontSize: 15 }}>{pincode}</Text>
                  </View>
                  <Text style={{ fontSize: 15 }}>{email}</Text>

                  <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      height: 50,
                      width: 180,
                      flexDirection: "row",

                      justifyContent: "space-evenly",
                      alignItems: "center",
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: "black",
                        fontSize: 16,
                      }}
                    >
                      Change Password
                    </Text>
                    <PencilIcon size={22} color={"#30E3DF"} />
                  </TouchableOpacity>
                  <View
                    style={{
                      justifyContent: "space-evenly",
                      flexDirection: "row",
                      width: 200,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: "white",
                        height: 50,
                        width: 95,
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        borderRadius: 8,
                      }}
                      onPress={() => logOut()}
                    >
                      <Text
                        style={{
                          color: "black",
                          fontSize: 16,
                        }}
                      >
                        Logout
                      </Text>
                      <PowerIcon color={"#30E3DF"} size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "white",
                        height: 50,
                        width: 74,
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        borderRadius: 8,
                      }}
                    >
                      <Text
                        style={{
                          color: "black",
                          fontSize: 16,
                        }}
                      >
                        Edit
                      </Text>
                      <PencilSquareIcon color={"#30E3DF"} size={25} />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#30E3DF",
                    height: 95,
                    width: 200,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderRadius: 8,
                    shadowColor: "black",
                    elevation: 10,
                  }}
                >
                  <Text style={{ fontSize: 16, color: "black" }}>
                    Terms & Conditions
                  </Text>
                  <NewspaperIcon color={"white"} size={33} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#30E3DF",
                    height: 95,
                    width: 200,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderRadius: 8,
                    shadowColor: "black",
                    elevation: 10,
                  }}
                >
                  <Text style={{ fontSize: 16, color: "black" }}>
                    Customer support
                  </Text>
                  <ChatBubbleLeftRightIcon color={"white"} size={33} />
                </TouchableOpacity>
              </View>
            </View>
            {/* conatiner 2 */}
            <View style={{ height: 690, justifyContent: "space-around" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#30E3DF",
                  height: 120,
                  width: 145,
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderRadius: 8,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                <InformationCircleIcon color={"white"} size={33} />
                <Text style={{ fontSize: 16, color: "black" }}>About</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#30E3DF",
                  height: 120,
                  width: 145,
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderRadius: 8,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                <ClipboardDocumentListIcon color={"white"} size={33} />
                <Text style={{ fontSize: 16, color: "black" }}>My Orders</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#30E3DF",
                  height: 120,
                  width: 145,
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderRadius: 8,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                <CreditCardIcon color={"white"} size={33} />
                <Text style={{ fontSize: 16, color: "black" }}>
                  My Payments
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#30E3DF",
                  height: 120,
                  width: 145,
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderRadius: 8,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                <QueueListIcon color={"white"} size={33} />
                <Text style={{ fontSize: 16, color: "black" }}>
                  Privacy policy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  } else {
    return (
      <KeyboardAwareScrollView>
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
              My Account
            </Text>
          </View>
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
                backgroundColor: "#30E3DF",
                height: 70,
                width: 300,
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "row",
                borderRadius: 8,
                // padding: 15,
              }}
            >
              <InformationCircleIcon color={"white"} size={33} />
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
                backgroundColor: "#30E3DF",
                height: 70,
                width: 300,
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
                borderRadius: 8,
                // padding: 15,
              }}
            >
              <NewspaperIcon color={"white"} size={33} />
              <Text
                style={{
                  fontSize: 19,
                  color: "white",
                  //   backgroundColor: "pink",
                  width: 200,
                }}
              >
                Terms & Conditions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#30E3DF",
                height: 70,
                width: 300,
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
                borderRadius: 8,
                // padding: 15,
              }}
            >
              <ChatBubbleLeftRightIcon color={"white"} size={33} />
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
                backgroundColor: "#30E3DF",
                height: 70,
                width: 300,
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
                borderRadius: 8,
                // padding: 15,
              }}
            >
              <QueueListIcon color={"white"} size={33} />
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
                backgroundColor: "#30E3DF",
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
