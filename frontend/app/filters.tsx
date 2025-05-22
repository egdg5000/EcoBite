import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function FiltersPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    gluten: false,
    noten: false,
    pinda: false,
    lactose: false,
  });

  // 🔁 Ophalen van bestaande filters vanuit back-end
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

  // ✅ Opslaan in de back-end
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Receptfilters</Text>
      <Text style={styles.subheader}>
        Selecteer de allergieën of voorkeuren waarop je wilt filteren:
        (deze recepten komen dan bovenaan te staan bij de suggesties voor uw recepten.)
      </Text>

      <View style={styles.filterRow}>
        <Text style={styles.label}>Glutenallergie</Text>
        <Switch value={filters.gluten} onValueChange={() => toggleFilter('gluten')} />
      </View>

      <View style={styles.filterRow}>
        <Text style={styles.label}>Notenallergie</Text>
        <Switch value={filters.noten} onValueChange={() => toggleFilter('noten')} />
      </View>

      <View style={styles.filterRow}>
        <Text style={styles.label}>Pinda-allergie</Text>
        <Switch value={filters.pinda} onValueChange={() => toggleFilter('pinda')} />
      </View>

      <View style={styles.filterRow}>
        <Text style={styles.label}>Lactose-intolerantie</Text>
        <Switch value={filters.lactose} onValueChange={() => toggleFilter('lactose')} />
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
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'ABeeZee',
  },
  subheader: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    fontFamily: 'ABeeZee',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
