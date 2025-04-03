<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, KeyboardAvoidingView, Platform, ImageBackground
} from "react-native";
import { Button, Input } from '@rneui/themed';
import { useLocalSearchParams, useRouter } from 'expo-router';
=======
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useFonts } from 'expo-font';
import {Button, Input } from '@rneui/themed';
import Toast from 'react-native-toast-message';
>>>>>>> main

const RegisterScreen = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(params.email || '');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (params.email) {
            setEmail(params.email);
        }
    }, [params.email]);

    const validate = () => {
        if (!username || !email || !password) {
            setErrorMessage('Vul alle velden in.');
            return false;
        }
<<<<<<< HEAD
        setErrorMessage('');
        return true;
=======
    
        if (!newemail) {
          setErrorEmail('Voer een email in');
          error = true;
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(newemail)) {
            setErrorEmail('Voer een geldige email in');
            error = true;
          } else setErrorEmail('');
        }
    
        if (!password) {
          setErrorPassword('Voer een wachtwoord in');
          error = true;
        } else {
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
          if (!passwordRegex.test(password)) {
            setErrorPassword('Het wachtwoord moet minstens één hoofdletter, één kleine letter en één cijfer bevatten en moet minstens 8 tekens lang zijn.');
            error = true;
          } else setErrorPassword('');
        }
    
        return !error;
    }

    const throwError = (response: any) => {
        if (response.message === 'Gebruikersnaam en email zijn al in gebruik') {
          setErrorUsername('Gebruikersnaam is al in gebruik');
          setErrorEmail('Email is al in gebruik');
        };
        if (response.message === 'Gebruikersnaam is al in gebruik') setErrorUsername(response.message);
        if (response.message === 'Email is al in gebruik') setErrorEmail(response.message);
    }
    
    const register = async () => {
        if (!validate()) return;
        setLoadingStatus(true);
        const body = JSON.stringify({
          username: username,
          email: newemail,
          password: password,
        })
        const response = await fetch('http://localhost:3000/users/register', {
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
          setRegisterText('Geregistreerd!');
          router.push('/setup');
        } else setRegisterText('Registreren')
        setLoadingStatus(false);
>>>>>>> main
    };

    const register = () => {
        if (!validate()) return;
        console.log('Registreren met:', username, email, password);
    };

    return (
        <ImageBackground source={require('../assets/images/ingredients.jpg')} style={styles.background}>
            <View style={styles.container}>
                <Image source={require('../assets/images/EcoBite2.png')} style={styles.logo} />
                <Text style={styles.title}>Registreren</Text>
                <Text style={styles.subtitle}>Vul uw gegevens in om door te gaan</Text>

<<<<<<< HEAD
                <TextInput
                    style={styles.input}
                    placeholder="Gebruikersnaam"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Wachtwoord"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                
                <TouchableOpacity style={styles.button} onPress={register}>
                    <Text style={styles.buttonText}>Registreren</Text>
                </TouchableOpacity>
=======
              <Button 
                  loading={buttonLoading}
                  containerStyle={{width: '100%'}}
                  buttonStyle={styles.button}
                  onPress={register}
                  title={registerText}/>
              
              <Text style={styles.loginText}>Al een account?
                  <Link href="/login" asChild>
                  <Text style={styles.loginLink}> Inloggen</Text>
              </Link>
              </Text>
>>>>>>> main
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '85%',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 20,
        borderRadius: 12,
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    button: {
<<<<<<< HEAD
        backgroundColor: '#2DBE60',
        padding: 15,
        borderRadius: 10,
        width: '100%',
=======
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
        width: '95%',
        alignSelf: 'center',
>>>>>>> main
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default RegisterScreen;