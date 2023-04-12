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
  RefreshControl,
  Modal,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { AtSymbolIcon, XMarkIcon } from "react-native-heroicons/solid";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UserNav from "./UserNav";
import { useSelector } from "react-redux";
import {
  deleteMyOrderService,
  getAllUsersOrder,
} from "../../services/Oneforall";
import Logo from "../../assets/REcREATE.png";
import {
  PhoneArrowUpRightIcon,
  TrashIcon,
  UserIcon,
} from "react-native-heroicons/outline";

// basically fro tab

const UserBookings = () => {
  const navigation = useNavigation();

  const [allOrders, setAllOrders] = useState([]);

  const [refresh, setRefresh] = useState(false); // pull-down-refresh
  const [loader, setLoader] = useState(false); // loader state

  const [modalState, setModalState] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    item: "",
    bookedDt: "",
    visitDt: "",
  });

  useEffect(() => {
    getAllOrders();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const userToken = useSelector((state) => state.user).token;
  console.log("userToken: ", userToken);

  const getAllOrders = async () => {
    setLoader(true);
    const headers = { headers: { Authorization: `Bearer ${userToken}` } };

    const response = await getAllUsersOrder({ headers });

    const { orders, error } = response;

    if (orders) {
      setLoader(false);
      setAllOrders(orders);
    }

    if (error) {
      setLoader(false);
      ToastAndroid.show(`${error}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }

    console.log("error: ", error);
    console.log("userOrders: ", orders);
  };

  const deleteMyOrder = async (_id) => {
    console.log("_id: ", _id);

    setLoader(true);
    const headers = { headers: { Authorization: `Bearer ${userToken}` } };

    const result = await deleteMyOrderService({ _id, headers });

    const { success, error } = result;

    // success ? setLoader(false) : setLoader(false);

    if (error) {
      setLoader(false);
      ToastAndroid.show(`${error}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }

    setModalState(false);
    getAllOrders();
  };

  if (userToken === "") {
    return (
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
            Bookings
          </Text>
        </View>
        <View
          style={{
            height: "80%",
            width: "100%",
            // backgroundColor: "green",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text>No bookings found!</Text>
            <Text>Please login!</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => getAllOrders()}
          />
        }
      >
        <SafeAreaView style={{ marginBottom: 110 }}>
          <View style={{ backgroundColor: "#B9F3FC", height: 90 }}>
            <Text style={{ fontSize: 26, fontWeight: "300", padding: 25 }}>
              Bookings
            </Text>
          </View>
          {/* container */}
          {loader ? (
            <Modal
              transparent={true}
              style={{ justifyContent: "space-around", alignItems: "center" }}
            >
              <View
                style={{
                  backgroundColor: "#FFFFFFaa",
                  flex: 1,
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#B9F3FC",
                    height: 70,
                    width: 70,
                    justifyContent: "space-around",
                    alignItems: "center",
                    flexDirection: "row",
                    borderRadius: 5,
                    borderColor: "#30E3DF",
                    borderWidth: 2,
                  }}
                >
                  <ActivityIndicator size={30} color={"white"} />
                </View>
              </View>
            </Modal>
          ) : (
            <View style={{ margin: 15 }}>
              {allOrders.map((item, index) => {
                console.log("item all orders: ", item);
                console.log("_---------------------------------------------");

                if (item.orderStatus !== "done") {
                  if (item.service) {
                    const date = new Date(item.bookedDate);

                    const dd = date.getDate();
                    const mm = date.getMonth();
                    const yyyy = date.getFullYear();

                    const booked = dd + "-" + mm + "-" + yyyy;

                    const vdate = new Date(item.visitDate);
                    const vdd = vdate.getDate();
                    const vmm = vdate.getMonth();
                    const vyyyy = vdate.getFullYear();

                    const visit = vdd + "-" + vmm + "-" + vyyyy;
                    // console.log("item.service: ", item.service);
                    return (
                      <View
                        key={index}
                        style={{
                          backgroundColor: "#30E3DF",
                          marginTop: 10,
                          marginBottom: 10,
                          borderRadius: 5,
                          justifyContent: "space-around",
                          alignItems: "center",
                          flexDirection: "row",
                          height: 80,
                          shadowColor: "black",
                          elevation: 10,
                        }}
                      >
                        <Image
                          source={{
                            uri: item.service.launchedService
                              .launchedServiceImage[0],
                          }}
                          style={{ height: 60, width: 60 }}
                        />
                        <View
                          style={{
                            // backgroundColor: "white",
                            width: 180,
                            margin: 5,
                            minHeight: 70,
                            maxHeight: "auto",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <Text
                            style={{
                              textTransform: "capitalize",
                              fontSize: 15,
                            }}
                          >
                            {item.service.launchedService.launchedServiceName}
                          </Text>
                          <Text>Booked dt . {booked}</Text>
                          {item.orderStatus == "accepted" ? (
                            <Text> Visit dt . {visit} </Text>
                          ) : (
                            ""
                          )}
                        </View>
                        <TouchableOpacity
                          style={{
                            backgroundColor: "white",
                            height: 40,
                            width: 60,
                            borderRadius: 3,
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                          onPress={() => {
                            setModalState(true),
                              setModalInfo({
                                item: item,
                                bookedDt: booked,
                                visitDt: visit,
                              });
                          }}
                        >
                          <Text style={{ fontSize: 16 }}>view</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  } else if (item.request) {
                    const date = new Date(item.bookedDate);

                    const dd = date.getDate();
                    const mm = date.getMonth();
                    const yyyy = date.getFullYear();

                    const booked = dd + "-" + mm + "-" + yyyy;

                    const vdate = new Date(item.visitDate);
                    const vdd = vdate.getDate();
                    const vmm = vdate.getMonth();
                    const vyyyy = vdate.getFullYear();

                    const visit = vdd + "-" + vmm + "-" + vyyyy;

                    return (
                      <View
                        key={index}
                        style={{
                          backgroundColor: "#30E3DF",
                          marginTop: 10,
                          marginBottom: 10,
                          borderRadius: 5,
                          justifyContent: "space-around",
                          alignItems: "center",
                          flexDirection: "row",
                          minHeight: 70,
                          maxHeight: "auto",
                          shadowColor: "black",
                          elevation: 10,
                        }}
                      >
                        <Image
                          source={Logo}
                          style={{
                            height: 60,
                            width: 60,
                            backgroundColor: "white",
                            borderRadius: 3,
                          }}
                        />
                        <View
                          style={{
                            // backgroundColor: "white",
                            width: 180,
                            margin: 5,
                            minHeight: 70,
                            maxHeight: "auto",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <Text
                            style={{
                              textTransform: "capitalize",
                              fontSize: 15,
                            }}
                          >
                            {item.request}
                          </Text>
                          <Text> Booked dt . {booked}</Text>
                          {item.orderStatus == "accepted" ? (
                            <Text> Visit dt . {visit} </Text>
                          ) : (
                            ""
                          )}
                        </View>
                        <TouchableOpacity
                          style={{
                            backgroundColor: "white",
                            height: 40,
                            width: 60,
                            borderRadius: 3,
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                          onPress={() => {
                            setModalState(true),
                              setModalInfo({
                                item: item,
                                bookedDt: booked,
                                visitDt: visit,
                              });
                          }}
                        >
                          <Text style={{ fontSize: 16 }}>view</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }
                }
              })}

              {/* no bookings */}
            </View>
          )}

          {/* modal info */}
          {modalState == true ? (
            <Modal
              transparent={true}
              style={{ justifyContent: "space-around", alignItems: "center" }}
            >
              <View
                style={{
                  backgroundColor: "#FFFFFFaa",
                  flex: 1,
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#B9F3FC",
                    height: 620,
                    width: 330,
                    justifyContent: "space-around",
                    alignItems: "center",
                    flexDirection: "column",
                    borderRadius: 5,
                    borderColor: "#30E3DF",
                    borderWidth: 2,
                    padding: 8,
                  }}
                >
                  <View
                    style={{
                      // backgroundColor: "green",
                      width: 300,
                      alignItems: "flex-end",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: "white",
                        height: 40,
                        width: 40,
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        setModalState(false);
                      }}
                    >
                      <XMarkIcon color={"#30E3DF"} size={30} />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      //
                      height: 540,
                      width: 300,
                    }}
                  >
                    <ScrollView style={{ marginBottom: 10 }}>
                      {console.log("Model info :", modalInfo)}

                      {modalInfo.item.request ? (
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "space-around",
                          }}
                        >
                          <View
                            style={{
                              justifyContent: "space-around",
                              alignItems: "center",
                            }}
                          >
                            <Image
                              source={Logo}
                              style={{
                                height: 200,
                                width: 200,
                                backgroundColor: "white",
                              }}
                            />
                            <Text style={{ marginTop: 40, fontSize: 16 }}>
                              Personal Request
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 16,
                              textTransform: "capitalize",
                            }}
                          >
                            Requested for . "{modalInfo.item.request}"
                          </Text>
                          <Text style={{ fontSize: 16 }}>
                            Booked dt . {modalInfo.bookedDt}
                          </Text>
                          {modalInfo.item.orderStatus === "pending" ? (
                            <>
                              <Text
                                style={{
                                  fontSize: 16,
                                }}
                              >
                                ------------
                              </Text>
                              <Text style={{ fontSize: 16 }}>
                                Your service is pending{" "}
                              </Text>
                              <Text style={{ fontSize: 16 }}>
                                to be accepted by worker!
                              </Text>
                            </>
                          ) : (
                            <>
                              <Text
                                style={{
                                  fontSize: 16,
                                }}
                              >
                                ------------
                              </Text>
                              <Text style={{ fontSize: 16 }}>
                                Service Provider will{" "}
                              </Text>
                              <Text style={{ fontSize: 16 }}>
                                {" "}
                                visit in {modalInfo.visitDt}
                              </Text>
                            </>
                          )}

                          {modalInfo.item.orderStatus !== "pending" ? (
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-around",
                                alignItems: "center",
                                marginTop: 20,
                                backgroundColor: "white",
                                minWidth: 250,
                                maxWidth: 300,

                                height: 130,
                                borderRadius: 3,
                              }}
                            >
                              {/* worker */}
                              <View
                                style={{
                                  justifyContent: "space-around",
                                  alignItems: "center",
                                }}
                              >
                                <UserIcon size={50} color={"black"} />
                                <Text
                                  style={{
                                    minWidth: 50,
                                    marginLeft: 5,
                                    marginRight: 5,
                                  }}
                                >
                                  {modalInfo.item.worker.profession
                                    ? modalInfo.item.worker.profession
                                    : "profession"}
                                </Text>
                              </View>
                              {/* line */}
                              <View
                                style={{
                                  backgroundColor: "black",
                                  minHeight: 90,
                                  maxHeight: 180,
                                  width: 3,
                                }}
                              ></View>
                              {/* worker info */}
                              <View
                                style={{
                                  padding: 10,
                                  justifyContent: "space-around",
                                  alignItems: "center",
                                }}
                              >
                                <Text>
                                  {modalInfo.item.worker.name
                                    ? modalInfo.item.worker.name
                                    : "worker name"}
                                </Text>

                                <TouchableOpacity
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    backgroundColor: "#30E3DF",
                                    marginTop: 10,
                                    height: 40,
                                    width: 80,
                                    borderRadius: 3,
                                  }}
                                  onPress={() => {
                                    Linking.openURL(
                                      `tel:${modalInfo.item.worker.phone}`
                                    );
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: "white",
                                      fontSize: 16,
                                    }}
                                  >
                                    call
                                  </Text>
                                  <PhoneArrowUpRightIcon
                                    size={30}
                                    color={"white"}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          ) : (
                            ""
                          )}
                        </View>
                      ) : (
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "space-around",
                          }}
                        >
                          <View
                            style={{
                              justifyContent: "space-around",
                              alignItems: "center",
                              flexDirection: "row",
                            }}
                          >
                            <Image
                              source={{
                                uri: modalInfo.item.service.launchedService
                                  .launchedServiceImage[0],
                              }}
                              style={{
                                height: 200,
                                width: 200,
                                backgroundColor: "white",
                              }}
                            />
                          </View>
                          <View
                            style={{
                              justifyContent: "space-around",
                              alignItems: "center",
                              // backgroundColor: "pink",
                              minHeight: 100,
                              maxHeight: 150,
                              margin: 10,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                textTransform: "capitalize",
                                marginTop: 40,
                              }}
                            >
                              Requested for .{" "}
                              {
                                modalInfo.item.service.launchedService
                                  .launchedServiceName
                              }
                            </Text>
                            <Text
                              style={{
                                fontSize: 16,
                              }}
                            >
                              Booked dt . {modalInfo.bookedDt}
                            </Text>
                            {modalInfo.item.visitDate === null ? (
                              <>
                                <Text
                                  style={{
                                    fontSize: 16,
                                  }}
                                >
                                  ------------
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 16,
                                  }}
                                >
                                  Your service is pending{" "}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 16,
                                  }}
                                >
                                  to be accepted by worker!
                                </Text>
                              </>
                            ) : (
                              <>
                                <Text
                                  style={{
                                    fontSize: 16,
                                  }}
                                >
                                  ------------
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 16,
                                  }}
                                >
                                  Service Provider will{" "}
                                </Text>

                                <Text
                                  style={{
                                    fontSize: 16,
                                  }}
                                >
                                  {" "}
                                  visit in {modalInfo.visitDt}
                                </Text>
                              </>
                            )}
                          </View>

                          {modalInfo.item.orderStatus !== "pending" ? (
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-around",
                                alignItems: "center",
                                marginTop: 20,
                                backgroundColor: "white",
                                minWidth: 250,
                                maxWidth: 300,

                                height: 130,
                                borderRadius: 3,
                              }}
                            >
                              {/* worker */}
                              <View
                                style={{
                                  justifyContent: "space-around",
                                  alignItems: "center",
                                }}
                              >
                                <UserIcon size={50} color={"black"} />
                                <Text
                                  style={{
                                    minWidth: 50,
                                    marginLeft: 5,
                                    marginRight: 5,
                                  }}
                                >
                                  {modalInfo.item.worker.profession}
                                </Text>
                              </View>
                              {/* line */}
                              <View
                                style={{
                                  backgroundColor: "black",
                                  minHeight: 90,
                                  maxHeight: 180,
                                  width: 3,
                                }}
                              ></View>
                              {/* worker info */}
                              <View
                                style={{
                                  padding: 10,
                                  justifyContent: "space-around",
                                  alignItems: "center",
                                }}
                              >
                                <Text>{modalInfo.item.worker.name}</Text>

                                <TouchableOpacity
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    backgroundColor: "#30E3DF",
                                    marginTop: 10,
                                    height: 40,
                                    width: 80,
                                    borderRadius: 3,
                                  }}
                                  onPress={() => {
                                    Linking.openURL(
                                      `tel:${modalInfo.item.worker.phone}`
                                    );
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: "white",
                                      fontSize: 16,
                                    }}
                                  >
                                    call
                                  </Text>
                                  <PhoneArrowUpRightIcon
                                    size={30}
                                    color={"white"}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          ) : (
                            ""
                          )}
                        </View>
                      )}
                    </ScrollView>

                    {/* pay */}
                    <View
                      style={{
                        flexDirection: "row",
                        // backgroundColor: "pink",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      {/* cancel */}
                      {modalInfo.item.orderStatus === "pending" ? (
                        <TouchableOpacity
                          style={{
                            backgroundColor: "#30E3DF",
                            height: 60,
                            width: 90,
                            alignItems: "center",
                            justifyContent: "space-around",
                            borderRadius: 4,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: "500",
                              color: "white",
                            }}
                          >
                            CANCEL
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        ""
                      )}

                      {/* delete */}
                      {modalInfo.item.orderStatus === "pending" ? (
                        <TouchableOpacity
                          style={{
                            backgroundColor: "#30E3DF",
                            height: 60,
                            width: 60,
                            alignItems: "center",
                            justifyContent: "space-around",
                            borderRadius: 4,
                          }}
                          onPress={() => deleteMyOrder(modalInfo.item._id)}
                        >
                          <TrashIcon size={30} color={"white"} />
                        </TouchableOpacity>
                      ) : (
                        ""
                      )}
                      {/* pay */}
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#30E3DF",
                          height: 60,
                          width: 80,
                          alignItems: "center",
                          justifyContent: "space-around",
                          borderRadius: 4,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "500",
                            color: "white",
                          }}
                        >
                          PAY
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          ) : (
            ""
          )}
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </>
  );
};

export default UserBookings;
