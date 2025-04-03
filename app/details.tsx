import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

export default function AccountDetailsPage({ }) {
    const router = useRouter();
    const [fontsLoaded] = useFonts({
        'ABeeZee': require('../assets/fonts/ABeeZee.ttf'),
    });
    
    const [userData, setUserData] = useState({
        username: 'JohanD123',
        email: 'johand@example.com',
    });

    const handleSaveChanges = () => {
        Alert.alert('Opgeslagen', 'Je accountgegevens zijn bijgewerkt.');
        router.push('/account'); // Terug naar de accountpagina
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Accountgegevens</Text>
            
            <Text style={styles.label}>Gebruikersnaam</Text>
            <TextInput 
                style={styles.input} 
                value={userData.username} 
                onChangeText={(text) => setUserData({ ...userData, username: text })} 
            />
            
            <Text style={styles.label}>Email</Text>
            <TextInput 
                style={styles.input} 
                value={userData.email} 
                onChangeText={(text) => setUserData({ ...userData, email: text })} 
                keyboardType="email-address"
            />
            
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                <Text style={styles.saveButtonText}>Opslaan</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.backButton} onPress={() => router.push('/account')}>
                <Text style={styles.backButtonText}>Terug naar account</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'ABeeZee',
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
        fontFamily: 'ABeeZee',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
        fontFamily: 'ABeeZee',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    saveButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'ABeeZee',
    },
    backButton: {
        backgroundColor: '#ddd',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'ABeeZee',
    },
});