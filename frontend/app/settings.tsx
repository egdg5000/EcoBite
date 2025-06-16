import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useTheme } from './context/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const router = useRouter();

  const handleSelectTheme = (mode: 'light' | 'dark') => {
    if ((mode === 'dark' && !isDark) || (mode === 'light' && isDark)) {
      toggleTheme();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#fff' }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Terugknop */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={isDark ? '#fff' : '#000'} />
          <Text style={[styles.backText, { color: isDark ? '#fff' : '#000' }]}>Terug</Text>
        </TouchableOpacity>

        <Text style={[styles.header, { color: isDark ? '#fff' : '#000' }]}>Instellingen</Text>

        {/* Thema-instellingen */}
        <Text style={[styles.sectionTitle, { color: isDark ? '#aaa' : '#555' }]}>Thema</Text>

        <TouchableOpacity
          style={[
            styles.option,
            {
              backgroundColor: !isDark ? '#e6f4ea' : 'transparent',
              borderColor: !isDark ? '#4CAF50' : '#555',
            },
          ]}
          onPress={() => handleSelectTheme('light')}
        >
          <Ionicons name="sunny-outline" size={20} color={isDark ? '#fff' : '#4CAF50'} />
          <Text style={[styles.optionText, { color: isDark ? '#fff' : '#000' }]}>Lichte modus</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            {
              backgroundColor: isDark ? '#263238' : 'transparent',
              borderColor: isDark ? '#4CAF50' : '#ccc',
            },
          ]}
          onPress={() => handleSelectTheme('dark')}
        >
          <Ionicons name="moon-outline" size={20} color={isDark ? '#4CAF50' : '#333'} />
          <Text style={[styles.optionText, { color: isDark ? '#fff' : '#000' }]}>Donkere modus</Text>
        </TouchableOpacity>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'ABeeZee',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    gap: 10,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'ABeeZee',
  },
});
