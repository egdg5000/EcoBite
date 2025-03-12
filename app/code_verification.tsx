import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';

const VerificationScreen = () => {

  const [fontsLoaded] = useFonts({
    'ABeeZee': require('../assets/fonts/ABeeZee.ttf'),
  });

  if (!fontsLoaded) {
    return <View><Text>Loading fonts...</Text></View>;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "ABeeZee",
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
    fontFamily: "ABeeZee",
  },
  input: {
    fontSize: 24,
    textAlign: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#333",
    width: "50%",
    marginBottom: 20,
    fontFamily: "ABeeZee",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 50,
    marginBottom: 20,
  },
  submitText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    fontFamily: "ABeeZee",
  },
  resendButton: {
    padding: 10,
    borderRadius: 5,
  },
  disabledButton: {
    opacity: 0.5, // Maak de knop minder zichtbaar als deze tijdelijk is uitgeschakeld
  },
  resendText: {
    fontSize: 16,
    color: "#4CAF50",
    textDecorationLine: "underline",
    fontFamily: "ABeeZee",
  },
});

export default VerificationScreen;