import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Toast from 'react-native-toast-message';
import { useFonts } from 'expo-font';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
    const [fontsLoaded] = useFonts({
        'ABeeZee': require('../assets/fonts/ABeeZee.ttf'),
    });

  useEffect(() => {
  }, []);

  const handlePasswordReset = () => {
    if (!email) {
      Toast.show({ type: 'error', text1: 'Voer een e-mailadres in' });
      return;
    }
    // Hier zou je een API-aanroep doen om de reset e-mail te versturen
    Toast.show({ type: 'success', text1: 'Reset e-mail verzonden!' });
  };

  return (
    <View style={styles.container}>
    <Image source={require('../assets/images/EcoBite2.png')} style={styles.logo} />
     <Text style={styles.appName}><Text style={styles.eco}>Eco</Text><Text style={styles.bite}>Bite</Text></Text>
      <Text style={styles.title}>Wachtwoord vergeten</Text>
      <TextInput
        style={styles.input}
        placeholder="Voer uw e-mail in"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Reset wachtwoord</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  appName: {
    fontSize: 28,
    fontFamily: 'ABeeZee',
    marginBottom: 10,
  },
  eco: {
    color: '#006400', // Donkergroen
    fontWeight: 'bold',
  },
  bite: {
    color: '#32CD32', // Lichter groen
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontFamily: 'ABeeZee',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontFamily: 'ABeeZee',
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'ABeeZee',
  },
});
