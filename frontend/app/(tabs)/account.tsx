import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

export default function AccountPage() {
  const [fontsLoaded] = useFonts({
    'ABeeZee': require('../../assets/fonts/ABeeZee.ttf'),
  });

  const [userData, setUserData] = useState<{ username: string; email: string } | null>(null);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('https://edg5000.com/users/profile', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        if (res.ok) setUserData(data);
        else console.error('Fout bij ophalen gebruiker:', data);
      } catch (error) {
        console.error('Fout bij ophalen gebruiker:', error);
      }
    };

    fetchUserData();
  }, []);

  const pressFilters = () => router.push('/filters');
  const pressDetails = () => router.push('/details');
  const pressNotifications = () => router.push('/notifications');
  const pressHelp = () => router.push('/help');
  const pressSettings = () => router.push('/settings');
  const pressAboutApp = () => router.push('/about_app');
  const pressAbout = () => router.push('/about');
  const pressDonate = () => router.push('/donate');
  const pressPrivacy = () => router.push('/privacy_policy');
  const pressTerms = () => router.push('/terms');
  const pressLogout = () => setLogoutModalVisible(true);

  const confirmLogout = () => {
    fetch('https://edg5000.com/users/logout', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    }).then(() => {
      setLogoutModalVisible(false);
      router.push('/');
    });
  };

  const bg = isDark ? '#121212' : '#fff';
  const text = isDark ? '#fff' : '#333';
  const card = isDark ? '#1e1e1e' : '#f1f1f1';
  const separator = isDark ? '#333' : '#ddd';
  const modalBg = isDark ? '#2c2c2c' : '#fff';

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={[styles.container, { backgroundColor: bg }]}>
          <View style={[styles.userInfo, { backgroundColor: card }]}>
            <View style={styles.userText}>
              <Text style={[styles.userInfoText, { color: text }]}>Gebruikersnaam: {userData?.username || '...'}</Text>
              <Text style={[styles.userInfoText, { color: text }]}>Email: {userData?.email || '...'}</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: card }]} onPress={pressFilters}>
              <Text style={[styles.buttonText, { color: text }]}>Filters</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
            <View style={[styles.separator, { backgroundColor: separator }]} />

            <TouchableOpacity style={[styles.button, { backgroundColor: card }]} onPress={pressDetails}>
              <Text style={[styles.buttonText, { color: text }]}>Details</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
            <View style={[styles.separator, { backgroundColor: separator }]} />

            <TouchableOpacity style={[styles.button, { backgroundColor: card }]} onPress={pressNotifications}>
              <Text style={[styles.buttonText, { color: text }]}>Notificaties</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
            <View style={[styles.separator, { backgroundColor: separator }]} />

            <TouchableOpacity style={[styles.button, { backgroundColor: card }]} onPress={pressHelp}>
              <Text style={[styles.buttonText, { color: text }]}>Help</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
            <View style={[styles.separator, { backgroundColor: separator }]} />

            <TouchableOpacity style={[styles.button, { backgroundColor: card }]} onPress={pressSettings}>
              <Text style={[styles.buttonText, { color: text }]}>Instellingen</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
            <View style={[styles.separator, { backgroundColor: separator }]} />

            <TouchableOpacity style={[styles.button, { backgroundColor: card }]} onPress={pressAboutApp}>
              <Text style={[styles.buttonText, { color: text }]}>Versie app</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
            <View style={[styles.separator, { backgroundColor: separator }]} />

            <TouchableOpacity style={[styles.button, { backgroundColor: card }]} onPress={pressAbout}>
              <Text style={[styles.buttonText, { color: text }]}>Ons team</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.donateContainer, { backgroundColor: isDark ? '#2e7d32' : '#e6f4ea' }]}>
            <View style={styles.donateHeader}>
              <Ionicons name="heart" size={22} color="#D32F2F" style={{ marginRight: 8 }} />
              <Text style={[styles.donateTitle, { color: isDark ? '#fff' : '#2e7d32' }]}>Voedsel doneren</Text>
            </View>
            <Text style={[styles.donateDescription, { color: isDark ? '#eee' : '#555' }]}>
              Heb je voedsel dat je niet gaat gebruiken? Doneer het eenvoudig aan een voedselbank in de buurt en help verspilling verminderen.
            </Text>
            <TouchableOpacity style={styles.donateButton} onPress={pressDonate}>
              <Text style={styles.donateButtonText}>Meer Informatie</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.legalHeader}>
            <Ionicons name="document-text-outline" size={22} color="#4CAF50" style={{ marginRight: 8 }} />
            <Text style={styles.categoryTitle}>Juridische Informatie</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: card }]} onPress={pressPrivacy}>
              <Text style={[styles.buttonText, { color: text }]}>Privacybeleid</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
            <View style={[styles.separator, { backgroundColor: separator }]} />
            <TouchableOpacity style={[styles.button, { backgroundColor: card }]} onPress={pressTerms}>
              <Text style={[styles.buttonText, { color: text }]}>Servicevoorwaarden</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.logoutButton, { backgroundColor: bg, borderColor: '#D32F2F' }]} onPress={pressLogout}>
            <Ionicons name="log-out" size={24} color="#D32F2F" />
            <Text style={styles.logoutText}>Uitloggen</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>

      <Modal
        transparent
        animationType="fade"
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: modalBg }]}>
            <Text style={[styles.modalTitle, { color: text }]}>Weet u zeker dat u wilt uitloggen?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setLogoutModalVisible(false)} style={styles.cancelButton}>
                <Text style={[styles.cancelButtonText, { color: isDark ? '#fff' : '#333' }]}>Annuleer</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmLogout} style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Uitloggen</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  userInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 30, padding: 20, borderRadius: 10 },
  userText: { justifyContent: 'center' },
  userInfoText: { fontSize: 18, fontFamily: 'ABeeZee' },
  buttonContainer: { marginTop: 20 },
  button: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderRadius: 10 },
  buttonText: { fontSize: 16, fontFamily: 'ABeeZee' },
  arrow: { fontSize: 18, color: '#4CAF50', fontFamily: 'ABeeZee' },
  separator: { height: 1, marginVertical: 10 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 10, borderWidth: 1, marginTop: 30 },
  logoutText: { fontSize: 16, color: '#D32F2F', marginLeft: 10, fontFamily: 'ABeeZee' },
  donateContainer: { marginTop: 30, marginBottom: 30, padding: 20, borderRadius: 10, alignItems: 'center' },
  donateTitle: { fontSize: 20, fontFamily: 'ABeeZee', marginBottom: 0 },
  donateButton: { backgroundColor: '#4CAF50', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25 },
  donateButtonText: { color: '#fff', fontSize: 16, fontFamily: 'ABeeZee' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContainer: { width: '80%', borderRadius: 10, padding: 20, alignItems: 'center' },
  modalTitle: { fontSize: 18, marginBottom: 20, fontFamily: 'ABeeZee', textAlign: 'center' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  cancelButton: { flex: 1, marginRight: 10, padding: 10, backgroundColor: '#777', borderRadius: 5, alignItems: 'center' },
  cancelButtonText: { fontFamily: 'ABeeZee' },
  confirmButton: { flex: 1, marginLeft: 10, padding: 10, backgroundColor: '#D32F2F', borderRadius: 5, alignItems: 'center' },
  confirmButtonText: { color: '#fff', fontFamily: 'ABeeZee' },
  donateHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  donateDescription: { fontSize: 14, textAlign: 'center', marginBottom: 12, fontFamily: 'ABeeZee' },
  legalHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  categoryTitle: { fontSize: 20, fontWeight: 'bold', color: '#28a745', fontFamily: 'ABeeZee' },
});
