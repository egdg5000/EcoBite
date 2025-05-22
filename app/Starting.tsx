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

const EcoBiteScreen = () => {
  const router = useRouter();
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

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/images/ingredients.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
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
            placeholderTextColor="#777"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <TouchableOpacity style={styles.startButton} onPress={handleContinue}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '65%',
    top: 0,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 30,
    marginTop: '65%',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 90,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'ABeeZee-Regular',
    marginBottom: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
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
    marginTop: 20,
  },
  input: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    fontFamily: 'ABeeZee-Regular',
  },
  startButton: {
    backgroundColor: '#2DBE60',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'ABeeZee-Regular',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  footerText: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'ABeeZee-Regular',
  },
  footerLink: {
    fontSize: 14,
    color: '#2DBE60',
    fontWeight: '600',
    fontFamily: 'ABeeZee-Regular',
  },
});
