import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from './context/ThemeContext';

export default function FiltersPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [filters, setFilters] = useState({
    gluten: false,
    noten: false,
    pinda: false,
    lactose: false,
  });

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const res = await fetch('https://edg5000.com/users/preferences', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();

        if (res.ok && Array.isArray(data.allergies)) {
          const newFilters = {
            gluten: false,
            noten: false,
            pinda: false,
            lactose: false,
          };
          data.allergies.forEach((key: keyof typeof newFilters) => {
            if (newFilters.hasOwnProperty(key)) {
              newFilters[key] = true;
            }
          });
          setFilters(newFilters);
        }
      } catch (error) {
        console.error('Fout bij ophalen filters:', error);
      }
    };

    loadFilters();
  }, []);

  const saveFilters = async () => {
    const selectedFilters = Object.entries(filters)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    try {
      const res = await fetch('https://edg5000.com/users/preferences', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ allergies: selectedFilters }),
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert('Opgeslagen', 'Je filterinstellingen zijn opgeslagen.');
        router.replace('/account?filtersSaved=true');
      } else {
        console.error('Fout bij opslaan filters:', data);
        Alert.alert('Fout', 'Kon filters niet opslaan.');
      }
    } catch (error) {
      console.log('Netwerkfout:', error);
      Alert.alert('Netwerkfout', 'Kon geen verbinding maken met de server.');
    }
  };

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#fff' }]}> 
      <View style={styles.titleContainer}>
        <Text style={[styles.header, { color: isDark ? '#66BB6A' : '#4CAF50' }]}>Receptfilters</Text>
        <Text style={[styles.subheader, { color: isDark ? '#ccc' : '#555' }]}> 
          Selecteer de allergieën of voorkeuren waarop je wilt filteren:
          (deze recepten komen dan bovenaan te staan bij de suggesties voor uw recepten.)
        </Text>
      </View>

      <View style={styles.filterRow}>
        <View style={styles.labelContainer}>
          <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Glutenallergie</Text>
        </View>
        <View style={styles.switchContainer}>
          <Switch value={filters.gluten} onValueChange={() => toggleFilter('gluten')} />
        </View>
      </View>

      <View style={styles.filterRow}>
        <View style={styles.labelContainer}>
          <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Notenallergie</Text>
        </View>
        <View style={styles.switchContainer}>
          <Switch value={filters.noten} onValueChange={() => toggleFilter('noten')} />
        </View>
      </View>

      <View style={styles.filterRow}>
        <View style={styles.labelContainer}>
          <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Pinda-allergie</Text>
        </View>
        <View style={styles.switchContainer}>
          <Switch value={filters.pinda} onValueChange={() => toggleFilter('pinda')} />
        </View>
      </View>

      <View style={styles.filterRow}>
        <View style={styles.labelContainer}>
          <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Lactose-intolerantie</Text>
        </View>
        <View style={styles.switchContainer}>
          <Switch value={filters.lactose} onValueChange={() => toggleFilter('lactose')} />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveFilters}>
        <Text style={styles.saveButtonText}>Opslaan</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'ABeeZee',
    textAlign: 'center',
  },
  subheader: {
    fontSize: 16,
    fontFamily: 'ABeeZee',
    textAlign: 'center',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20, 
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center', 
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 10, 
  },
  switchContainer: {
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 16,
    fontFamily: 'ABeeZee',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'ABeeZee',
  },
});
