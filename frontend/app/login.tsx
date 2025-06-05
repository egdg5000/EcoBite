import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
  Image, KeyboardAvoidingView, Platform
} from 'react-native';
import { Button, Input } from '@rneui/themed';
import { Link, useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { useTheme } from './context/ThemeContext';

const LoginScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessageUsername, setErrorUsername] = useState('');
  const [errorMessagePassword, setErrorPassword] = useState('');
  const [loginText, setLoginText] = useState('Inloggen');
  const [buttonLoading, setLoadingStatus] = useState(false);

  const [fontsLoaded] = useFonts({
    ABeeZee: require('../assets/fonts/ABeeZee.ttf'),
  });

  if (!fontsLoaded) return null;

  const validate = () => {
    let error = false;
    if (!email) {
      setErrorUsername('Voer een email of gebruikersnaam in');
      error = true;
    } else {
      setErrorUsername('');
    }

    if (!password) {
      setErrorPassword('Voer een wachtwoord in');
      error = true;
    } else {
      setErrorPassword('');
    }

    return !error;
  };

  const throwError = (response: any) => {
    if (response.message === 'Username or email not found')
      setErrorUsername('Gebruikersnaam of email niet gevonden');
    if (response.message === 'Incorrect password')
      setErrorPassword('Onjuist wachtwoord');
  };

  const login = async () => {
    if (!validate()) return;
    setLoadingStatus(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch('https://edg5000.com/users/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (!response.ok) {
        throwError(data);
      } else if (data.success) {
        setLoginText('Succesvol ingelogd!');
        router.push('/home');
      } else {
        setLoginText('Inloggen');
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        setErrorUsername('Netwerkfout: Probeer het later opnieuw');
      } else {
        setErrorUsername('Er is iets misgegaan. Probeer het opnieuw.');
      }
    } finally {
      setLoadingStatus(false);
    }
  };

  const styles = getStyles(isDark);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.innerContainer}>
          <Image source={require('../assets/images/EcoBite2.png')} style={styles.logo} />
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>👋 Welkom Terug!</Text>
          </View>
          <Text style={styles.title}>Inloggen</Text>
          <Text style={styles.subtitle}>Vul uw gegevens in om door te gaan</Text>

          <Input
            placeholder="E-mail of gebruikersnaam"
            placeholderTextColor={isDark ? '#aaa' : '#777'}
            value={email}
            onChangeText={setEmail}
            errorMessage={errorMessageUsername}
            inputStyle={styles.inputText}
            inputContainerStyle={styles.inputContainer}
          />

          <Input
            placeholder="Wachtwoord"
            placeholderTextColor={isDark ? '#aaa' : '#777'}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            errorMessage={errorMessagePassword}
            inputStyle={styles.inputText}
            inputContainerStyle={styles.inputContainer}
          />

          <TouchableOpacity style={styles.forgotPassword}>
            <Link href="/forgot_password" asChild>
              <Text style={styles.forgotPasswordLink}>Wachtwoord vergeten?</Text>
            </Link>
          </TouchableOpacity>

          <Button
            loading={buttonLoading}
            buttonStyle={styles.loginButton}
            titleStyle={styles.loginButtonText}
            onPress={login}
            title={loginText}
          />

          <Text style={styles.registerText}>
            Geen account?
            <Link href="/register" asChild>
              <Text style={styles.registerLink}> Registreren</Text>
            </Link>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#fff',
    },
    innerContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      paddingBottom: 40, 
    },
    logo: {
      width: 100,
      height: 100,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#333',
      fontFamily: 'ABeeZee',
    },
    subtitle: {
      fontSize: 14,
      color: isDark ? '#aaa' : '#666',
      marginBottom: 20,
      fontFamily: 'ABeeZee',
    },
    inputContainer: {
      width: '100%',
      backgroundColor: isDark ? '#2A2A2A' : '#f5f5f5',
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 6,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: isDark ? '#555' : '#ccc',
    },
    inputText: {
      color: isDark ? '#fff' : '#000',
      fontFamily: 'ABeeZee',
    },
    forgotPassword: {
      alignSelf: 'flex-end',
      marginTop: 4,
      marginBottom: 20,
    },
    forgotPasswordLink: {
      color: '#2DBE60',
      fontWeight: 'bold',
      fontFamily: 'ABeeZee',
    },
    loginButton: {
      backgroundColor: '#2DBE60',
      padding: 14,
      borderRadius: 10,
      marginTop: 10,
      width: '95%',
    },
    loginButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'ABeeZee',
    },
    registerText: {
      marginTop: 20,
      color: isDark ? '#aaa' : '#666',
      fontFamily: 'ABeeZee',
    },
    registerLink: {
      color: '#2DBE60',
      fontWeight: 'bold',
      fontFamily: 'ABeeZee',
    },
    welcomeContainer: {
      marginBottom: 8,
    },
    welcomeText: {
      fontSize: 18,
      color: isDark ? '#ccc' : '#444',
      fontFamily: 'ABeeZee',
      textAlign: 'center',
    },
  });

export default LoginScreen;
