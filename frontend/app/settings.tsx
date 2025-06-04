import React from 'react';
import { View, Text, StyleSheet, Switch, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from './context/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#fff' }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Terugknop */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#fff' : '#000'} />
          <Text style={[styles.backText, { color: isDarkMode ? '#fff' : '#000' }]}>Terug</Text>
        </TouchableOpacity>

        <Text style={[styles.header, { color: isDarkMode ? '#fff' : '#000' }]}>
          Instellingen
        </Text>

        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, { color: isDarkMode ? '#fff' : '#000' }]}>
            Donkere Modus
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: '#ccc', true: '#4CAF50' }}
            thumbColor={isDarkMode ? '#ffffff' : '#f4f3f4'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'ABeeZee',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'ABeeZee',
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'ABeeZee',
  },
});
