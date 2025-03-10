import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';

const VerificationScreen = ({ route }) => {
  const { verificationId, phoneNumber } = route.params;
  const [code, setCode] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false); // Om de knop tijdelijk uit te schakelen
  const [newVerificationId, setNewVerificationId] = useState(verificationId);
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    'ABeeZee': require('../assets/fonts/ABeeZee.ttf'),
  });

  if (!fontsLoaded) {
    return <View><Text>Loading fonts...</Text></View>;
  }

  const confirmCode = async () => {
    try {
      const credential = auth.PhoneAuthProvider.credential(newVerificationId, code);
      await auth().signInWithCredential(credential);
      Alert.alert("Succes", "Je bent ingelogd!");
      router.push('/phonenumber'); // Ga naar de homepagina
    } catch (error) {
      Alert.alert("Fout", "De code is incorrect. Probeer opnieuw.");
    }
  };

  const resendCode = async () => {
    try {
      setResendDisabled(true); // Schakel de knop tijdelijk uit
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setNewVerificationId(confirmation.verificationId);
      Alert.alert("Verzonden", "Een nieuwe code is verstuurd.");
    } catch (error) {
      Alert.alert("Fout", "Kan geen nieuwe code verzenden.");
      setResendDisabled(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vul uw 4-cijferige code in</Text>
      <Text style={styles.subtitle}>Uw code is verzonden naar uw telefoon</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        maxLength={4}
        placeholder="- - - -"
        value={code}
        onChangeText={setCode}
      />
      <TouchableOpacity style={styles.submitButton} onPress={confirmCode}>
        <Text style={styles.submitText}>{">"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.resendButton, resendDisabled && styles.disabledButton]}
        onPress={resendCode}
        disabled={resendDisabled}
      >
        <Text style={styles.resendText}>Verzend opnieuw</Text>
      </TouchableOpacity>
    </View>
  );
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