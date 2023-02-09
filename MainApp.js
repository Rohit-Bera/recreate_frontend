import { StyleSheet, Text, View } from "react-native";
// navigation center for android
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { useSelector } from "react-redux";

// screens
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

import OnboardScreen from "./screens/OnboardScreen";
import ForgotScreen from "./screens/ForgotpassScreen";
import AdminDashboard from "./screens/AdminDashboard";
import UserSignupScreen from "./screens/UserSignupScreen";
import WorkerSignupScreen from "./screens/WorkerSignupScreen";
import UserServices from "./components/user/UserServices";
import UserBookings from "./components/user/UserBookings";
import UserRewards from "./components/user/UserRewards";
import UserAccount from "./components/user/UserAccount";
import WorkerRequests from "./components/worker/WorkerRequests";
import WorkerAcceptedRequests from "./components/worker/WorkerAcceptedRequests";
import WorkerPayment from "./components/worker/WorkerPayments";
import WorkerAccount from "./components/worker/WorkerAccount";

// screen manager ~ routes
const Stack = createNativeStackNavigator();
// primary color : #1C82AD

const MainApp = () => {
  const userToken = useSelector((state) => state.user).token;
  console.log("userToken: ", userToken);
  const workerToken = useSelector((state) => state.worker).token;
  console.log("workerToken: ", workerToken);
  const adminToken = useSelector((state) => state.admin).token;
  console.log("adminToken: ", adminToken);

  if (userToken !== "" || workerToken !== "") {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Onboard" component={OnboardScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Forgotpassword" component={ForgotScreen} />

          {/* user home page */}
          <Stack.Screen name="UserSignup" component={UserSignupScreen} />
          <Stack.Screen name="UserServices" component={UserServices} />
          <Stack.Screen name="UserBookings" component={UserBookings} />
          <Stack.Screen name="UserRewards" component={UserRewards} />
          <Stack.Screen name="UserAccount" component={UserAccount} />
          <Stack.Screen name="WorkerSignup" component={WorkerSignupScreen} />

          {/* homepage of worker */}
          <Stack.Screen name="WorkerRequests" component={WorkerRequests} />
          <Stack.Screen
            name="WorkerAccepted"
            component={WorkerAcceptedRequests}
          />
          <Stack.Screen name="WorkerPayment" component={WorkerPayment} />
          <Stack.Screen name="WorkerAccount" component={WorkerAccount} />

          {/* admin home page */}
          <Stack.Screen name="theOwnerAdmin" component={AdminDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Onboard" component={OnboardScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Forgotpassword" component={ForgotScreen} />

          {/* user home page */}
          <Stack.Screen name="UserSignup" component={UserSignupScreen} />
          <Stack.Screen name="UserServices" component={UserServices} />
          <Stack.Screen name="UserBookings" component={UserBookings} />
          <Stack.Screen name="UserRewards" component={UserRewards} />
          <Stack.Screen name="UserAccount" component={UserAccount} />
          <Stack.Screen name="WorkerSignup" component={WorkerSignupScreen} />

          {/* homepage of worker */}
          <Stack.Screen name="WorkerRequests" component={WorkerRequests} />
          <Stack.Screen
            name="WorkerAccepted"
            component={WorkerAcceptedRequests}
          />
          <Stack.Screen name="WorkerPayment" component={WorkerPayment} />
          <Stack.Screen name="WorkerAccount" component={WorkerAccount} />

          {/* admin home page */}
          <Stack.Screen name="theOwnerAdmin" component={AdminDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default MainApp;
