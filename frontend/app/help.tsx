import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { useTheme } from './context/ThemeContext';

export default function HelpPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [fontsLoaded] = useFonts({
    'ABeeZee': require('../assets/fonts/ABeeZee.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#fff' }]}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
          <TouchableOpacity style={[styles.backButton, { backgroundColor: isDark ? '#2E7D32' : '#4CAF50' }]} onPress={() => router.push('/account')}>
            <Text style={styles.backButtonText}>← Terug naar Account</Text>
          </TouchableOpacity>

          <Text style={[styles.title, { color: isDark ? '#66BB6A' : '#4CAF50' }]}>Help & Ondersteuning</Text>
          <Text style={[styles.subtitle, { color: isDark ? '#ccc' : '#555' }]}>
            Hier vindt u antwoorden op veelgestelde vragen over het gebruik van de app.
          </Text>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#eee' : '#333' }]}>Veelgestelde Vragen (FAQ)</Text>

            {faqItems.map(({ q, a, icon }, index) => (
              <TouchableOpacity key={index} style={[styles.question, { backgroundColor: isDark ? '#1e1e1e' : '#f1f1f1' }]}>
                <Text style={[styles.questionText, { color: isDark ? '#fff' : '#333' }]}>{icon} {q}</Text>
                <Text style={[styles.answerText, { color: isDark ? '#ccc' : '#555' }]}>{a}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#eee' : '#333' }]}>Extra ondersteuning</Text>
            <Text style={[styles.text, { color: isDark ? '#ccc' : '#555' }]}>
              Heeft u nog vragen? Neem contact met ons op via:
            </Text>
            <Text style={styles.contactText}>📧 ecobite@edg5000.com</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const faqItems = [
  {
    icon: "🔍",
    q: "Hoe scan ik een product?",
    a: "Ga naar de Homepagina en kies 'Scan Producten' wanneer u op de groene + knop drukt. Geef wanneer nodig toestemming voor het gebruiken van de camera en richt uw camera op de barcode of het product. Zorg ervoor dat de barcode of product duidelijk in beeld is. Als het product successvol is gescand wordt het automatisch toegevoegd aan uw voorraad.",
  },
  {
    icon: "📝",
    q: "Hoe voeg ik handmatig een ingrediënt toe?",
    a: "Druk op de knop 'Voorraad' in de navigatiebalk. Druk op '+ Nieuw ingrediënt' en voer de gegevens van het product in. U kunt ook direct naar de pagina 'Voedsel toevoegen' in het menu van de groene + knop. Dit is handig voor als u een ingrediënt zonder barcode wilt toevoegen.",
  },
  {
    icon: "🍽️",
    q: "Hoe krijg ik recepten op basis van mijn ingrediënten?",
    a: "Open de voorraad en selecteer de beschikbare ingrediënten. De app geeft suggesties voor recepten op basis van wat u heeft. U kunt toegevoegde ingrediënten ook toevoegen aan de favorieten, zodat u ze sneller kan selecteren voor een volgende keer.",
  },
  {
    icon: "🌳",
    q: "Hoe krijg ik XP en zorg ik voor een mooiere boom?",
    a: "Wanneer u met behulp van de toegevoegde producten recepten gaat maken krijgt u XP en reduceert u een bepaalde hoeveelheid CO₂. U gaat immers producten die u nog over heeft niet verspillen, wat ons doel van deze app is. Hoe de boom eruit ziet hangt af van de hoeveelheid CO₂ u heeft bespaard. Hoe meer dit is, hoe beter de boom eruit ziet.",
  },
  {
    icon: "❤️",
    q: "Waar kan ik voedsel doneren?",
    a: "Ga naar uw account in de app en ga naar de informatie over het doneren. Op de doneerpagina vind u meer informatie en een lijst met lokale voedselbanken (Nederlandse Voedselbanken).",
  },
  {
    icon: "📢",
    q: "Hoe stel ik meldingen in voor producten die bijna verlopen?",
    a: "U kunt meldingen instellen onder Account → Notificaties om herinneringen te ontvangen.",
  },
];

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'ABeeZee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: "ABeeZee",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: "ABeeZee",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: "ABeeZee",
  },
  question: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: "ABeeZee",
  },
  answerText: {
    fontSize: 14,
    marginTop: 5,
    fontFamily: "ABeeZee",
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: "ABeeZee",
  },
  contactText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    fontFamily: "ABeeZee",
  },
});
