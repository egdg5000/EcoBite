import React, { useState } from "react";
import {
    View, Text, TouchableOpacity, StyleSheet
} from "react-native";
import {Button, Input } from '@rneui/themed';
import { Link } from 'expo-router';
import { useFonts } from 'expo-font';

const LoginScreen = () => {
    const [errorMessageUsername, setErrorUsername] = useState('')
    const [errorMessagePassword, setErrorPassword] = useState('')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secureText, setSecureText] = useState(true);
    const [loginText, setLoginText] = useState('Login');
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
      }
    
      const throwError = (response: any) => {
        if (response.message === 'Username or email not found') setErrorUsername(response.message);
        if (response.message === 'Incorrect password') setErrorPassword(response.message);
      }
    
      const login = async () => {
        if (!validate()) return;
        setLoadingStatus(true);
        const body = JSON.stringify({
          username: email,
          password: password,
        })
        const response = await fetch('http://localhost:3000/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body
        });
        
        const data = await response.json();
        if (!response.ok) {
          throwError(data);
        }
        if (data.success){
          setLoginText('Logged in!');
        } else setLoginText('Login')
        setLoadingStatus(false);
      };

    return (
        <View style={styles.container}>
            {/* Titel */}
            <Text style={styles.title}>Inloggen</Text>
            <Text style={styles.subtitle}>Vul uw email en wachtwoord in</Text>

            {/* Email Input */}
            <Input
                style={styles.input}
                placeholder="Email of gebruikersnaam"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                id='username'
                placeholderTextColor="black"
                errorMessage={errorMessageUsername}
                renderErrorMessage={true}
                inputContainerStyle={{
                    width: '100%',
                    borderBottomColor:'transparent',
                    alignSelf: 'center'
                }}
            />

            {/* Wachtwoord Input */}
            <View style={styles.passwordContainer}>
                <Input id='password'
                    style={styles.input}
                    placeholderTextColor="black"
                    secureTextEntry={true}
                    value={password}
                    renderErrorMessage={true}
                    errorMessage={errorMessagePassword}
                    inputContainerStyle={{
                        width: '100%',
                        borderBottomColor:'transparent',
                    }}
                    placeholder="Wachtwoord"
                    onChangeText={setPassword}
                    rightIcon={
                        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                            <Text style={styles.toggleText}>{secureText ? "show" : "hide"}</Text>
                        </TouchableOpacity>
                    }
                />
            </View>

            {/* Wachtwoord Vergeten */}
            <TouchableOpacity>
                <Text style={styles.forgotPassword}>Wachtwoord vergeten?</Text>
            </TouchableOpacity>

            <Button
                loading={buttonLoading}
                buttonStyle={styles.loginButton}
                onPress={login}
                title={loginText}
            />

            {/* Registreren Link */}
            <Link href="/register" asChild>
                <Text style={styles.registerText}>
                    Geen account? <Text style={styles.registerLink}>Registreren</Text>
                </Text>
            </Link>
        </View>
    );
};

// Stijlen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#F5F5F5",
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
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        marginBottom: 15,
        fontFamily: 'ABeeZee', 
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
    },
    loginButton: {
        backgroundColor: "#4CAF50",
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 10,
        paddingHorizontal: 130,
    },
    loginButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: 'ABeeZee', 
    },
    registerText: {
        marginTop: 20,
        color: "#666",
        fontFamily: 'ABeeZee', 
    },
    registerLink: {
        color: "#007BFF",
        fontWeight: "bold",
        fontFamily: 'ABeeZee', 
    },
    errorMessage: {
        flex: 1,
        backgroundColor: 'blue',
        width: '100%',
        fontFamily: 'ABeeZee', 
    },
});

export default LoginScreen;
