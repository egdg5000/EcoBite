import { View, Text, StyleSheet, Image } from 'react-native';
import { Link, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

export default function NotFoundScreen() {
    const [fontsLoaded] = useFonts({
        'ABeeZee': require('../assets/fonts/ABeeZee.ttf'),
    });
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Pagina niet gevonden' }} />
      <View style={styles.container}>
        <Image 
          source={require('../assets/images/EcoBite2.png')} 
          style={styles.logo}
        />
        <Ionicons name="warning" size={60} color="#ff5722" style={styles.icon} />
        <Text style={styles.errorMessage}>Oeps! Deze pagina is niet beschikbaar.</Text>
        <Link href="/home" style={styles.button}>
          Terug naar de homepagina
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, 
  },

  logo: {
    width: 150, 
    height: 150, 
    marginBottom: 20, 
  },

  icon: {
    marginBottom: 20, 
  },

  errorMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', 
    marginBottom: 20, 
    textAlign: 'center',
    fontFamily: 'ABeeZee', 
  },

  button: {
    fontSize: 18,
    fontWeight: 'bold', 
    color: '#fff', 
    backgroundColor: '#4CAF50', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    textAlign: 'center',
    width: '80%', 
    marginTop: 20, 
    fontFamily: 'ABeeZee', 
  },
});
