import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from 'react-native';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { Button, Input } from '@rneui/themed';
import { useTheme } from './context/ThemeContext';

const RegistrationScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { email } = useLocalSearchParams<{ email: string }>();

  const [errorMessageEmail, setErrorEmail] = useState('');
  const [errorMessageUsername, setErrorUsername] = useState('');
  const [errorMessagePassword, setErrorPassword] = useState('');
  const [username, setUsername] = useState('');
  const [newemail, setEmail] = useState(email || '');
  const [password, setPassword] = useState('');
  const [registerText, setRegisterText] = useState('Registreren');
  const [buttonLoading, setLoadingStatus] = useState(false);

  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  const [fontsLoaded] = useFonts({
    ABeeZee: require('../assets/fonts/ABeeZee.ttf'),
  });

  if (!fontsLoaded) return null;

  const validatePassword = (pw: string) => {
    const criteria = {
      length: pw.length >= 8,
      uppercase: /[A-Z]/.test(pw),
      lowercase: /[a-z]/.test(pw),
      number: /\d/.test(pw),
    };
    setPasswordCriteria(criteria);
  };

  const validate = () => {
    let error = false;

    if (!username) {
      setErrorUsername('Voer een gebruikersnaam in');
      error = true;
    } else {
      setErrorUsername('');
    }

    if (!newemail) {
      setErrorEmail('Voer een e-mailadres in');
      error = true;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newemail)) {
        setErrorEmail('Voer een geldig e-mailadres in');
        error = true;
      } else setErrorEmail('');
    }

    if (!password) {
      setErrorPassword('Voer een wachtwoord in');
      error = true;
    } else {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(password)) {
        setErrorPassword('Wachtwoord voldoet niet aan de vereisten');
        error = true;
      } else setErrorPassword('');
    }

    return !error;
  };

  const throwError = (response: any) => {
    if (response.message === 'Gebruikersnaam en email zijn al in gebruik') {
      setErrorUsername('Gebruikersnaam is al in gebruik');
      setErrorEmail('Email is al in gebruik');
    }
    if (response.message === 'Gebruikersnaam is al in gebruik') setErrorUsername(response.message);
    if (response.message === 'Email is al in gebruik') setErrorEmail(response.message);
  };

  const register = async () => {
    if (!validate()) return;
    setLoadingStatus(true);
    setErrorEmail('');
    setErrorUsername('');
    setErrorPassword('');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8 seconden timeout

    try {
      const response = await fetch('https://edg5000.com/users/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: newemail,
          password: password,
        }),
        signal: controller.signal,
      });

      const data = await response.json();
      if (!response.ok) {
        throwError(data);
      } else if (data.success) {
        setRegisterText('Geregistreerd!');
        router.push('/setup');
      } else {
        setRegisterText('Registreren');
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        setErrorEmail('Netwerkfout: Probeer het later opnieuw');
      } else {
        setErrorEmail('Er is iets misgegaan. Probeer het opnieuw.');
      }
    } finally {
      clearTimeout(timeout);              
      setLoadingStatus(false);           
    }
  };

  const styles = getStyles(isDark);

  const PasswordCriteriaList = ({ criteria }: { criteria: typeof passwordCriteria }) => (
    <View style={styles.criteriaContainer}>
      <Text style={criteria.length ? styles.criteriaMet : styles.criteriaNietMet}>• Minimaal 8 tekens</Text>
      <Text style={criteria.uppercase ? styles.criteriaMet : styles.criteriaNietMet}>• Minstens 1 hoofdletter</Text>
      <Text style={criteria.lowercase ? styles.criteriaMet : styles.criteriaNietMet}>• Minstens 1 kleine letter</Text>
      <Text style={criteria.number ? styles.criteriaMet : styles.criteriaNietMet}>• Minstens 1 cijfer</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.innerContainer}>
          <Image source={require('../assets/images/EcoBite2.png')} style={styles.logo} />
          <Text style={styles.title}>Registreren</Text>
          <Text style={styles.subtitle}>Vul uw gegevens in om door te gaan</Text>

          <Input
            placeholder="Gebruikersnaam"
            placeholderTextColor={isDark ? '#aaa' : '#777'}
            value={username}
            onChangeText={setUsername}
            errorMessage={errorMessageUsername}
            inputStyle={styles.inputText}
            inputContainerStyle={styles.inputContainer}
          />

          <Input
            placeholder="E-mailadres"
            placeholderTextColor={isDark ? '#aaa' : '#777'}
            value={newemail}
            onChangeText={setEmail}
            errorMessage={errorMessageEmail}
            inputStyle={styles.inputText}
            inputContainerStyle={styles.inputContainer}
          />

          <Input
            placeholder="Wachtwoord"
            placeholderTextColor={isDark ? '#aaa' : '#777'}
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              validatePassword(text);
            }}
            errorMessage={errorMessagePassword}
            inputStyle={styles.inputText}
            inputContainerStyle={styles.inputContainer}
          />

          <PasswordCriteriaList criteria={passwordCriteria} />

          <Button
            loading={buttonLoading}
            buttonStyle={styles.button}
            onPress={register}
            title={registerText}
            titleStyle={styles.buttonText}
          />

          <Text style={styles.loginText}>
            Al een account?
            <Link href="/login" asChild>
              <Text style={styles.loginLink}> Inloggen</Text>
            </Link>
          </Text>
        </View>
      </KeyboardAvoidingView>

      <View style={styles.linkContainer}>
        <Link href="/terms" asChild>
          <TouchableOpacity>
            <Text style={styles.link}>Servicevoorwaarden</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/privacy_policy" asChild>
          <TouchableOpacity>
            <Text style={styles.link}>Privacybeleid</Text>
          </TouchableOpacity>
        </Link>
      </View>
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
      padding: 20,
      justifyContent: 'flex-end',
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
    button: {
      backgroundColor: '#2DBE60',
      padding: 14,
      borderRadius: 10,
      marginTop: 10,
      width: '95%',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'ABeeZee',
    },
    loginText: {
      marginTop: 20,
      color: isDark ? '#aaa' : '#666',
      fontFamily: 'ABeeZee',
    },
    loginLink: {
      color: '#2DBE60',
      fontWeight: 'bold',
      fontFamily: 'ABeeZee',
    },
    linkContainer: {
      alignItems: 'center',
      paddingVertical: 20,
    },
    link: {
      color: '#2DBE60',
      fontFamily: 'ABeeZee',
      fontWeight: 'bold',
      fontSize: 14,
      paddingVertical: 4,
    },
    criteriaContainer: {
      alignSelf: 'flex-start',
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    criteriaMet: {
      color: 'green',
      fontFamily: 'ABeeZee',
      fontSize: 14,
    },
    criteriaNietMet: {
      color: 'red',
      fontFamily: 'ABeeZee',
      fontSize: 14,
    },
  });

export default RegistrationScreen;
