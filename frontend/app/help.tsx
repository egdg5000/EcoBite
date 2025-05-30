import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

export default function HelpPage() {
    const router = useRouter();
    const [fontsLoaded] = useFonts({
        'ABeeZee': require('../assets/fonts/ABeeZee.ttf'),
    });

    return (
        <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}> {/* SafeAreaView toegevoegd */}
            <ScrollView style={styles.container}>
                {/* Terugknop naar Accountpagina */}
                <TouchableOpacity style={styles.backButton} onPress={() => router.push('/account')}>
                    <Text style={styles.backButtonText}>← Terug naar Account</Text>
                </TouchableOpacity>
                
                <Text style={styles.title}>Help & Ondersteuning</Text>
                <Text style={styles.subtitle}>Hier vindt u antwoorden op veelgestelde vragen over het gebruik van de app.</Text>
                
                {/* Veelgestelde vragen */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Veelgestelde Vragen (FAQ)</Text>
                    
                    <TouchableOpacity style={styles.question}>
                        <Text style={styles.questionText}>🔍 Hoe scan ik een barcode?</Text>
                        <Text style={styles.answerText}>Ga naar de Homepagina en kies 'Scan Producten' wanneer u op de groene + knop drukt. Geef wanneer nodig toestemming voor het gebruiken van de camera en richt uw camera op de barcode of het product. Zorg ervoor dat de barcode of product duidelijk in beeld is. Als het product successvol is gescand wordt het automatisch toegevoegd aan uw voorraad.</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.question}>
                        <Text style={styles.questionText}>📝 Hoe voeg ik handmatig een ingrediënt toe?</Text>
                        <Text style={styles.answerText}>Druk op de knop 'Voorraad' in de navigatiebalk. Druk op '+ Nieuw ingrediënt' en voer de gegevens van het product in. U kunt ook direct naar de pagina 'Voedsel toevoegen' in het menu van de groene + knop. Dit is handig voor als u een ingrediënt zonder barcode wilt toevoegen.</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.question}>
                        <Text style={styles.questionText}>🍽️ Hoe krijg ik recepten op basis van mijn ingrediënten?</Text>
                        <Text style={styles.answerText}>Open de voorraad en selecteer de beschikbare ingrediënten. De app geeft suggesties voor recepten op basis van wat u heeft. U kunt toegevoegde ingrediënten ook toevoegen aan de favorieten, zodat u ze sneller kan selecteren voor een volgende keer.</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.question}>
                        <Text style={styles.questionText}>🌳 Hoe krijg ik XP en zorg ik voor een mooiere boom?</Text>
                        <Text style={styles.answerText}>Wanneer u met behulp van de toegevoegde producten recepten gaat maken krijgt u XP en reduceert u een bepaalde hoeveelheid CO₂. U gaat immers producten die u nog over heeft niet verspillen, wat ons doel van deze app is. Hoe de boom eruit ziet hangt af van de hoeveelheid CO₂ u heeft bespaard. Hoe meer dit is, hoe beter de boom eruit ziet.</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.question}>
                        <Text style={styles.questionText}>❤️ Waar kan ik voedsel doneren?</Text>
                        <Text style={styles.answerText}>Ga naar uw account in de app en ga naar de informatie over het doneren. Op de doneerpagina vind u meer informatie en een lijst met lokale voedselbanken (Nederlandse Voedselbanken).</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.question}>
                        <Text style={styles.questionText}>📢 Hoe stel ik meldingen in voor producten die bijna verlopen?</Text>
                        <Text style={styles.answerText}>U kunt meldingen instellen onder Account → Notificaties om herinneringen te ontvangen.</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Extra ondersteuning</Text>
                    <Text style={styles.text}>Heeft u nog vragen? Neem contact met ons op via:</Text>
                    <Text style={styles.contactText}>📧 ecobite@edg5000.com</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    backButton: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#4CAF50',
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
        color: '#4CAF50',
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: "ABeeZee",
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
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
        color: '#333',
        marginBottom: 10,
        fontFamily: "ABeeZee",
    },
    question: {
        padding: 15,
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        marginBottom: 10,
    },
    questionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        fontFamily: "ABeeZee",
    },
    answerText: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
        fontFamily: "ABeeZee",
    },
    text: {
        fontSize: 14,
        color: '#555',
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
