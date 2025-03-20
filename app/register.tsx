import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig.ts";
import { FirebaseError } from "firebase/app";



const Register = () => {
  const [newemail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [registerText, setRegisterText] = useState("");
  const router = useRouter();

  const validate = () => {
    if (!newemail || !password) {
      setErrorEmail("Vul alle velden in.");
      return false;
    }
    return true;
  };

  const register = async () => {
    if (!validate()) return;
    setLoadingStatus(true);

    try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, newemail, password);
      console.log("Gebruiker geregistreerd:", newemail);
      setRegisterText("Geregistreerd!");
      router.push("/home"); // Controleer of deze route klopt!
    } catch (error: any) {
      setErrorEmail(error.message);
      console.error(error);
    }

    setLoadingStatus(false);
  };

  return (
    <View>
      <Text>Registreer</Text>
      {errorEmail ? <Text style={{ color: "red" }}>{errorEmail}</Text> : null}
      <TextInput
        placeholder="E-mail"
        value={newemail}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Wachtwoord"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={loadingStatus ? "Laden..." : "Registreer"} onPress={register} disabled={loadingStatus} />
      {registerText ? <Text>{registerText}</Text> : null}
    </View>
  );
};

export default Register;

