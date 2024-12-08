import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
const AuthLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(sign-in)/sign-in" />
        <Stack.Screen name="(sign-up)/sign-up" />
        <Stack.Screen name="(forgot-password)/forgot-password" />
      </Stack>
      <StatusBar backgroundColor="#ffffff" style="light" />
    </>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
