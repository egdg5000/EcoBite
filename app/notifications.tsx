import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

export default function NotificationsSettings() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'ABeeZee': require('../assets/fonts/ABeeZee.ttf'),
  });

  const [expiryAlerts, setExpiryAlerts] = useState(true);
  const [generalUpdates, setGeneralUpdates] = useState(false);
  const [donationReminders, setDonationReminders] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Notificatie-instellingen</Text>
      <Text style={styles.subtitle}>Beheer je meldingen voor de app.</Text>

      {/* Notificatie-opties */}
      <View style={styles.section}>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>🔔 Producten die bijna verlopen</Text>
          <Switch
            value={expiryAlerts}
            onValueChange={setExpiryAlerts}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={expiryAlerts ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingText}>📢 Algemene updates</Text>
          <Switch
            value={generalUpdates}
            onValueChange={setGeneralUpdates}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={generalUpdates ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingText}>❤️ Donatieherinneringen</Text>
          <Switch
            value={donationReminders}
            onValueChange={setDonationReminders}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={donationReminders ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Terug knop */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/account')}>
        <Text style={styles.backButtonText}>← Terug naar Account</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'ABeeZee',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'ABeeZee',
  },
  section: {
    marginBottom: 30,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginBottom: 10,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'ABeeZee',
  },
  backButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'ABeeZee',
  },
});