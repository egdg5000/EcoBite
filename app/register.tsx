import React, { useEffect, useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, KeyboardAvoidingView, Platform, ImageBackground
} from "react-native";
import { Button, Input } from '@rneui/themed';
import { useLocalSearchParams, useRouter } from 'expo-router';

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
        setErrorMessage('');
        return true;
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
        backgroundColor: '#2DBE60',
        padding: 15,
        borderRadius: 10,
        width: '100%',
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