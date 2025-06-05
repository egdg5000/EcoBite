import { Stack } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";
import { ThemeProvider } from "./context/ThemeContext"; 
import './context/i18n';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <Toast />
      </>
    </ThemeProvider>
  );
}
