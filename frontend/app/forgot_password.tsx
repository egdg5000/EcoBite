import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import { useFonts } from 'expo-font';
import { Input } from '@rneui/themed';
import { useTheme } from './context/ThemeContext';  

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [fontsLoaded] = useFonts({
    ABeeZee: require('../assets/fonts/ABeeZee.ttf'),
  });

  const handlePasswordReset = async () => {
    if (!email) {
      setErrorMessage('Voer een e-mailadres in');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Voer een geldig e-mailadres in');
      return;
    }
    setErrorMessage('');
    const body = JSON.stringify({ email });
    try {
      const response = await fetch('https://edg5000.com/sendrecoverymail', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      const data = await response.json();
      if (data.success) {
        Toast.show({ type: 'success', text1: 'Reset e-mail verzonden!' });
      } else if (data.message === 'Email not found') {
        Toast.show({ type: 'error', text1: 'Geen account met deze e-mail gevonden' });
      } else if (data.message === 'Email not verified') {
        Toast.show({ type: 'error', text1: 'Deze e-mail is niet geverifieerd' });
      } else {
        console.error(data.message);
        Toast.show({ type: 'error', text1: 'Er is iets misgegaan' });
      }
    } catch (e) {
      console.error(e);
      Toast.show({ type: 'error', text1: 'Netwerkfout' });
    }
  };

  if (!fontsLoaded) return null;

  const backgroundColor = isDark ? '#121212' : '#fff';
  const textColor = isDark ? '#eee' : '#000';
  const inputBackground = isDark ? '#333' : '#F5F5F5';
  const inputBorder = isDark ? '#555' : '#ccc';
  const placeholderColor = isDark ? '#ccc' : '#777';
  const buttonColor = '#006400'; 
  const buttonTextColor = '#fff';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Image source={require('../assets/images/EcoBite2.png')} style={styles.logo} />
      <Text style={[styles.appName, { color: textColor }]}>
        <Text style={[styles.eco, { color: '#006400' }]}>Eco</Text>
        <Text style={[styles.bite, { color: '#32CD32' }]}>Bite</Text>
      </Text>
      <Text style={[styles.title, { color: textColor }]}>Wachtwoord vergeten</Text>
      <Input
        placeholder="Voer uw e-mail in"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        id="email"
        placeholderTextColor={placeholderColor}
        errorMessage={errorMessage}
        renderErrorMessage={true}
        inputContainerStyle={{
          width: '100%',
          borderBottomWidth: 0,
          alignSelf: 'center',
        }}
        inputStyle={{
          color: textColor,
          fontFamily: 'ABeeZee',
          backgroundColor: inputBackground,
          paddingVertical: 15,
          paddingHorizontal: 15,
          borderRadius: 8,
          fontSize: 16,
          borderWidth: 1,
          borderColor: inputBorder,
          marginTop: 5,
        }}
        containerStyle={{ width: '100%' }}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonColor }]}
        onPress={handlePasswordReset}
      >
        <Text style={[styles.buttonText, { color: buttonTextColor }]}>Reset wachtwoord</Text>
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
    fontWeight: 'bold',
  },
  bite: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontFamily: 'ABeeZee',
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    width: '95%',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'ABeeZee',
  },
});
