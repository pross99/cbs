import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { rehydrateUser, signup, login } from "../redux/actions/user.actions";

import {StyleSheet, View, Text, TextInput, Button} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../typings/navigations";

type ScreenNavigationType = NativeStackNavigationProp<
  StackParamList,
  "LoginScreen"
>;


export default function LoginScreen() {

    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch(); // hook to get


async function readPersistedUserInfo() {
    const token = await SecureStore.getItemAsync("idToken");
    const userJson = await SecureStore.getItemAsync("user");
    let user = null;
    if (userJson) {
      user = JSON.parse(userJson);
    }
    if (user) {
      // then we have a priv. login
      // restore the signup by updating the redux store based on usre and token.
      dispatch(rehydrateUser(user, token!));
    }
  }

  const handleLogin = () => {
    dispatch(login(email, password));
}

  useEffect(() => {
    readPersistedUserInfo();
  }, []);

  return ( 
    <View style={styles.container}>
    <Text>Log in to your account </Text>
    <TextInput value={email} placeholder="email" onChangeText={setEmail} />
    <TextInput value={password} placeholder="password" onChangeText={setPassword} />
    <Button title="Login" onPress={() => dispatch(handleLogin)} />
</View>
  ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})