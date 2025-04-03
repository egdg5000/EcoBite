import React, { useState } from "react";
import {
    View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, KeyboardAvoidingView, Platform
} from "react-native";
import { Button, Input } from '@rneui/themed';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useFonts } from 'expo-font';
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    console.log("Params:", params); // Debugging
    const [email, setEmail] = useState(params.email ?? ""); 
    const [password, setPassword] = useState("");
    const [errorMessageUsername, setErrorUsername] = useState('');
    const [errorMessagePassword, setErrorPassword] = useState('');
    const [buttonLoading, setLoadingStatus] = useState(false);

    const [fontsLoaded] = useFonts({
        'ABeeZee': require('../assets/fonts/ABeeZee.ttf'),
    });

    const validate = () => {
        let error = false;
        if (!email) {
            setErrorUsername('Voer een email of gebruikersnaam in');
            error = true;
        } else {
            setErrorUsername('');
        }
        if (!password) {
            setErrorPassword('Voer een wachtwoord in');
            error = true;
        } else setErrorPassword('');

        return !error;
    };

    const throwError = (response) => {
        if (response.message === 'Gebruikersnaam of mailadres niet gevonden') setErrorUsername(response.message);
        if (response.message === 'Onjuist wachtwoord') setErrorPassword(response.message);
    };

    const login = async () => {
        if (!validate()) return;
        setLoadingStatus(true);
        try {
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: email, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                throwError(data);
            } else if (data.success) {
                router.push('/home');
            }
        } catch (error) {
            console.error('Fout bij inloggen:', error);
        } finally {
            setLoadingStatus(false);
        }
    };

    const navigateToRegister = () => {
        router.push(`/register?email=${encodeURIComponent(email)}`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View style={styles.innerContainer}>
                    {/* Nieuw logo + slogan */}
                    <Image source={require('../assets/images/EcoBite2.png')} style={styles.logo} />
                    <Text style={styles.slogan}>Verminder uw voedselverspilling</Text>

                    <Text style={styles.title}>Inloggen</Text>
                    <Text style={styles.subtitle}>Vul uw email en wachtwoord in</Text>

                    <Input
                        placeholder="Email of gebruikersnaam"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        errorMessage={errorMessageUsername}
                    />

                    <Input
                        placeholder="Wachtwoord"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        errorMessage={errorMessagePassword}
                    />

<<<<<<< HEAD
                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Wachtwoord vergeten?</Text>
                    </TouchableOpacity>
=======
                    {/* Wachtwoord Vergeten */}
                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>
                        <Link href="/forgot_password" asChild>
                            <Text style={styles.forgotPassword}>Wachtwoord vergeten?</Text>
                        </Link>
                    </Text>
                </TouchableOpacity>
>>>>>>> main

                    <Button loading={buttonLoading} buttonStyle={styles.loginButton} onPress={login} title="Inloggen" />

                    <Text style={styles.registerText}>Geen account?
                        <TouchableOpacity onPress={navigateToRegister}>
                            <Text style={styles.registerLink}> Registreren</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
<<<<<<< HEAD
    container: { flex: 1, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
    innerContainer: { width: '80%', alignItems: 'center' },
    logo: { width: 120, height: 120, marginBottom: 10 }, // Groter logo
    slogan: { fontSize: 18, fontWeight: "bold", color: "#2DBE60", marginBottom: 20, textAlign: "center" }, // Slogan groen en gecentreerd
    title: { fontSize: 26, fontWeight: "bold", color: "#333" },
    subtitle: { fontSize: 16, color: "#666", marginBottom: 20 },
    forgotPassword: { alignSelf: "flex-end", color: "#007BFF", marginBottom: 20 },
    loginButton: { backgroundColor: '#2DBE60', borderRadius: 10, width: '100%', height: 50 },
    registerText: { marginTop: 20, color: "#666", fontSize: 16 },
    registerLink: { color: "#2DBE60", fontWeight: "bold", fontSize: 16 }, // Groen gemaakt
=======
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'flex-end'
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        fontFamily: 'ABeeZee', 
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        marginBottom: 20,
        fontFamily: 'ABeeZee', 
    },
    input: {
        backgroundColor: '#F5F5F5',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 8,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '100%',
        marginTop: 5,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    toggleText: {
        fontSize: 16,
        color: "#666",
        fontFamily: 'ABeeZee', 
    },
    forgotPassword: {
        alignSelf: "flex-end",
        color: "#007BFF",
        marginBottom: 20,
        fontWeight: "bold"
    },
    loginButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
        width: '95%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: "white",
        fontSize: 18,
        fontFamily: 'ABeeZee', 
    },
    registerText: {
        marginTop: 20,
        color: "#666",
        fontFamily: 'ABeeZee', 
    },
    registerLink: {
        color: "#007BFF",
        fontFamily: 'ABeeZee', 
        fontWeight: "bold"
    },
    errorMessage: {
        flex: 1,
        backgroundColor: 'blue',
        width: '100%',
        fontFamily: 'ABeeZee', 
    },
>>>>>>> main
});

export default LoginScreen;