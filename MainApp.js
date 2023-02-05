import { StatusBar } from "expo-status-bar";
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

// screen manager ~ routes
const Stack = createNativeStackNavigator();
// primary color : #1C82AD

const MainApp = () => {
  const userToken = useSelector((state) => state.user).token;
  console.log("userToken: ", userToken);
  const workerToken = useSelector((state) => state.worker).token;
  console.log("workerToken: ", workerToken);

  if (userToken !== "" || workerToken !== "") {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Onboard" component={OnboardScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="UserSignup" component={UserSignupScreen} />
          <Stack.Screen name="WorkerSignup" component={WorkerSignupScreen} />
          <Stack.Screen name="Forgotpassword" component={ForgotScreen} />
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
          <Stack.Screen name="UserSignup" component={UserSignupScreen} />
          <Stack.Screen name="WorkerSignup" component={WorkerSignupScreen} />
          <Stack.Screen name="Forgotpassword" component={ForgotScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default MainApp;
