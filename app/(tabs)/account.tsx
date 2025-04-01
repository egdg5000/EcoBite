import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router'; // Gebruik de useRouter-hook voor navigatie

export default function AccountPage() {
  const [fontsLoaded] = useFonts({
    'ABeeZee': require('../../assets/fonts/ABeeZee.ttf'),
  });

  const [userData, setUserData] = useState({
    username: 'JohanD123',
    email: 'johand@example.com',
    profilePicture: 'https://via.placeholder.com/100',
  });

  const router = useRouter(); // De router om navigatie naar andere pagina's te regelen

  // Functies voor knoppen
  const handleFiltersPress = () => {
    Alert.alert('Filters', 'Stel je filters in', [
      { text: 'OK', onPress: () => {} },
    ]);
  };

  const handleDetailsPress = () => {
    Alert.alert('Accountdetails', 'Bewerk je accountgegevens', [
      { text: 'OK', onPress: () => {} },
    ]);
  };

  const handleNotificationsPress = () => {
    Alert.alert('Notificaties', 'Instellingen voor notificaties', [
      { text: 'OK', onPress: () => {} },
    ]);
  };

  const handleHelpPress = () => {
    Alert.alert('Help', 'Krijg hulp over de app', [
      { text: 'OK', onPress: () => {} },
    ]);
  };

  const handleAboutPress = () => {
    Alert.alert('Over de app', 'Versie 1.0.0', [
      { text: 'OK', onPress: () => {} },
    ]);
  };

  const handleLogout = () => {
    // Bevestigingsdialoog voor uitloggen
    Alert.alert('Uitloggen', 'Weet je zeker dat je wilt uitloggen?', [
      {
        text: 'Nee',
        onPress: () => console.log('Uitloggen geannuleerd'),
        style: 'cancel',
      },
      {
        text: 'Ja',
        onPress: () => {
          // Navigeren naar de indexpagina (homepagina)
          router.push('/'); // Hier wordt de router gebruikt om naar de homepagina te gaan (index.tsx)
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Gebruikersinformatie */}
      <View style={styles.userInfo}>
        <Image source={{ uri: userData.profilePicture }} style={styles.profilePic} />
        <View style={styles.userText}>
          <Text style={styles.userInfoText}>Gebruikersnaam: {userData.username}</Text>
          <Text style={styles.userInfoText}>Email: {userData.email}</Text>
        </View>
      </View>

      {/* Scheidingstreep en knoppen */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleFiltersPress}>
          <Text style={styles.buttonText}>Filters</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
        <View style={styles.separator}></View>

        <TouchableOpacity style={styles.button} onPress={handleDetailsPress}>
          <Text style={styles.buttonText}>Details</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
        <View style={styles.separator}></View>

        <TouchableOpacity style={styles.button} onPress={handleNotificationsPress}>
          <Text style={styles.buttonText}>Notificaties</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
        <View style={styles.separator}></View>

        <TouchableOpacity style={styles.button} onPress={handleHelpPress}>
          <Text style={styles.buttonText}>Help</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
        <View style={styles.separator}></View>

        <TouchableOpacity style={styles.button} onPress={handleAboutPress}>
          <Text style={styles.buttonText}>Over de app</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Uitloggen knop */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out" size={24} color="#D32F2F" />
        <Text style={styles.logoutText}>Uitloggen</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  userText: {
    justifyContent: 'center',
  },
  userInfoText: {
    fontSize: 18,
    color: '#333',
    fontFamily: 'ABeeZee',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'ABeeZee',
  },
  arrow: {
    fontSize: 18,
    color: '#4CAF50', // Groen voor de pijltjes
    fontFamily: 'ABeeZee',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },

  // Uitloggen knop
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D32F2F',
    marginTop: 30,
  },
  logoutText: {
    fontSize: 16,
    color: '#D32F2F', // Rood voor de uitlogknop
    marginLeft: 10,
    fontFamily: 'ABeeZee',
  },
});
