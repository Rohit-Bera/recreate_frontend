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
import { AtSymbolIcon, PencilSquareIcon } from "react-native-heroicons/solid";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UserNav from "./UserNav";
import { useSelector } from "react-redux";
import Logo from "../../assets/REcREATE.png";
import { XMarkIcon } from "react-native-heroicons/outline";
import carpenterImg from "../../images/carpenter.png";
import painterImg from "../../images/painter.png";
import plumberImg from "../../images/plumber.png";
import electricianImg from "../../images/electrician.png";
import AcRepairImg from "../../images/acRepair.png";
import washingmachinerepair from "../../images/washingmachinerepair.png";

// basically fro tab

const UserServices = () => {
  const navigation = useNavigation();
  const address = useSelector((state) => state.user).address;

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

  const [editStatus, setEditStatus] = useState(false);

  const userToken = useSelector((state) => state.user).token;
  // console.log("userToken: ", userToken);

  if (userToken !== "") {
    return (
      <KeyboardAwareScrollView>
        <SafeAreaView>
          <View>
            {/* image */}
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
            {/* address */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                // backgroundColor: "pink",
                marginTop: 15,
                marginBottom: 20,
              }}
            >
              {editStatus === false ? (
                <>
                  <Text
                    style={{
                      fontSize: 18,
                      width: 290,
                      padding: 8,
                      borderWidth: 2,
                      borderRadius: 8,
                      borderColor: "#30E3DF",
                    }}
                  >
                    {address}
                  </Text>
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
                    onPress={() => setEditStatus(true)}
                  >
                    <PencilSquareIcon color={"white"} size={40} />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TextInput
                    style={{
                      fontSize: 20,
                      width: 250,
                      padding: 8,
                      borderWidth: 2,
                      borderRadius: 8,
                      borderColor: "#30E3DF",
                    }}
                  />

                  <TouchableOpacity
                    style={{
                      backgroundColor: "#30E3DF",
                      borderRadius: 4,
                      alignItems: "center",
                      justifyContent: "space-around",
                      height: 40,
                      width: 70,
                    }}
                  >
                    <Text style={{ color: "white" }}>update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#30E3DF",
                      borderRadius: 4,
                    }}
                    onPress={() => setEditStatus(false)}
                  >
                    <XMarkIcon size={30} color={"white"} />
                  </TouchableOpacity>
                </>
              )}
            </View>
            {/* cards */}
            <View
              style={{
                justifyContent: "space-around",
                alignContent: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 120,
                    width: 180,
                    backgroundColor: "#30E3DF",
                    borderRadius: 8,
                    shadowColor: "black",
                    elevation: 10,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={carpenterImg}
                    style={{ height: 80, width: 80 }}
                  />
                  <Text style={{ fontSize: 15 }}>Carpenter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 120,
                    width: 150,
                    backgroundColor: "#30E3DF",
                    borderRadius: 8,
                    shadowColor: "black",
                    elevation: 10,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={painterImg}
                    style={{ height: 80, width: 80 }}
                  />
                  <Text style={{ fontSize: 15 }}>Painter</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 120,
                    width: 150,
                    backgroundColor: "#30E3DF",
                    borderRadius: 8,
                    shadowColor: "black",
                    elevation: 10,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={plumberImg}
                    style={{ height: 80, width: 80 }}
                  />
                  <Text style={{ fontSize: 15 }}>Plumbing</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 120,
                    width: 180,
                    backgroundColor: "#30E3DF",
                    borderRadius: 8,
                    shadowColor: "black",
                    elevation: 10,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={electricianImg}
                    style={{ height: 80, width: 80 }}
                  />
                  <Text style={{ fontSize: 15 }}>Electrician</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 120,
                    width: 180,
                    backgroundColor: "#30E3DF",
                    borderRadius: 8,
                    shadowColor: "black",
                    elevation: 10,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={washingmachinerepair}
                    style={{ height: 90, width: 90 }}
                  />
                  <Text style={{ fontSize: 15 }}>Washing Machine Repair</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 120,
                    width: 150,
                    backgroundColor: "#30E3DF",
                    borderRadius: 8,
                    shadowColor: "black",
                    elevation: 10,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={AcRepairImg}
                    style={{ height: 90, width: 90 }}
                  />
                  <Text style={{ fontSize: 15 }}>A/C Repair </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  } else {
    return (
      <SafeAreaView>
        <View>
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
          <Text>User service with nav</Text>
          <Text>User is not logged in!</Text>
        </View>
      </SafeAreaView>
    );
  }
};

export default UserServices;
