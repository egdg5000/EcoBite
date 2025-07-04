import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { Button, ListItem } from '@rneui/themed';
import { useRouter } from "expo-router";
import { useTheme } from './context/ThemeContext';

const SetupScreen = () => {
  const [fontsLoaded] = useFonts({
    'ABeeZee': require('../assets/fonts/ABeeZee.ttf'),
  });

  const router = useRouter();

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [allergies, setAllergies] = useState({
    gluten: false,
    noten: false,
    pinda: false,
    lactose: false,
  });

  const toggleAllergy = (key: keyof typeof allergies) => {
    setAllergies(prev => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    const loadAllergies = async () => {
      try {
        const res = await fetch('https://edg5000.com/users/preferences', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok && Array.isArray(data.allergies)) {
          const newAllergies = {
            gluten: false,
            noten: false,
            pinda: false,
            lactose: false,
          };
          data.allergies.forEach((key: keyof typeof newAllergies) => {
            if (newAllergies.hasOwnProperty(key)) {
              newAllergies[key] = true;
            }
          });
          setAllergies(newAllergies);
        }
      } catch (error) {
        console.error('Fout bij ophalen allergieën:', error);
      }
    };

    loadAllergies();
  }, []);

  // Versturen naar back-end
  const savePreferencesToBackend = async () => {
    const selectedAllergies = Object.entries(allergies)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    try {
      const res = await fetch('https://edg5000.com/users/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ allergies: selectedAllergies }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Fout bij opslaan voorkeuren:', data);
        Alert.alert('Fout', 'Er is iets misgegaan bij het opslaan van je voorkeuren.');
      } else {
        router.push('/home');
      }
    } catch (error) {
      console.error('Netwerkfout:', error);
      Alert.alert('Netwerkfout', 'Kon geen verbinding maken met de server.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#FFF' }}>
      <View style={styles.container}>
        <Image source={require('../assets/images/EcoBite2.png')} style={styles.logo} />
        <Text style={[styles.title, isDark && { color: '#fff' }]}>
          Allergieën
        </Text>
        <Text style={[styles.subtitle, isDark && { color: '#ccc' }]}>
          Geef hier uw allergieën aan. U kunt dit altijd wijzigen in uw instellingen.
        </Text>

        <View style={styles.list}>
          <ListItem
            bottomDivider
            containerStyle={{
              backgroundColor: isDark ? '#1e1e1e' : '#fff',
              borderBottomColor: isDark ? '#333' : '#ccc',
            }}
          >
            <ListItem.CheckBox
              checked={allergies.gluten}
              onPress={() => toggleAllergy('gluten')}
              checkedColor="#2DBE60"
              uncheckedColor={isDark ? '#bbb' : undefined}
              containerStyle={{
                backgroundColor: 'transparent',
                padding: 0,
                margin: 0,
              }}
            />
            <ListItem.Content>
              <ListItem.Title style={[styles.itemText, isDark && { color: '#fff' }]}>
                Glutenallergie
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>


          <ListItem
            bottomDivider
            containerStyle={{
              backgroundColor: isDark ? '#1e1e1e' : '#fff',
              borderBottomColor: isDark ? '#333' : '#ccc',
            }}
          >
            <ListItem.CheckBox
              checked={allergies.noten}
              onPress={() => toggleAllergy('noten')}
              checkedColor="#2DBE60"
              uncheckedColor={isDark ? '#bbb' : undefined}
              containerStyle={{
                backgroundColor: 'transparent',
                padding: 0,
                margin: 0,
              }}
            />
            <ListItem.Content>
              <ListItem.Title style={[styles.itemText, isDark && { color: '#fff' }]}>
                Notenallergie
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>


          <ListItem
            bottomDivider
            containerStyle={{
              backgroundColor: isDark ? '#1e1e1e' : '#fff',
              borderBottomColor: isDark ? '#333' : '#ccc',
            }}
          >
            <ListItem.CheckBox
              checked={allergies.pinda}
              onPress={() => toggleAllergy('pinda')}
              checkedColor="#2DBE60"
              uncheckedColor={isDark ? '#bbb' : undefined}
              containerStyle={{
                backgroundColor: 'transparent',
                padding: 0,
                margin: 0,
              }}
            />
            <ListItem.Content>
              <ListItem.Title style={[styles.itemText, isDark && { color: '#fff' }]}>
                Pinda-allergie
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>

        <ListItem
            bottomDivider
            containerStyle={{
              backgroundColor: isDark ? '#1e1e1e' : '#fff',
              borderBottomColor: isDark ? '#333' : '#ccc',
            }}
          >
            <ListItem.CheckBox
              checked={allergies.lactose}
              onPress={() => toggleAllergy('lactose')}
              checkedColor="#2DBE60"
              uncheckedColor={isDark ? '#bbb' : undefined}
              containerStyle={{
                backgroundColor: 'transparent',
                padding: 0,
                margin: 0,
              }}
            />
            <ListItem.Content>
              <ListItem.Title style={[styles.itemText, isDark && { color: '#fff' }]}>
                Lactose-intolerantie
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.button}
            title="Verder"
            onPress={savePreferencesToBackend}
          />
          <Button
            buttonStyle={[styles.button, styles.skipButton, isDark && {
              backgroundColor: '#1e1e1e',
              borderColor: '#2DBE60',
            }]}
            title="Overslaan"
            titleStyle={{ color: '#2DBE60' }}
            onPress={() => router.push('/home')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'ABeeZee',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'ABeeZee',
    textAlign: 'center',
    marginHorizontal: 30,
    marginBottom: 20,
  },
  list: {
    width: '90%',
    marginBottom: 30,
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'ABeeZee',
  },
  buttonContainer: {
    width: '90%',
    gap: 10,
  },
  button: {
    backgroundColor: '#2DBE60',
    padding: 12,
    borderRadius: 8,
  },
  skipButton: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#2DBE60',
  },
});

export default SetupScreen;
