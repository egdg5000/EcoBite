import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Link } from "expo-router";
import { useFonts } from 'expo-font';
import {Button, Input } from '@rneui/themed';

const RegistrationScreen = () => {
    const [errorMessageEmail, setErrorEmail] = useState('')
    const [errorMessageUsername, setErrorUsername] = useState('')
    const [errorMessagePassword, setErrorPassword] = useState('')
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerText, setRegisterText] = useState('Register');
    const [buttonLoading, setLoadingStatus] = useState(false);
    

    const [fontsLoaded] = useFonts({
        'ABeeZee': require('../assets/fonts/ABeeZee.ttf'),
      });

    const validate = () => {
        let error = false;
    
        if (!username) {
          setErrorUsername('Please enter a username');
          error = true;
        } else {
          setErrorUsername('');
        }
    
        if (!email) {
          setErrorEmail('Please enter an email');
          error = true;
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            setErrorEmail('Please enter a valid email address');
            error = true;
          } else setErrorEmail('');
        }
    
        if (!password) {
          setErrorPassword('Please enter a password');
          error = true;
        } else {
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
          if (!passwordRegex.test(password)) {
            setErrorPassword('Password must contain at least one uppercase letter, one lowercase letter and a number, and must be at least 8 characters long.');
            error = true;
          } else setErrorPassword('');
        }
    
        return !error;
    }

    const throwError = (response: any) => {
        if (response.message === 'Username and email already in use') {
          setErrorUsername('Username already in use');
          setErrorEmail('Email already in use');
        };
        if (response.message === 'Username already in use') setErrorUsername(response.message);
        if (response.message === 'Email already in use') setErrorEmail(response.message);
    }
    
    const register = async () => {
        if (!validate()) return;
        setLoadingStatus(true);
        const body = JSON.stringify({
          username: username,
          email: email,
          password: password,
        })
        const response = await fetch('http://localhost:3000/users/register', {
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
          setRegisterText('Registered!');
        } else setRegisterText('Register')
        setLoadingStatus(false);
    };
    
    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/EcoBite2.png')} style={styles.logo} />
            <Text style={styles.title}>Registreren</Text>
            <Text style={styles.subtitle}>Vul uw gegevens in om door te gaan</Text>
            
            <Text style={styles.label}>Gebruikersnaam</Text>
            <Input 
                id='username'
                style={[styles.input]}
                placeholder="Username"
                placeholderTextColor="black"
                value={username}
                onChangeText={setUsername}
                errorMessage={errorMessageUsername}
                renderErrorMessage={true}
                errorStyle={{marginLeft: '20%'}}
                inputContainerStyle={{
                  width: '100%',
                  borderBottomColor:'transparent',
                  alignSelf: 'center'
                }}
            />
            
            <Text style={styles.label}>Email</Text>
            <Input 
                id='email'
                style={[styles.input]}
                placeholder="Email"
                placeholderTextColor="black"
                value={email}
                onChangeText={setEmail}
                errorMessage={errorMessageEmail}
                renderErrorMessage={true}
                errorStyle={{marginLeft: '20%'}}
                inputContainerStyle={{
                  width: '100%',
                  borderBottomColor:'transparent',
                  alignSelf: 'center'
                }}
            />
            
            <Text style={styles.label}>Wachtwoord</Text>
            <Input 
                id='password'
                style={[styles.input]}
                placeholder="Password"
                placeholderTextColor="black"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                renderErrorMessage={true}
                errorStyle={{marginLeft: '20%'}}
                errorMessage={errorMessagePassword}
                inputContainerStyle={{
                  width: '100%',
                  borderBottomColor:'transparent',
                  alignSelf: 'center'
                }}
            />
            
            <Link href="/terms" asChild>
                <TouchableOpacity>
                    <Text style={styles.link}>Servicevoorwaarden</Text>
                </TouchableOpacity>
            </Link>

            <Link href="/privacy_policy" asChild>
                <TouchableOpacity>
                    <Text style={styles.link}>Privacybeleid</Text>
                </TouchableOpacity>
            </Link>

            {/* <Button 
                loading={buttonLoading}
                buttonStyle={styles.button}
                onPress={register}
                title={registerText}/> */}
            
            <TouchableOpacity style={styles.button} onPress={register}>
                <Text style={styles.buttonText}>Registreren</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        fontFamily: 'ABeeZee', 
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
        fontFamily: 'ABeeZee', 
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
        fontFamily: 'ABeeZee', 
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 5,
        fontFamily: 'ABeeZee', 
    },
    link: {
        color: '#28a745',
        fontWeight: 'bold',
        fontFamily: 'ABeeZee', 
    },
    button: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'ABeeZee', 
    },
});

export default RegistrationScreen;