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
import { MicrophoneIcon } from "react-native-heroicons/outline";

const FunctionalPage = ({ route }) => {
  const navigation = useNavigation();

  const backAction = () => {
    navigation.navigate("UserNav");
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${pageName}`,
      headerStyle: {
        backgroundColor: "#B9F3FC",
      },
      headerTitleStyle: {
        color: "black",
      },
    });
  }, []);

  const { pageName } = route.params;

  const userToken = useSelector((state) => state.user).token;

  if (pageName === "About") {
    return (
      <>
        <View style={{ justifyContent: "space-around", alignItems: "center" }}>
          <View
            style={{
              width: 300,
              height: 650,
              backgroundColor: "white",
              margin: 70,
              padding: 30,
              borderRadius: 5,
              shadowColor: "black",
              elevation: 20,
            }}
          >
            <Image source={Logo} style={{ height: 100, width: 100 }} />
            <Text style={{ marginTop: 30, fontSize: 17, fontWeight: "300" }}>
              ReCreate is an application which provide services to local people
              in which we are mediator between a customer/user and a worker.
            </Text>

            <Text style={{ marginTop: 30, fontSize: 17, fontWeight: "300" }}>
              Local workers like Electrician , A.C. repairer , Geyser repairer ,
              Water purifier repairer , painter , Carpenter , Plumber etc will
              connect to our application for providing their services.
            </Text>
            <Text style={{ marginTop: 30, fontSize: 17, fontWeight: "300" }}>
              Local people before joining our system , had to search for these
              helpers , workers but , after joining our system , will get the
              services at the door step.
            </Text>
          </View>
        </View>
      </>
    );
  }

  if (pageName === "Terms and Conditions") {
    return (
      <>
        <View
          style={{
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: "grey",
              fontSize: 16,
              fontWeight: "500",
              padding: 20,
            }}
          >
            You agree and undertake to use the Website and the Service only for
            legal purposes and not to perform any illegal activity. By way of
            example, and not as a limitation, you agree and undertake that when
            using a Service, you will not:
          </Text>
          <ScrollView
            style={{
              width: 380,
              //   marginBottom: 40,
              //   padding: 20,
              height: 600,
              borderRadius: 5,
            }}
            indicatorStyle="white"
          >
            <View style={{ padding: 20 }}>
              <Text
                style={{
                  backgroundColor: "#30E3DF",
                  margin: 10,
                  padding: 20,
                  borderRadius: 5,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                {" "}
                Defame, abuse, harass, stalk, threaten or otherwise violate the
                legal rights of others;
              </Text>
              <Text
                style={{
                  backgroundColor: "#30E3DF",
                  margin: 10,
                  padding: 20,
                  borderRadius: 5,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                Publish, post, upload, distribute or disseminate any
                inappropriate, profane, defamatory, infringing, obscene,
                indecent or unlawful topic, name, material or information;
              </Text>
              <Text
                style={{
                  backgroundColor: "#30E3DF",
                  margin: 10,
                  padding: 20,
                  borderRadius: 5,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                Upload files that contain software or other material protected
                by intellectual property laws unless you own or control the
                rights thereto or have received all necessary consents;
              </Text>
              <Text
                style={{
                  backgroundColor: "#30E3DF",
                  margin: 10,
                  padding: 20,
                  borderRadius: 5,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                Upload or distribute files that contain viruses, corrupted
                files, or any other similar software or programs that may damage
                the operation of the Website or another's computer;
              </Text>
              <Text
                style={{
                  backgroundColor: "#30E3DF",
                  margin: 10,
                  padding: 20,
                  borderRadius: 5,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                Conduct or forward surveys, contests, pyramid schemes or chain
                letters;
              </Text>
              <Text
                style={{
                  backgroundColor: "#30E3DF",
                  margin: 10,
                  padding: 20,
                  borderRadius: 5,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                Download any file posted by another user of a Service that you
                know, or reasonably should know, cannot be legally distributed
                in such manner;
              </Text>
              <Text
                style={{
                  backgroundColor: "#30E3DF",
                  margin: 10,
                  padding: 20,
                  borderRadius: 5,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                Falsify or delete any author attributions, legal or other proper
                notices or proprietary designations or labels of the origin or
                source of software or other material contained in a file that is
                uploaded;
              </Text>
              <Text
                style={{
                  backgroundColor: "#30E3DF",
                  margin: 10,
                  padding: 20,
                  borderRadius: 5,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                Violate any code of conduct or other guidelines, which may be
                applicable for or to any particular Service;
              </Text>
              <Text
                style={{
                  backgroundColor: "#30E3DF",
                  margin: 10,
                  padding: 20,
                  borderRadius: 5,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                Violate any applicable laws or regulations for the time being in
                force in or outside India
              </Text>
              <Text
                style={{
                  backgroundColor: "#30E3DF",
                  margin: 10,
                  padding: 20,
                  borderRadius: 5,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                Violate any of the terms and conditions of this Agreement or any
                other terms and conditions for the use of the Website contained
                elsewhere herein.
              </Text>
              <Text
                style={{
                  backgroundColor: "#30E3DF",
                  margin: 10,
                  padding: 20,
                  borderRadius: 5,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                Exploit any of the services. We reserve the right to deprive
                individual customers of our Cash on Delivery payment option.
                Moreover, we might refuse any of our services, terminate
                accounts, and/or cancel orders at our discretion, including but
                not limited to, if we believe that customer conduct violates
                applicable law or is harmful to our interests.
              </Text>
              <Text
                style={{
                  backgroundColor: "#30E3DF",
                  margin: 10,
                  padding: 20,
                  borderRadius: 5,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                You shall not make any derogatory, defamatory, abusive,
                inappropriate, profane or indecent statement/s and/or comment/s
                about ReCreate, its associates and partners on any property
                owned by ReCreate.
              </Text>
              <Text
                style={{
                  backgroundColor: "#30E3DF",
                  margin: 10,
                  padding: 20,
                  borderRadius: 5,
                  shadowColor: "black",
                  elevation: 15,
                  marginBottom: 20,
                }}
              >
                ou will not perform any illegal activity while using the Website
                or availing any of our services.
              </Text>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }

  if (pageName === "Customer Support") {
    return (
      <>
        <View style={{ justifyContent: "space-around", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: "white",
              marginTop: 30,
              marginBottom: 30,
              justifyContent: "space-around",
              alignItems: "center",
              width: 330,
              height: 280,
              borderRadius: 5,
              shadowColor: "black",
              elevation: 15,
            }}
          >
            <MicrophoneIcon size={40} color={"#B9F3FC"} />
            <Text style={{ fontSize: 20 }}>Add your complaint:</Text>
            <TextInput
              style={{
                fontSize: 17,
                backgroundColor: "white",
                width: 250,
                minHeight: 50,
                maxHeight: 100,
                borderRadius: 5,
                padding: 10,
                borderColor: "#30E3DF",
                borderWidth: 2,
              }}
              multiline={true}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                marginBottom: 13,
                height: 40,
                width: 150,
                alignItems: "center",
                justifyContent: "space-around",
                borderRadius: 5,
                borderColor: "#30E3DF",
                borderWidth: 2,
              }}
            >
              <Text style={{ fontWeight: "500" }}>submit complaint</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView>{/* tokens */}</ScrollView>
      </>
    );
  }

  if (pageName === "Privacy Policy") {
    return (
      <>
        <View style={{ justifyContent: "space-around", alignItems: "center" }}>
          <ScrollView
            style={{
              width: 350,
              marginTop: 40,
              marginBottom: 40,
            }}
            indicatorStyle="white"
          >
            <View
              style={{
                backgroundColor: "#30E3DF",
                padding: 20,
                margin: 10,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 13,
                  color: "white",
                  fontWeight: "600",
                }}
              >
                Jurisdiction, User Account, Password, and Security:
              </Text>
              <Text style={{ fontSize: 17, fontWeight: "300" }}>
                The Services available on this Website is only available to
                users residing within India. You will receive a password and
                account designation upon completing the Website's registration
                process. You are responsible for maintaining the confidentiality
                of the password and account, and are fully responsible for all
                activities that occur using your password or account. You agree
                to (a) immediately notify ReCreate of any unauthorized use of
                your password or account or any other breach of security, and
                (b) ensure that you exit from your account at the end of each
                session. ReCreate cannot and will not be liable for any loss or
                damage arising from your failure to comply with this clause.
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#30E3DF",
                padding: 20,
                margin: 10,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 13,
                  color: "white",
                  fontWeight: "600",
                }}
              >
                Services Offered:
              </Text>
              <Text style={{ fontSize: 17, fontWeight: "300" }}>
                ReCreate provides a number of Internet-based services through
                the website (all such services, collectively, the "Service").
                One such service enables users to purchase original merchandise
                such as footwear and accessories from various fashion and
                lifestyle brands. (Collectively, "Products"). Upon placing an
                order, myurbancountry.com shall ship the product to you and be
                entitled to its payment for the Services.
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#30E3DF",
                padding: 20,
                margin: 10,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 13,
                  color: "white",
                  fontWeight: "600",
                }}
              >
                Other Policies:
              </Text>
              <Text style={{ fontSize: 17, fontWeight: "300" }}>
                The User hereby consents, expresses and agrees that he has read
                and fully understands the Privacy Policy of myurbancountry.com,
                the Website. The user further consents that the terms and
                contents of such Privacy Policy are acceptable to him. The User
                also agrees that he has read and understood the ordering policy,
                payment policy, Shipping and tracking terms , Returns and
                Exchange Policy , promotional offer terms, registration
                requirement and other terms and policies published on the
                Website and fully accepts these terms.
              </Text>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }

  if (pageName === "User orders") {
    return (
      <>
        <View>
          <Text>USer orders</Text>
        </View>
      </>
    );
  }

  if (pageName === "User payments") {
    return (
      <>
        <View>
          <Text>USer payments</Text>
        </View>
      </>
    );
  }
};

export default FunctionalPage;
