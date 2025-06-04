import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { useTheme } from './context/ThemeContext';

export default function PrivacyPolicyScreen() {
  const [fontsLoaded] = useFonts({
    'ABeeZee': require('../assets/fonts/ABeeZee.ttf'),
  });

  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const router = useRouter();

  if (!fontsLoaded) return null;

  const handleBackPress = () => {
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#FFF' }}>
      <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#fff' }]}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>Privacybeleid</Text>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={[styles.content, { color: isDark ? '#ccc' : '#333' }]}>
            Dit privacybeleid legt uit hoe we uw persoonlijke gegevens verzamelen, gebruiken en beschermen wanneer u gebruik maakt van onze app.
          </Text>

          {sections.map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={[styles.subtitle, { color: isDark ? '#66BB6A' : '#333' }]}>{section.title}</Text>
              <Text style={[styles.content, { color: isDark ? '#ccc' : '#333' }]}>{section.text}</Text>
              <View style={[styles.divider, { backgroundColor: isDark ? '#66BB6A' : '#28a745' }]} />
            </View>
          ))}

          <Text style={[styles.content, { color: isDark ? '#ccc' : '#333' }]}>
            Door gebruik te maken van onze app, gaat u akkoord met dit privacybeleid en geeft u toestemming voor de verwerking van uw gegevens zoals beschreven.
          </Text>
        </ScrollView>

        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Terug</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const sections = [
  {
    title: '1. Gegevensverzameling',
    text: 'Wij verzamelen alleen de gegevens die noodzakelijk zijn voor het leveren van onze diensten, zoals uw naam, e-mailadres en gegevens die u invoert of verstrekt bij het gebruik van de app (zoals ingrediënten, recepten en voorkeuren).'
  },
  {
    title: '2. Gebruik van Gegevens',
    text: 'De gegevens die we verzamelen, worden gebruikt om u een betere gebruikerservaring te bieden, zoals het aanbevelen van recepten, het verzenden van meldingen, en het verbeteren van de functionaliteit van de app. We zullen uw gegevens niet voor andere doeleinden gebruiken zonder uw toestemming.'
  },
  {
    title: '3. Gegevensbeveiliging',
    text: 'We nemen de nodige beveiligingsmaatregelen om uw persoonlijke gegevens te beschermen tegen verlies, misbruik of ongeautoriseerde toegang. Desondanks kunnen we geen absolute veiligheid garanderen, aangezien geen enkele gegevensoverdracht of opslagmethode volledig veilig is.'
  },
  {
    title: '4. Delen van Gegevens',
    text: 'We zullen uw gegevens niet delen met derden, tenzij dit wettelijk verplicht is of om onze diensten te verbeteren (bijvoorbeeld door gebruik te maken van een serviceprovider voor het leveren van bepaalde functies).'
  },
  {
    title: '5. Uw Rechten',
    text: 'U heeft het recht om uw persoonlijke gegevens in te zien, te corrigeren of te verwijderen. Neem contact met ons op als u toegang wilt krijgen tot of wijzigingen wilt aanbrengen in uw gegevens.'
  },
  {
    title: '6. Wijzigingen in dit Privacybeleid',
    text: 'We behouden ons het recht voor om dit privacybeleid op elk moment te wijzigen. Eventuele wijzigingen worden van kracht zodra ze op deze pagina worden gepubliceerd. Het is uw verantwoordelijkheid om dit beleid regelmatig te controleren.'
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'ABeeZee',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'ABeeZee',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'ABeeZee',
  },
  section: {
    marginBottom: 20,
  },
  divider: {
    height: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'ABeeZee',
  },
});
