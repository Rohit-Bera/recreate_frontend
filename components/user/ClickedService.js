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
  FlatList,
  RefreshControl,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, StackActions } from "@react-navigation/native";
import { AtSymbolIcon, PencilSquareIcon } from "react-native-heroicons/solid";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import Logo from "../../assets/REcREATE.png";
import {
  bookClickedServiceApi,
  bookService,
  getServicesForClickedApi,
} from "../../services/Oneforall";
import AppIntroSlider from "react-native-app-intro-slider";

const ClickedService = ({ route }) => {
  const { clickedService, serviceId } = route.params;
  console.log("serviceId: ", serviceId);
  console.log("clickedService: ", clickedService);

  const [bookLoader, setBookLoader] = useState(false);

  const navigation = useNavigation();

  const backAction = () => {
    navigation.navigate("UserNav");

    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  const userToken = useSelector((state) => state.user).token;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${clickedService.launchedService.launchedServiceName}`,
      headerStyle: {
        backgroundColor: "#B9F3FC",
      },
      headerTitleStyle: {
        color: "black",
      },
    });
  }, []);

  const bookClickedService = async () => {
    setBookLoader(true);
    console.log("userToken: ", userToken);

    if (userToken !== "") {
      const headers = { headers: { Authorization: `Bearer ${userToken}` } };

      const result = await bookService({ headers, serviceId });

      const { newBookedService, error } = result;

      if (error) {
        ToastAndroid.show(
          `${error.message}`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }

      if (newBookedService) {
        ToastAndroid.show(
          `Service was booked successfully!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }

      newBookedService ? setBookLoader(false) : setBookLoader(false);
    } else {
      ToastAndroid.show(
        `please login first!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View>
        <View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={clickedService.launchedService.launchedServiceImage}
            renderItem={({ item, index }) => (
              <View
                style={{
                  backgroundColor: "white",
                  height: 280,
                  width: 370,
                  margin: 10,
                }}
              >
                {/* <Text>Service image</Text> */}
                <Image
                  source={{ uri: item }}
                  style={{ height: "100%", width: "100%" }}
                />
              </View>
            )}
          />
          <View
            style={{ justifyContent: "space-around", alignItems: "center" }}
          >
            <View
              style={{
                margin: 15,
                backgroundColor: "white",
                width: 350,
                minHeight: 350,
                maxHeight: 500,
                marginBottom: 120,
                // padding: 23,
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: 3,
                shadowColor: "#748c94",
                elevation: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "grey",
                  fontWeight: "500",
                  textTransform: "capitalize",
                }}
              >
                {" "}
                {clickedService.launchedService.launchedServiceName}{" "}
              </Text>
              <Text
                style={{
                  fontSize: 18.5,
                  width: 280,
                }}
              >
                {" "}
                {clickedService.launchedService.launchedServiceDescription}{" "}
              </Text>

              <TouchableOpacity
                style={{
                  backgroundColor: "#B9F3FC",
                  height: 50,
                  width: 130,
                  alignItems: "center",
                  justifyContent: "space-around",
                  borderRadius: 3,
                }}
                onPress={() => bookClickedService()}
              >
                {bookLoader ? (
                  <ActivityIndicator size={30} color={"white"} />
                ) : (
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "600",
                    }}
                  >
                    book service
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ClickedService;
