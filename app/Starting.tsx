import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Link } from 'expo-router';
import {Button, Input } from '@rneui/themed';

const EcoBiteScreen = () => {
  const [email, setEmail] = useState('');

  // Fonts inladen via Expo
  const [fontsLoaded] = useFonts({
    'ABeeZee-Regular': require('../assets/fonts/ABeeZee.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Achtergrondafbeelding over de hele pagina */}
      <Image
        source={require('../assets/images/601 1.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Overlay voor de tekst en knoppen */}
      <View style={styles.overlay}>
        {/* Titel */}
        <Text style={styles.subtitle}>Verminder uw voedselverspilling</Text>
        <Text style={styles.title}>
          <Text style={styles.ecoText}>Eco</Text>
          <Text style={styles.biteText}>Bite</Text>
        </Text>

        {/* E-mail invoerveld */}
        <Input
          style={styles.input}
          placeholder="Voer uw e-mailadres in"
          placeholderTextColor="#777"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          inputContainerStyle={{
            width: '105%',
            borderBottomColor:'transparent',
            alignSelf: 'center'
          }}
        />

        {/* Doorgaan-knop */}
        <Link href={{ pathname: "/register", params: { email } }} asChild>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Doorgaan</Text>
          </TouchableOpacity>
        </Link>

        {/* Registreren met Google */}
        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require('../assets/images/icons8-google-50.png')}
            style={styles.socialLogo}
          />
          <Text style={styles.googleButtonText}>Registreren met Google</Text>
        </TouchableOpacity>

        {/* Registreren met Facebook */}
        <TouchableOpacity style={styles.facebookButton}>
          <Image
            source={require('../assets/images/icons8-facebook-50.png')}
            style={styles.socialLogo}
          />
          <Text style={styles.facebookButtonText}>Registreren met Facebook</Text>
        </TouchableOpacity>

        {/* Footer: inloggen */}
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
    top: '-25%',
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
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  startButton: {
    backgroundColor: '#2DBE60',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
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
