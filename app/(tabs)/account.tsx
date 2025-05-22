import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function AccountPage() {
  const [fontsLoaded] = useFonts({
    'ABeeZee': require('../../assets/fonts/ABeeZee.ttf'),
  });

  const [userData, setUserData] = useState<{ username: string; email: string } | null>(null);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

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
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <View style={styles.userInfo}>
            <View style={styles.userText}>
              <Text style={styles.userInfoText}>Gebruikersnaam: {userData?.username || '...'}</Text>
              <Text style={styles.userInfoText}>Email: {userData?.email || '...'}</Text>
            </View>
          </View>

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
              <Text style={styles.buttonText}>Versie app</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
            <View style={styles.separator}></View>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/about')}>
              <Text style={styles.buttonText}>Ons team</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.donateContainer}>
            <View style={styles.donateHeader}>
              <Ionicons name="heart" size={22} color="#D32F2F" style={{ marginRight: 8 }} />
              <Text style={styles.donateTitle}>Voedsel doneren</Text>
            </View>
            <Text style={styles.donateDescription}>
              Heb je voedsel dat je niet gaat gebruiken? Doneer het eenvoudig aan een voedselbank in de buurt en help verspilling verminderen.
            </Text>
            <TouchableOpacity style={styles.donateButton} onPress={() => router.push('/donate')}>
              <Text style={styles.donateButtonText}>Meer Informatie</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.legalHeader}>
            <Ionicons name="document-text-outline" size={22} color="#4CAF50" style={{ marginRight: 8 }} />
            <Text style={styles.categoryTitle}>Juridische Informatie</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/privacy_policy')}>
              <Text style={styles.buttonText}>Privacybeleid</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
            <View style={styles.separator}></View>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/terms')}>
              <Text style={styles.buttonText}>Servicevoorwaarden</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out" size={24} color="#D32F2F" />
            <Text style={styles.logoutText}>Uitloggen</Text>
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
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Weet u zeker dat u wilt uitloggen?</Text>
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
  categoryContainer: { marginTop: 30 },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28a745',
    fontFamily: 'ABeeZee'
  },
  donateContainer: {
    marginTop: 30,
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#e6f4ea',
    borderRadius: 10,
    alignItems: 'center',
  },
  donateTitle: {
    fontSize: 20,
    fontFamily: 'ABeeZee',
    color: '#2e7d32',
    marginBottom: 0,
  },
  donateButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'ABeeZee',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: 'ABeeZee',
    textAlign: 'center',
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontFamily: 'ABeeZee',
  },
  confirmButton: {
    flex: 1,
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#D32F2F',
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontFamily: 'ABeeZee',
  },
  donateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  donateDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'ABeeZee',
  },
  legalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
