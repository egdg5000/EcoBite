import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Link } from "expo-router";

const RegistrationScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        console.log('Gebruiker geregistreerd:', { username, email, password });
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/EcoBite2.png')} style={styles.logo} />
            <Text style={styles.title}>Registreren</Text>
            <Text style={styles.subtitle}>Vul uw gegevens in om door te gaan</Text>
            
            <Text style={styles.label}>Gebruikersnaam</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Voer uw gebruikersnaam in" 
                value={username} 
                onChangeText={setUsername} 
            />
            
            <Text style={styles.label}>Email</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Voer uw emailadres in" 
                keyboardType="email-address" 
                value={email} 
                onChangeText={setEmail} 
            />
            
            <Text style={styles.label}>Wachtwoord</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Voer uw wachtwoord in" 
                secureTextEntry 
                value={password} 
                onChangeText={setPassword} 
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



            <TouchableOpacity style={styles.button} onPress={handleRegister}>
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
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 5,
    },
    terms: {
        fontSize: 12,
        color: '#666',
        marginTop: 10,
        textAlign: 'center',
    },
    link: {
        color: '#28a745',
        fontWeight: 'bold',
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
    },
});

export default RegistrationScreen;
