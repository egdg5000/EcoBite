import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CountryFlag from "react-native-country-flag";

const PhoneNumberScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backArrow}>{"<"}</Text>
      </TouchableOpacity>
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
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>{">"}</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(10px)",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  backArrow: {
    fontSize: 24,
    color: "#000",
    fontFamily: "ABeeZee-Regular",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "ABeeZee-Regular",
  },
  label: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
    fontFamily: "ABeeZee-Regular",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  flag: {
    marginRight: 10,
  },
  countryCode: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    fontFamily: "ABeeZee-Regular",
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontFamily: "ABeeZee-Regular",
  },
  submitButton: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 50,
  },
  submitText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    fontFamily: "ABeeZee-Regular",
  },
});

export default PhoneNumberScreen;
