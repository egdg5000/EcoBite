import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

export default function AccountDetailsPage() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'ABeeZee': require('../assets/fonts/ABeeZee.ttf'),
  });

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phone: '',
  });

  // 📥 Ophalen gebruikersdata bij laden
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

  // 💾 Opslaan in back-end
  const handleSaveChanges = async () => {
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
      } else {
        Alert.alert('Fout', 'Kon gegevens niet opslaan.');
        console.error(data);
      }
    } catch (error) {
      Alert.alert('Netwerkfout', 'Kon geen verbinding maken met de server.');
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
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

        <Text style={styles.label}>Telefoonnummer (optioneel)</Text>
        <TextInput
          style={styles.input}
          value={userData.phone}
          onChangeText={(text) => setUserData({ ...userData, phone: text })}
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Opslaan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/account')}>
          <Text style={styles.backButtonText}>Terug naar account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
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
