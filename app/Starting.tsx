import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
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

        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require('../assets/images/icons8-google-50.png')}
            style={styles.socialLogo}
          />
          <Text style={styles.googleButtonText}>Registreren met Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.facebookButton}>
          <Image
            source={require('../assets/images/icons8-facebook-50.png')}
            style={styles.socialLogo}
          />
          <Text style={styles.facebookButtonText}>Registreren met Facebook</Text>
        </TouchableOpacity>

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
    height: '80%',
    top: '-9%',
  },
  textContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 10,
    width: '95%',
    alignSelf: 'center',
    padding: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'ABeeZee-Regular',
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'ABeeZee-Regular',
    marginBottom: 20,
  },
  ecoText: {
    color: '#137D3B',
    fontWeight: 'bold',
    fontFamily: 'ABeeZee-Regular',
  },
  biteText: {
    color: '#2DBE60',
    fontWeight: 'bold',
    fontFamily: 'ABeeZee-Regular',
  },
  input: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
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
    marginBottom: 50,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'ABeeZee-Regular',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: 'center',
    marginBottom: 15,
  },
  googleButtonText: {
    color: '#000',
    fontSize: 16,
    marginLeft: 10,
    fontFamily: 'ABeeZee-Regular',
  },
  facebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4267B2',
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: 'center',
  },
  facebookButtonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 10,
    fontFamily: 'ABeeZee-Regular',
  },
  socialLogo: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
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