import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Link, useRouter } from 'expo-router';
import { useTheme } from "./context/ThemeContext";


const EcoBiteScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const [fontsLoaded] = useFonts({
    'ABeeZee-Regular': require('../assets/fonts/ABeeZee.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleContinue = () => {
    if (!validateEmail(email)) {
      setEmailError('Voer een geldig e-mailadres in.');
    } else {
      setEmailError('');
      router.push({ pathname: '/register', params: { email } });
    }
  };

  const styles = getStyles(isDark);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/images/ingredients.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
        blurRadius={isDark ? 6 : 2} // subtiele blur in dark mode voor contrast
      />

      <View style={styles.overlay}>
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>Verminder uw voedselverspilling</Text>
          <Text style={styles.title}>
            <Text style={styles.ecoText}>Eco</Text>
            <Text style={styles.biteText}>Bite</Text>
          </Text>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.formContainer}
        >
          <TextInput
            style={[styles.input, emailError ? styles.inputError : null]}
            placeholder="Voer uw e-mailadres in"
            placeholderTextColor={isDark ? '#bbb' : '#777'}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <TouchableOpacity style={styles.startButton} onPress={handleContinue} activeOpacity={0.8}>
            <Text style={styles.startButtonText}>Doorgaan</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Heeft u al een account? </Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Inloggen</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EcoBiteScreen;

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#FFF',
    },
    backgroundImage: {
      position: 'absolute',
      width: '100%',
      height: '65%',
      top: 0,
      opacity: isDark ? 0.4 : 0.7,
    },
    overlay: {
      flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: 25,
      paddingBottom: 40,
      marginTop: '65%',
      backgroundColor: isDark ? 'rgba(18,18,18,0.85)' : 'rgba(255,255,255,0.85)',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      shadowColor: isDark ? '#000' : '#000',
      shadowOffset: { width: 0, height: -3 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 10,
    },
    textContainer: {
      alignItems: 'center',
      marginBottom: 10,
      marginTop: 80,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '600',
      fontFamily: 'ABeeZee-Regular',
      color: isDark ? '#B3B3B3' : '#444',
      marginBottom: 4,
    },
    title: {
      fontSize: 34,
      fontWeight: '700',
      fontFamily: 'ABeeZee-Regular',
    },
    ecoText: {
      color: '#137D3B',
      fontWeight: 'bold',
    },
    biteText: {
      color: '#2DBE60',
      fontWeight: 'bold',
    },
    formContainer: {
      marginTop: 25,
    },
    input: {
      backgroundColor: isDark ? '#222' : '#F5F5F5',
      color: isDark ? '#eee' : '#222',
      paddingVertical: 16,
      paddingHorizontal: 18,
      borderRadius: 12,
      fontSize: 16,
      borderWidth: 1,
      borderColor: isDark ? '#444' : '#ccc',
      marginBottom: 12,
      fontFamily: 'ABeeZee-Regular',
      shadowColor: isDark ? '#000' : '#aaa',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    inputError: {
      borderColor: '#FF5A5F',
    },
    errorText: {
      color: '#FF5A5F',
      fontSize: 14,
      marginBottom: 10,
      fontFamily: 'ABeeZee-Regular',
    },
    startButton: {
      backgroundColor: '#2DBE60',
      paddingVertical: 16,
      borderRadius: 14,
      alignItems: 'center',
      shadowColor: '#2DBE60',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },
    startButtonText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: '700',
      fontFamily: 'ABeeZee-Regular',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 30,
    },
    footerText: {
      fontSize: 14,
      color: isDark ? '#aaa' : '#444',
      fontFamily: 'ABeeZee-Regular',
    },
    footerLink: {
      fontSize: 14,
      color: '#2DBE60',
      fontWeight: '700',
      fontFamily: 'ABeeZee-Regular',
    },
  });
