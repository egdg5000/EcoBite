import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CountryFlag from "react-native-country-flag";
import { useFonts } from 'expo-font';

  

const PhoneNumberScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const [fontsLoaded] = useFonts({
    'ABeeZee': require('../assets/fonts/ABeeZee.ttf'),
  });

  if (!fontsLoaded) {
    return <View><Text>Loading fonts...</Text></View>;
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backArrow}>{"<"}</Text>
      </TouchableOpacity>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>Vul uw mobiele nummer in</Text>
        <Text style={styles.label}>Mobiele nummer</Text>
        <View style={styles.inputContainer}>
          <CountryFlag isoCode="NL" size={25} style={styles.flag} />
          <Text style={styles.countryCode}>+31</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            placeholder=""
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>{">"}</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 80,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(10px)",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  backArrow: {
    fontSize: 32,
    color: "#333",
    fontFamily: "ABeeZee",
  },
  contentWrapper: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "ABeeZee",
  },
  label: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
    fontFamily: "ABeeZee",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 10,
  },
  flag: {
    marginRight: 10,
  },
  countryCode: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    fontFamily: "ABeeZee",
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontFamily: "ABeeZee",
  },
  submitButton: {
    position: "absolute",
    bottom: 50,
    right: 20,
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 50,
  },
  submitText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    fontFamily: "ABeeZee",
  },
});

export default PhoneNumberScreen;
