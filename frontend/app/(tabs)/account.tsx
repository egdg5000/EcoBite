import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Modal, Switch } from 'react-native';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext'; // Nieuw

export default function AccountPage() {
  const [fontsLoaded] = useFonts({
    'ABeeZee': require('../../assets/fonts/ABeeZee.ttf'),
  });

  const [userData, setUserData] = useState<{ username: string; email: string } | null>(null);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const { theme, toggleTheme } = useTheme(); 
  const isDark = theme === 'dark'; 

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('https://edg5000.com/users/profile', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        if (res.ok) {
          setUserData(data);
        } else {
          console.error('Fout bij ophalen gebruiker:', data);
        }
      } catch (error) {
        console.error('Fout bij ophalen gebruiker:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleFiltersPress = () => router.push('/filters');
  const handleDetailsPress = () => router.push('/details');
  const handleNotificationsPress = () => router.push('/notifications');
  const handleHelpPress = () => router.push('/help');
  const handleAboutPress = () => router.push('/about_app');
  const handleLogout = () => setLogoutModalVisible(true);

  const confirmLogout = () => {
    fetch('https://edg5000.com/users/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(() => {
      setLogoutModalVisible(false);
      router.push('/');
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#FFF' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#FFF' }]}>
          <View style={[styles.userInfo, { backgroundColor: isDark ? '#1e1e1e' : '#f8f8f8' }]}>
            <View style={styles.userText}>
              <Text style={[styles.userInfoText, { color: isDark ? '#fff' : '#333' }]}>Gebruikersnaam: {userData?.username || '...'}</Text>
              <Text style={[styles.userInfoText, { color: isDark ? '#fff' : '#333' }]}>Email: {userData?.email || '...'}</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: isDark ? '#2a2a2a' : '#f1f1f1' }]} onPress={handleFiltersPress}>
              <Text style={[styles.buttonText, { color: isDark ? '#fff' : '#333' }]}>Filters</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
            <View style={styles.separator}></View>

            <TouchableOpacity style={[styles.button, { backgroundColor: isDark ? '#2a2a2a' : '#f1f1f1' }]} onPress={handleDetailsPress}>
              <Text style={[styles.buttonText, { color: isDark ? '#fff' : '#333' }]}>Details</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
            <View style={styles.separator}></View>

            <TouchableOpacity style={[styles.button, { backgroundColor: isDark ? '#2a2a2a' : '#f1f1f1' }]} onPress={handleNotificationsPress}>
              <Text style={[styles.buttonText, { color: isDark ? '#fff' : '#333' }]}>Notificaties</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
            <View style={styles.separator}></View>

            <TouchableOpacity style={[styles.button, { backgroundColor: isDark ? '#2a2a2a' : '#f1f1f1' }]} onPress={handleHelpPress}>
              <Text style={[styles.buttonText, { color: isDark ? '#fff' : '#333' }]}>Help</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
            <View style={styles.separator}></View>

            <TouchableOpacity style={[styles.button, { backgroundColor: isDark ? '#2a2a2a' : '#f1f1f1' }]} onPress={handleAboutPress}>
              <Text style={[styles.buttonText, { color: isDark ? '#fff' : '#333' }]}>Versie app</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
            <View style={styles.separator}></View>

            <TouchableOpacity style={[styles.button, { backgroundColor: isDark ? '#2a2a2a' : '#f1f1f1' }]} onPress={() => router.push('/about')}>
              <Text style={[styles.buttonText, { color: isDark ? '#fff' : '#333' }]}>Ons team</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.donateContainer, { backgroundColor: isDark ? '#1b3c2c' : '#e6f4ea' }]}>
            <View style={styles.donateHeader}>
              <Ionicons name="heart" size={22} color="#D32F2F" style={{ marginRight: 8 }} />
              <Text style={[styles.donateTitle, { color: isDark ? '#A5D6A7' : '#2e7d32' }]}>Voedsel doneren</Text>
            </View>
            <Text style={[styles.donateDescription, { color: isDark ? '#ccc' : '#555' }]}>
              Heb je voedsel dat je niet gaat gebruiken? Doneer het eenvoudig aan een voedselbank in de buurt en help verspilling verminderen.
            </Text>
            <TouchableOpacity style={styles.donateButton} onPress={() => router.push('/donate')}>
              <Text style={styles.donateButtonText}>Meer Informatie</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginHorizontal: 20, marginBottom: 30 }}>
            <Text style={[styles.categoryTitle, { color: isDark ? '#A5D6A7' : '#2e7d32', marginBottom: 10 }]}>
              Liever in donkere modus deze app gebruiken?
            </Text>
            <Switch value={isDark} onValueChange={toggleTheme} />
          </View>

          <View style={styles.legalHeader}>
            <Ionicons name="document-text-outline" size={22} color="#4CAF50" style={{ marginRight: 8 }} />
            <Text style={[styles.categoryTitle, { color: isDark ? '#A5D6A7' : '#28a745' }]}>Juridische Informatie</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: isDark ? '#2a2a2a' : '#f1f1f1' }]} onPress={() => router.push('/privacy_policy')}>
              <Text style={[styles.buttonText, { color: isDark ? '#fff' : '#333' }]}>Privacybeleid</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
            <View style={styles.separator}></View>

            <TouchableOpacity style={[styles.button, { backgroundColor: isDark ? '#2a2a2a' : '#f1f1f1' }]} onPress={() => router.push('/terms')}>
              <Text style={[styles.buttonText, { color: isDark ? '#fff' : '#333' }]}>Servicevoorwaarden</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.logoutButton, { backgroundColor: isDark ? '#2a2a2a' : '#fff', borderColor: '#D32F2F' }]} onPress={handleLogout}>
            <Ionicons name="log-out" size={24} color="#D32F2F" />
            <Text style={[styles.logoutText, { color: '#D32F2F' }]}>Uitloggen</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>

      <Modal
        transparent={true}
        animationType="fade"
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}>
            <Text style={[styles.modalTitle, { color: isDark ? '#fff' : '#333' }]}>Weet u zeker dat u wilt uitloggen?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setLogoutModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Annuleer</Text>
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
  separator: { height: 1, backgroundColor: '#ddd', marginVertical: 10 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 10, borderWidth: 1, marginTop: 30 },
  logoutText: { fontSize: 16, marginLeft: 10, fontFamily: 'ABeeZee' },
  categoryTitle: { fontSize: 20, fontWeight: 'bold', fontFamily: 'ABeeZee' },
  donateContainer: { marginTop: 30, marginBottom: 30, padding: 20, borderRadius: 10, alignItems: 'center' },
  donateTitle: { fontSize: 20, fontFamily: 'ABeeZee', marginBottom: 0 },
  donateButton: { backgroundColor: '#4CAF50', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25 },
  donateButtonText: { color: '#fff', fontSize: 16, fontFamily: 'ABeeZee' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContainer: { width: '80%', borderRadius: 10, padding: 20, alignItems: 'center' },
  modalTitle: { fontSize: 18, marginBottom: 20, fontFamily: 'ABeeZee', textAlign: 'center' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  cancelButton: { flex: 1, marginRight: 10, padding: 10, backgroundColor: '#ccc', borderRadius: 5, alignItems: 'center' },
  cancelButtonText: { color: '#333', fontFamily: 'ABeeZee' },
  confirmButton: { flex: 1, marginLeft: 10, padding: 10, backgroundColor: '#D32F2F', borderRadius: 5, alignItems: 'center' },
  confirmButtonText: { color: '#fff', fontFamily: 'ABeeZee' },
  donateHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  donateDescription: { fontSize: 14, textAlign: 'center', marginBottom: 12, fontFamily: 'ABeeZee' },
  legalHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
});
