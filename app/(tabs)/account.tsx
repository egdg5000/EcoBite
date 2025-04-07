import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function AccountPage() {
  const [fontsLoaded] = useFonts({
    'ABeeZee': require('../../assets/fonts/ABeeZee.ttf'),
  });

  const [userData] = useState({
    username: 'JohanD123',
    email: 'johand@example.com',
  });

  const router = useRouter();

  const handleFiltersPress = () => {
    router.push('/filters');
  };

  const handleDetailsPress = () => {
    router.push('/details');
  };

  const handleNotificationsPress = () => {
    router.push('/notifications');
  };

  const handleHelpPress = () => {
    router.push('/help');
  };

  const handleAboutPress = () => {
    router.push('/about_app');
  };

  const handleLogout = () => {
    Alert.alert('Uitloggen', 'Weet u zeker dat u wilt uitloggen?', [
      { text: 'Nee', style: 'cancel' },
      { text: 'Ja', onPress: () => router.push('/') },
    ]);
  };

  const handleTermsPress = () => {
    router.push('/terms');
  };

  const handlePrivacyPress = () => {
    router.push('/privacy_policy');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* Gebruikersinformatie */}
        <View style={styles.userInfo}>
          <View style={styles.userText}>
            <Text style={styles.userInfoText}>Gebruikersnaam: {userData.username}</Text>
            <Text style={styles.userInfoText}>Email: {userData.email}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          {/* Andere knoppen */}
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

          {/* Toevoegen van separator tussen Over de app en servicevoorwaarden */}
          <View style={styles.separator}></View>

          {/* Nieuwe knoppen voor de voorwaarden en privacybeleid */}
          <TouchableOpacity style={styles.button} onPress={handleTermsPress}>
            <Text style={styles.buttonText}>Servicevoorwaarden</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
          <View style={styles.separator}></View>

          <TouchableOpacity style={styles.button} onPress={handlePrivacyPress}>
            <Text style={styles.buttonText}>Privacybeleid</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={24} color="#D32F2F" />
          <Text style={styles.logoutText}>Uitloggen</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  userInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 30, padding: 20, backgroundColor: '#f8f8f8', borderRadius: 10 },
  userText: { justifyContent: 'center' },
  userInfoText: { fontSize: 18, color: '#333', fontFamily: 'ABeeZee' },
  buttonContainer: { marginTop: 20 },
  button: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#f1f1f1', borderRadius: 10 },
  buttonText: { fontSize: 16, color: '#333', fontFamily: 'ABeeZee' },
  arrow: { fontSize: 18, color: '#4CAF50', fontFamily: 'ABeeZee' },
  separator: { height: 1, backgroundColor: '#ddd', marginVertical: 10 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#fff', borderRadius: 10, borderWidth: 1, borderColor: '#D32F2F', marginTop: 30 },
  logoutText: { fontSize: 16, color: '#D32F2F', marginLeft: 10, fontFamily: 'ABeeZee' },
});
