import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { useFonts } from 'expo-font';

export default function PrivacyPolicyScreen() {
  const [fontsLoaded] = useFonts({
    'ABeeZee': require('../assets/fonts/ABeeZee.ttf'), // Laad het lettertype
  });

  if (!fontsLoaded) {
    return null; // Wacht tot de lettertypen geladen zijn
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Privacybeleid</Text>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.content}>
          Dit privacybeleid legt uit hoe we uw persoonlijke gegevens verzamelen, gebruiken en beschermen wanneer u gebruik maakt van onze app.
        </Text>
        
        <View style={styles.section}>
          <Text style={styles.subtitle}>1. Gegevensverzameling</Text>
          <Text style={styles.content}>
            Wij verzamelen alleen de gegevens die noodzakelijk zijn voor het leveren van onze diensten, zoals uw naam, e-mailadres en gegevens die u invoert of verstrekt bij het gebruik van de app (zoals ingrediënten, recepten en voorkeuren).
          </Text>
        </View>

        <View style={styles.divider} />
        
        <View style={styles.section}>
          <Text style={styles.subtitle}>2. Gebruik van Gegevens</Text>
          <Text style={styles.content}>
            De gegevens die we verzamelen, worden gebruikt om u een betere gebruikerservaring te bieden, zoals het aanbevelen van recepten, het verzenden van meldingen, en het verbeteren van de functionaliteit van de app. We zullen uw gegevens niet voor andere doeleinden gebruiken zonder uw toestemming.
          </Text>
        </View>

        <View style={styles.divider} />
        
        <View style={styles.section}>
          <Text style={styles.subtitle}>3. Gegevensbeveiliging</Text>
          <Text style={styles.content}>
            We nemen de nodige beveiligingsmaatregelen om uw persoonlijke gegevens te beschermen tegen verlies, misbruik of ongeautoriseerde toegang. Desondanks kunnen we geen absolute veiligheid garanderen, aangezien geen enkele gegevensoverdracht of opslagmethode volledig veilig is.
          </Text>
        </View>

        <View style={styles.divider} />
        
        <View style={styles.section}>
          <Text style={styles.subtitle}>4. Delen van Gegevens</Text>
          <Text style={styles.content}>
            We zullen uw gegevens niet delen met derden, tenzij dit wettelijk verplicht is of om onze diensten te verbeteren (bijvoorbeeld door gebruik te maken van een serviceprovider voor het leveren van bepaalde functies).
          </Text>
        </View>

        <View style={styles.divider} />
        
        <View style={styles.section}>
          <Text style={styles.subtitle}>5. Uw Rechten</Text>
          <Text style={styles.content}>
            U heeft het recht om uw persoonlijke gegevens in te zien, te corrigeren of te verwijderen. Neem contact met ons op als u toegang wilt krijgen tot of wijzigingen wilt aanbrengen in uw gegevens.
          </Text>
        </View>

        <View style={styles.divider} />
        
        <View style={styles.section}>
          <Text style={styles.subtitle}>6. Wijzigingen in dit Privacybeleid</Text>
          <Text style={styles.content}>
            We behouden ons het recht voor om dit privacybeleid op elk moment te wijzigen. Eventuele wijzigingen worden van kracht zodra ze op deze pagina worden gepubliceerd. Het is uw verantwoordelijkheid om dit beleid regelmatig te controleren.
          </Text>
        </View>

        <View style={styles.divider} />
        
        <Text style={styles.content}>
          Door gebruik te maken van onze app, gaat u akkoord met dit privacybeleid en geeft u toestemming voor de verwerking van uw gegevens zoals beschreven.
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
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, fontFamily: 'ABeeZee' }, // Gebruik ABeeZee
  scrollContainer: { paddingBottom: 20 },
  content: { fontSize: 16, color: '#333', marginBottom: 10, fontFamily: 'ABeeZee' }, // Gebruik ABeeZee
  subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#333', fontFamily: 'ABeeZee' }, // Gebruik ABeeZee
  section: { marginBottom: 20 },
  divider: { height: 1, backgroundColor: '#28a745', marginVertical: 10 },
  link: { fontSize: 16, color: '#28a745', fontWeight: 'bold', textAlign: 'center', fontFamily: 'ABeeZee' }, // Gebruik ABeeZee
});