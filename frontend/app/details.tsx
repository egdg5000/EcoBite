import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { useTheme } from './context/ThemeContext';

export default function AccountDetailsPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [fontsLoaded] = useFonts({
    'ABeeZee': require('../assets/fonts/ABeeZee.ttf'),
  });

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phone: '',
  });

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('https://edg5000.com/users/profile', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok) {
          setUserData({
            username: data.username || '',
            email: data.email || '',
            phone: data.phone || '',
          });
        } else {
          console.error('Fout bij ophalen profiel:', data);
        }
      } catch (error) {
        console.error('Netwerkfout bij ophalen profiel:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSaveChanges = async () => {
    if (!isValidEmail(userData.email)) {
      Alert.alert('Ongeldig e-mailadres', 'Voer een geldig e-mailadres in.');
      return;
    }

    try {
      const res = await fetch('https://edg5000.com/users/profile', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert('Opgeslagen', 'Je accountgegevens zijn bijgewerkt.');
        router.push('/account');
      } else if (res.status === 409) {
        Alert.alert('Email bestaat al', 'Dit e-mailadres is al in gebruik.');
      } else {
        Alert.alert('Fout', 'Kon gegevens niet opslaan.');
        console.error(data);
      }
    } catch (error) {
      Alert.alert('Netwerkfout', 'Kon geen verbinding maken met de server.');
      console.error(error);
    }
  };

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#fff' }]}>
      <View style={styles.innerContainer}>
        <Text style={[styles.title, { color: isDark ? '#66BB6A' : '#4CAF50' }]}>Accountgegevens</Text>

        <Text style={[styles.label, { color: isDark ? '#ccc' : '#333' }]}>Gebruikersnaam</Text>
        <TextInput
          style={[styles.input, { backgroundColor: isDark ? '#1e1e1e' : '#f5f5f5', color: isDark ? '#fff' : '#000' }]}
          value={userData.username}
          onChangeText={(text) => setUserData({ ...userData, username: text })}
          placeholderTextColor={isDark ? '#777' : '#888'}
        />

        <Text style={[styles.label, { color: isDark ? '#ccc' : '#333' }]}>Email</Text>
        <TextInput
          style={[styles.input, { backgroundColor: isDark ? '#1e1e1e' : '#f5f5f5', color: isDark ? '#fff' : '#000' }]}
          value={userData.email}
          onChangeText={(text) => setUserData({ ...userData, email: text })}
          keyboardType="email-address"
          placeholderTextColor={isDark ? '#777' : '#888'}
        />

        <Text style={[styles.label, { color: isDark ? '#ccc' : '#333' }]}>Telefoonnummer (optioneel)</Text>
        <TextInput
          style={[styles.input, { backgroundColor: isDark ? '#1e1e1e' : '#f5f5f5', color: isDark ? '#fff' : '#000' }]}
          value={userData.phone}
          onChangeText={(text) => setUserData({ ...userData, phone: text })}
          keyboardType="phone-pad"
          placeholderTextColor={isDark ? '#777' : '#888'}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Opslaan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.backButton, { backgroundColor: isDark ? '#333' : '#ddd' }]} onPress={() => router.push('/account')}>
          <Text style={[styles.backButtonText, { color: isDark ? '#fff' : '#333' }]}>Terug naar account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'ABeeZee',
  },
  label: {
    fontSize: 16,
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
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: 'ABeeZee',
  },
});
