import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Link } from 'expo-router';

const EcoBiteScreen = () => {
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
        <Text style={styles.title}>
          Verminder uw voedselverspilling{'\n'}
          <Text style={styles.ecoText}>Eco</Text>
          <Text style={styles.biteText}>Bite</Text>
        </Text>

        {/* Knoppen onderaan de pagina vastzetten */}
        <View style={styles.buttonContainer}>
          {/* Aan de slag-knop */}
            <Link href="/Phonenumber" asChild>
              <TouchableOpacity style={styles.startButton}>
                <Text style={styles.startButtonText}>Aan de slag</Text>
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
        </View>

        {/* Footer: inloggen */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Heeft u al een account? </Text>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Inloggen</Text>
          </TouchableOpacity>
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
    height: '80%', // Verklein de afbeelding zodat er meer witruimte onder is
    top: '-25%', // Verplaats de afbeelding iets omhoog
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end', // Zorgt ervoor dat de inhoud onderaan blijft
    paddingHorizontal: 20,
    paddingBottom: 40, // Ruimte voor knoppen
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'ABeeZee-Regular',
    marginBottom: 40, // Extra ruimte boven de knoppen
  },
  ecoText: {
    color: '#137D3B', // Donkergroen voor "Eco"
    fontWeight: 'bold',
    fontFamily: 'ABeeZee-Regular',
  },
  biteText: {
    color: '#2DBE60', // Lichter groen voor "Bite"
    fontWeight: 'bold',
    fontFamily: 'ABeeZee-Regular',
  },
  buttonContainer: {
    width: '100%',
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