import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Toast from 'react-native-toast-message';
import { useFonts } from 'expo-font';
import { Input } from '@rneui/themed';


export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
    const [fontsLoaded] = useFonts({
        'ABeeZee': require('../assets/fonts/ABeeZee.ttf'),
    });

  useEffect(() => {
  }, []);

  const handlePasswordReset = async () => {
    if (!email) {
      Toast.show({ type: 'error', text1: 'Voer een e-mailadres in' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Toast.show({ type: 'error', text1: 'Voer een geldig e-mailadres in' });
      return;
    }
    const body = JSON.stringify({
      email: email,
    })
    const response = await fetch('http://localhost:3000/sendrecoverymail', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body
    });
    const data = await response.json();
      if (data.success) Toast.show({ type: 'success', text1: 'Reset e-mail verzonden!' });
      else if (data.message === 'Email not found') {Toast.show({ type: 'error', text1: 'Geen account met deze e-mail gevonden' })}
      else if (data.message === 'Email not verified') {Toast.show({ type: 'error', text1: 'Deze e-mail is niet geverifieerd' })}
      else{
        console.error(data.message);
        Toast.show({type: 'error', text1: 'Er is iets misgegaan'})
      }
  };

  return (
    <View style={styles.container}>
    <Image source={require('../assets/images/EcoBite2.png')} style={styles.logo} />
     <Text style={styles.appName}><Text style={styles.eco}>Eco</Text><Text style={styles.bite}>Bite</Text></Text>
      <Text style={styles.title}>Wachtwoord vergeten</Text>
      <Input
          style={styles.input}
          placeholder="Voer uw e-mail in"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          id='email'
          placeholderTextColor="#777"
          renderErrorMessage={true}
          inputContainerStyle={{
              width: '100%',
              borderBottomWidth:0,
              alignSelf: 'center'
          }}
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
    marginBottom: 15,
    fontFamily: 'ABeeZee',
    backgroundColor: '#F5F5F5',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 5,
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
    width: '95%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'ABeeZee',
  },
});
