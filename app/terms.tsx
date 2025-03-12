import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';

export default function TermsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Servicevoorwaarden</Text>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.content}>
          Welkom bij onze servicevoorwaarden. Door gebruik te maken van deze app, gaat u akkoord met de volgende voorwaarden:
        </Text>
        
        <View style={styles.section}>
          <Text style={styles.subtitle}>1. Gebruik van de App</Text>
          <Text style={styles.content}>
            U stemt ermee in de app alleen te gebruiken voor legitieme en ethische doeleinden. Het is verboden om de app te gebruiken voor illegale activiteiten, waaronder maar niet beperkt tot frauduleuze handelingen, misbruik of verstoring van de app.
          </Text>
        </View>

        <View style={styles.divider} />
        
        <View style={styles.section}>
          <Text style={styles.subtitle}>2. Intellectuele Eigendom</Text>
          <Text style={styles.content}>
            Alle inhoud van de app, inclusief tekst, afbeeldingen, logo's en software, is eigendom van de ontwikkelaar of zijn licentiegevers en wordt beschermd door auteursrechten en andere intellectuele eigendomsrechten. Het is niet toegestaan deze inhoud te kopiëren, distribueren of anderszins te gebruiken zonder voorafgaande schriftelijke toestemming.
          </Text>
        </View>

        <View style={styles.divider} />
        
        <View style={styles.section}>
          <Text style={styles.subtitle}>3. Verantwoordelijkheid en Aansprakelijkheid</Text>
          <Text style={styles.content}>
            Wij zijn niet verantwoordelijk voor enige schade, verlies of kosten die voortvloeien uit het gebruik van de app, inclusief maar niet beperkt tot het gebruik van informatie die via de app wordt verstrekt. De app wordt geleverd "zoals deze is", zonder garanties van welke aard dan ook.
          </Text>
        </View>

        <View style={styles.divider} />
        
        <View style={styles.section}>
          <Text style={styles.subtitle}>4. Privacy en Gegevensverwerking</Text>
          <Text style={styles.content}>
            Uw gegevens worden verwerkt in overeenstemming met ons{' '}
            <Link href="/privacy_policy" style={styles.link}>privacybeleid</Link>. We zullen uw persoonlijke gegevens niet zonder uw toestemming verkopen aan derden. Wij nemen redelijke maatregelen om uw gegevens te beschermen, maar kunnen niet garanderen dat ze volledig veilig zijn.
          </Text>
        </View>

        <View style={styles.divider} />
        
        <View style={styles.section}>
          <Text style={styles.subtitle}>5. Updates en Wijzigingen van de Servicevoorwaarden</Text>
          <Text style={styles.content}>
            Wij behouden ons het recht voor om deze voorwaarden op elk moment te wijzigen. Eventuele wijzigingen worden van kracht zodra ze op deze pagina worden gepubliceerd. Het is uw verantwoordelijkheid om deze voorwaarden regelmatig te controleren om op de hoogte te blijven van eventuele wijzigingen.
          </Text>
        </View>

        <View style={styles.divider} />
        
        <View style={styles.section}>
          <Text style={styles.subtitle}>6. Beëindiging van Toegang</Text>
          <Text style={styles.content}>
            We behouden ons het recht voor om uw toegang tot de app op elk moment te beëindigen, zonder voorafgaande kennisgeving, als we van mening zijn dat u de voorwaarden heeft geschonden of anderszins onrechtmatig handelt.
          </Text>
        </View>

        <View style={styles.divider} />
        
        <View style={styles.section}>
          <Text style={styles.subtitle}>7. Toepasselijk Recht en Geschillen</Text>
          <Text style={styles.content}>
            Deze voorwaarden vallen onder de wetgeving van het Koninkrijk der Nederlanden, en eventuele geschillen zullen worden voorgelegd aan de bevoegde rechtbanken in Utrecht.
          </Text>
        </View>

        <View style={styles.divider} />
        
        <Text style={styles.content}>
          Door verder te gaan, accepteert u deze voorwaarden en stemt u in met ons beleid.
        </Text>
      </ScrollView>
      
      <Link href="/register" asChild>
        <Text style={styles.link}>Terug naar registratie</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  scrollContainer: { paddingBottom: 20 },
  content: { fontSize: 16, color: '#333', marginBottom: 10 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#333' },
  section: { marginBottom: 20 },
  divider: { height: 1, backgroundColor: '#28a745', marginVertical: 10 },
  link: { fontSize: 16, color: '#28a745', fontWeight: 'bold', textAlign: 'center', marginTop: 20 },
});