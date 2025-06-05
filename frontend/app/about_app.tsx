import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'; 
import { useRouter } from 'expo-router'; 
import { checkForUpdateAsync } from 'expo-updates'; 
import * as Application from 'expo-application'; 
import { useTheme } from './context/ThemeContext';

export default function AboutPage() {
  const [appVersion, setAppVersion] = useState(Application.nativeApplicationVersion); 
  const [updateStatus, setUpdateStatus] = useState('');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const router = useRouter(); 

  useEffect(() => {
    const checkForAppUpdates = async () => {
      try {
        const update = await checkForUpdateAsync(); 
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
  }, []); 

  const handleGoBack = () => {
    router.push('/account'); 
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#fff' }]}> 
      <View style={styles.container}>
        <Text style={[styles.header, { color: isDark ? '#66BB6A' : '#4CAF50' }]}>Over de App</Text>
        <View style={styles.infoContainer}>
          <Text style={[styles.infoText, { color: isDark ? '#ddd' : '#333' }]}>Versie: {appVersion}</Text>
          <Text style={[styles.infoText, { color: isDark ? '#aaa' : '#333' }]}>{updateStatus}</Text>
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
    alignSelf: 'center', 
    marginTop: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'ABeeZee',
    fontWeight: '500',
  },
});
