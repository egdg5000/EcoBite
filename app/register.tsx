import React, { useState } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, KeyboardAvoidingView, Platform, ImageBackground
} from "react-native";
import { Button, Input } from '@rneui/themed';
import { useLocalSearchParams, useRouter } from 'expo-router';

const RegisterScreen = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    console.log("Params:", params); // Debugging

    const [email, setEmail] = useState(params.email ?? "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const validate = () => {
        if (!email || !password || !confirmPassword) {
            setErrorMessage("Vul alle velden in.");
            return false;
        }
        if (password !== confirmPassword) {
            setErrorMessage("Wachtwoorden komen niet overeen.");
            return false;
        }
        setErrorMessage("");
        return true;
    };

    const register = () => {
        if (!validate()) return;
        console.log("Registreren met:", email, password);
        // Hier kan Firebase-authenticatie worden toegevoegd
    };

    return (
        <ImageBackground source={require('../assets/images/ingredients.jpg')} style={styles.background}>
            <View style={styles.overlay} />
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <View style={styles.innerContainer}>
                        <Image source={require('../assets/images/EcoBite2.png')} style={styles.logo} />
                        <Text style={styles.title}>Registreren</Text>
                        <Text style={styles.subtitle}>Maak een nieuw account aan</Text>

                        {/* Witte achtergrond voor invoervelden */}
                        <View style={styles.inputContainer}>
                            <Input
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                inputStyle={styles.inputText}
                            />

                            <Input
                                placeholder="Wachtwoord"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                inputStyle={styles.inputText}
                            />

                            <Input
                                placeholder="Bevestig wachtwoord"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                                inputStyle={styles.inputText}
                            />
                        </View>

                        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

                        <Button buttonStyle={styles.registerButton} onPress={register} title="Registreren" />

                        <Text style={styles.loginText}>Al een account?
                            <TouchableOpacity onPress={() => router.push('/login')}>
                                <Text style={styles.loginLink}> Inloggen</Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: { flex: 1, resizeMode: 'cover', justifyContent: 'center' },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparante witte laag
    },
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    innerContainer: { width: '85%', alignItems: 'center' },
    logo: { width: 120, height: 120, marginBottom: 25 },
    title: { fontSize: 28, fontWeight: "bold", color: "#333" },
    subtitle: { fontSize: 16, color: "#666", marginBottom: 25 },
    errorMessage: { color: 'red', marginBottom: 12, fontSize: 16 },
    inputContainer: { 
        backgroundColor: "#FFF",
        padding: 25,
        borderRadius: 12,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    inputText: { fontSize: 18 },
    registerButton: { backgroundColor: '#2DBE60', borderRadius: 10, width: '100%', marginTop: 12, height: 50 },
    loginText: { marginTop: 22, color: "#666", fontSize: 16 },
    loginLink: { color: "#2DBE60", fontWeight: "bold", fontSize: 16 },
});

export default RegisterScreen;