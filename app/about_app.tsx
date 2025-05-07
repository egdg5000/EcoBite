import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'; // Voeg SafeAreaView toe
import { useRouter } from 'expo-router'; // Navigatie hook
import { checkForUpdateAsync } from 'expo-updates'; // Directe import van checkForUpdateAsync
import * as Application from 'expo-application'; // Om de versie op te halen

export default function AboutPage() {
  const [appVersion, setAppVersion] = useState(Application.nativeApplicationVersion); // Dynamische versie
  const [updateStatus, setUpdateStatus] = useState('');
  const router = useRouter(); // Router voor navigatie

  // Checken of er updates zijn
  useEffect(() => {
    const checkForAppUpdates = async () => {
      try {
        const update = await checkForUpdateAsync(); // Gebruik de direct geïmporteerde functie
        if (update.isAvailable) {
          setUpdateStatus('Er is een update beschikbaar! Update de app voor nieuwe functies.');
        } else {
          setUpdateStatus('Je hebt de nieuwste versie van de app.');
        }
      } catch (error) {
        console.log('Error checking for updates:', error);
        setUpdateStatus('Er is een probleem met het controleren van updates.');
      }
    };

    checkForAppUpdates();
  }, []); // Lege afhankelijkheden, zodat dit alleen één keer gebeurt bij het laden van de pagina

  const handleGoBack = () => {
    router.push('/account'); 
  };

  return (
    <SafeAreaView style={styles.container}> 
      <View style={styles.container}>
        <Text style={styles.header}>Over de App</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Versie: {appVersion}</Text>
          <Text style={styles.infoText}>{updateStatus}</Text>
        </View>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>Terug</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'ABeeZee',
  },
  infoContainer: {
    marginBottom: 30,
  },
  infoText: {
    fontSize: 18,
    color: '#333',
    fontFamily: 'ABeeZee',
    marginBottom: 10,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignSelf: 'center', // centreren op het scherm
    marginTop: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'ABeeZee',
    fontWeight: '500',
  },
});
