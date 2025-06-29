import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { useTheme } from './context/ThemeContext';

export default function TermsScreen() {
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
      <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#FFF' }]}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>Servicevoorwaarden</Text>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={[styles.content, { color: isDark ? '#ccc' : '#333' }]}>
            Welkom bij onze servicevoorwaarden. Door gebruik te maken van deze app, gaat u akkoord met de volgende voorwaarden:
          </Text>

          <View style={styles.section}>
            <Text style={[styles.subtitle, { color: isDark ? '#66BB6A' : '#333' }]}>1. Gebruik van de App</Text>
            <Text style={[styles.content, { color: isDark ? '#ccc' : '#333' }]}>
              U stemt ermee in de app alleen te gebruiken voor legitieme en ethische doeleinden. Het is verboden om de app te gebruiken voor illegale activiteiten, waaronder maar niet beperkt tot frauduleuze handelingen, misbruik of verstoring van de app.
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: isDark ? '#66BB6A' : '#28a745' }]} />

          <View style={styles.section}>
            <Text style={[styles.subtitle, { color: isDark ? '#66BB6A' : '#333' }]}>2. Intellectuele Eigendom</Text>
            <Text style={[styles.content, { color: isDark ? '#ccc' : '#333' }]}>
              Alle inhoud van de app, inclusief tekst, afbeeldingen, logo's en software, is eigendom van de ontwikkelaar of zijn licentiegevers en wordt beschermd door auteursrechten en andere intellectuele eigendomsrechten. Het is niet toegestaan deze inhoud te kopiëren, distribueren of anderszins te gebruiken zonder voorafgaande schriftelijke toestemming.
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: isDark ? '#66BB6A' : '#28a745' }]} />

          <View style={styles.section}>
            <Text style={[styles.subtitle, { color: isDark ? '#66BB6A' : '#333' }]}>3. Verantwoordelijkheid en Aansprakelijkheid</Text>
            <Text style={[styles.content, { color: isDark ? '#ccc' : '#333' }]}>
              Wij zijn niet verantwoordelijk voor enige schade, verlies of kosten die voortvloeien uit het gebruik van de app, inclusief maar niet beperkt tot het gebruik van informatie die via de app wordt verstrekt. De app wordt geleverd "zoals deze is", zonder garanties van welke aard dan ook.
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: isDark ? '#66BB6A' : '#28a745' }]} />

          <View style={styles.section}>
            <Text style={[styles.subtitle, { color: isDark ? '#66BB6A' : '#333' }]}>4. Privacy en Gegevensverwerking</Text>
            <Text style={[styles.content, { color: isDark ? '#ccc' : '#333' }]}>
              Uw gegevens worden verwerkt in overeenstemming met ons{' '}
              <Text
                style={[styles.link, { color: isDark ? '#4FC3F7' : '#007BFF' }]}
                onPress={() => router.push('/privacy_policy')}
              >
                privacybeleid
              </Text>. We zullen uw persoonlijke gegevens niet zonder uw toestemming verkopen aan derden. Wij nemen redelijke maatregelen om uw gegevens te beschermen, maar kunnen niet garanderen dat ze volledig veilig zijn.
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: isDark ? '#66BB6A' : '#28a745' }]} />

          <View style={styles.section}>
            <Text style={[styles.subtitle, { color: isDark ? '#66BB6A' : '#333' }]}>5. Updates en Wijzigingen van de Servicevoorwaarden</Text>
            <Text style={[styles.content, { color: isDark ? '#ccc' : '#333' }]}>
              Wij behouden ons het recht voor om deze voorwaarden op elk moment te wijzigen. Eventuele wijzigingen worden van kracht zodra ze op deze pagina worden gepubliceerd. Het is uw verantwoordelijkheid om deze voorwaarden regelmatig te controleren om op de hoogte te blijven van eventuele wijzigingen.
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: isDark ? '#66BB6A' : '#28a745' }]} />

          <View style={styles.section}>
            <Text style={[styles.subtitle, { color: isDark ? '#66BB6A' : '#333' }]}>6. Beëindiging van Toegang</Text>
            <Text style={[styles.content, { color: isDark ? '#ccc' : '#333' }]}>
              We behouden ons het recht voor om uw toegang tot de app op elk moment te beëindigen, zonder voorafgaande kennisgeving, als we van mening zijn dat u de voorwaarden heeft geschonden of anderszins onrechtmatig handelt.
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: isDark ? '#66BB6A' : '#28a745' }]} />

          <View style={styles.section}>
            <Text style={[styles.subtitle, { color: isDark ? '#66BB6A' : '#333' }]}>7. Toepasselijk Recht en Geschillen</Text>
            <Text style={[styles.content, { color: isDark ? '#ccc' : '#333' }]}>
              Deze voorwaarden vallen onder de wetgeving van het Koninkrijk der Nederlanden, en eventuele geschillen zullen worden voorgelegd aan de bevoegde rechtbanken in de gemeente Utrecht.
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: isDark ? '#66BB6A' : '#28a745' }]} />

          <Text style={[styles.content, { color: isDark ? '#ccc' : '#333' }]}>
            Door verder te gaan, accepteert u deze voorwaarden en stemt u in met ons beleid.
          </Text>
        </ScrollView>

        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Terug</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, fontFamily: 'ABeeZee' },
  scrollContainer: { paddingBottom: 20 },
  content: { fontSize: 16, marginBottom: 10, fontFamily: 'ABeeZee' },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, fontFamily: 'ABeeZee' },
  section: { marginBottom: 20 },
  divider: { height: 1, marginVertical: 10 },
  link: { fontWeight: 'bold', fontFamily: 'ABeeZee' },
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
