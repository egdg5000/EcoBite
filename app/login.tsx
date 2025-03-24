import React, { useState } from "react";
import {
    View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, KeyboardAvoidingView, Platform} from "react-native";
import {Button, Input } from '@rneui/themed';
import { Link, useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

const LoginScreen = () => {
    const router = useRouter();
    const [errorMessageUsername, setErrorUsername] = useState('')
    const [errorMessagePassword, setErrorPassword] = useState('')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secureText, setSecureText] = useState(true);
    const [loginText, setLoginText] = useState('Inloggen');
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
        if (response.message === 'Username or email not found') setErrorUsername('Gebruikersnaam of mailadres niet gevonden');
        if (response.message === 'Incorrect password') setErrorPassword('Onjuist wachtwoord');
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
          credentials: 'include',
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
          setLoginText('Successvol ingelogd!');
          router.push('/home');
        } else setLoginText('Inloggen')
        setLoadingStatus(false);
      };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
            <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View style={styles.container}>
                    {/* Titel */}
                    <Image source={require('../assets/images/EcoBite2.png')} style={styles.logo} />
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
                        placeholderTextColor="#777"
                        errorMessage={errorMessageUsername}
                        renderErrorMessage={true}
                        inputContainerStyle={{
                            width: '100%',
                            borderBottomWidth:0,
                            alignSelf: 'center'
                        }}
                    />

                    {/* Wachtwoord Input */}
                    <View style={styles.passwordContainer}>
                        <Input id='password'
                            style={styles.input}
                            placeholderTextColor="#777"
                            secureTextEntry={true}
                            value={password}
                            renderErrorMessage={true}
                            errorMessage={errorMessagePassword}
                            inputContainerStyle={{
                                width: '100%',
                                borderBottomWidth:0,
                            }}
                            placeholder="Wachtwoord"
                            onChangeText={setPassword}
                        />
                    </View>

                    {/* Wachtwoord Vergeten */}
                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Wachtwoord vergeten?</Text>
                    </TouchableOpacity>

                    <Button
                        loading={buttonLoading}
                        containerStyle={{width: '100%'}}
                        buttonStyle={styles.loginButton}
                        onPress={login}
                        title={loginText}
                    />

                    {/* Registreren Link */}
                    <Text style={styles.registerText}>Geen account?
                        <Link href="/register" asChild>
                            <Text style={styles.registerLink}> Registreren</Text>
                        </Link>
                    </Text>
                </View>
            </KeyboardAvoidingView>
            <View style={{marginTop:130}}></View>
        </SafeAreaView>
    );
};

// Stijlen
const styles = StyleSheet.create({
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
        backgroundColor: '#2DBE60',
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
});

export default LoginScreen;
