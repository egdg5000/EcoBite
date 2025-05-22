import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { Button, ListItem } from '@rneui/themed';
import { useRouter } from "expo-router";

const SetupScreen = () => {
  const [fontsLoaded] = useFonts({
    'ABeeZee': require('../assets/fonts/ABeeZee.ttf'),
  });

  const router = useRouter();

  const [allergies, setAllergies] = useState({
    gluten: false,
    noten: false,
    pinda: false,
    lactose: false,
  });

  const toggleAllergy = (key: keyof typeof allergies) => {
    setAllergies(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const savePreferencesToBackend = async () => {
    // Zet om naar array van geselecteerde allergieën
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <View style={styles.container}>
        <Image source={require('../assets/images/EcoBite2.png')} style={styles.logo} />
        <Text style={styles.title}>Allergieën</Text>
        <Text style={styles.subtitle}>
          Geef hier uw allergieën aan. U kunt dit altijd wijzigen in uw instellingen.
        </Text>

        <View style={styles.list}>
          <ListItem bottomDivider>
            <ListItem.CheckBox
              checked={allergies.gluten}
              onPress={() => toggleAllergy('gluten')}
            />
            <ListItem.Content>
              <ListItem.Title style={styles.itemText}>Glutenallergie</ListItem.Title>
            </ListItem.Content>
          </ListItem>

          <ListItem bottomDivider>
            <ListItem.CheckBox
              checked={allergies.noten}
              onPress={() => toggleAllergy('noten')}
            />
            <ListItem.Content>
              <ListItem.Title style={styles.itemText}>Notenallergie</ListItem.Title>
            </ListItem.Content>
          </ListItem>

          <ListItem bottomDivider>
            <ListItem.CheckBox
              checked={allergies.pinda}
              onPress={() => toggleAllergy('pinda')}
            />
            <ListItem.Content>
              <ListItem.Title style={styles.itemText}>Pinda-allergie</ListItem.Title>
            </ListItem.Content>
          </ListItem>

          <ListItem bottomDivider>
            <ListItem.CheckBox
              checked={allergies.lactose}
              onPress={() => toggleAllergy('lactose')}
            />
            <ListItem.Content>
              <ListItem.Title style={styles.itemText}>Lactose-intolerantie</ListItem.Title>
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
            buttonStyle={[styles.button, styles.skipButton]}
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
