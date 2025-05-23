import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, SafeAreaView, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useFonts } from 'expo-font';

const DonateScreen = () => {
    const router = useRouter();

    const [fontsLoaded] = useFonts({
        'ABeeZee': require('../assets/fonts/ABeeZee.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    const openWebsite = () => {
        Linking.openURL("https://voedselbankennederland.nl/");
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Sluitknop */}
            <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
                <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Titel */}
                <Text style={styles.title}>Voedsel doneren</Text>

                {/* Voedselbank Logo */}
                <Image source={require("../assets/images/image 21.png")} style={styles.foodbankLogo} />

                {/* Inleidende tekst */}
                <Text style={styles.description}>
                    Wij zetten ons in tegen voedselverspilling. Gaat u voor een langere tijd weg, en heeft u nog voedsel over dat u niet meer gaat gebruiken?
                    Of heeft u nog voedsel over wat u niet meer kunt gebruiken? Veel mensen gooien het weg, maar dit kunt u ook doneren.
                </Text>

                {/* Suggestie */}
                <Text style={styles.description}>
                    Bijvoorbeeld bij de voedselbank, of een punt bij u in de buurt. U kunt inzamellocaties bij u in de buurt zien door op een locatie te klikken.
                </Text>

                {/* Link */}
                <TouchableOpacity onPress={openWebsite} style={styles.linkButton}>
                    <Text style={styles.linkText}>→ Bezoek Voedselbanken Nederland</Text>
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Extra uitleg of bewustmaking */}
                <Text style={styles.subTitle}>Waarom doneren?</Text>
                <Text style={styles.description}>
                    Jaarlijks wordt er in Nederland enorm veel voedsel verspild, terwijl duizenden gezinnen moeite hebben om genoeg eten op tafel te krijgen.
                    Door voedsel te doneren help je niet alleen anderen, maar draag je ook bij aan een duurzamer voedselsysteem.
                </Text>

                {/* Footer */}
                <View style={styles.footer}>
                    <Image source={require("../assets/images/EcoBite2.png")} style={styles.logo} />
                    <Text style={styles.appName}>EcoBite</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    content: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 60,
        alignItems: "center",
    },
    closeButton: {
        position: "absolute",
        top: 40,
        right: 20,
        zIndex: 10,
    },
    closeText: {
        fontSize: 28,
        color: "#4CAF50",
        fontWeight: "bold",
    },
    title: {
        fontSize: 26,
        color: "#2E7D32",
        fontWeight: "bold",
        marginBottom: 16,
        fontFamily: "ABeeZee",
        textAlign: "center",
    },
    foodbankLogo: {
        width: 100,
        height: 100,
        resizeMode: "contain",
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: "#333",
        textAlign: "center",
        lineHeight: 24,
        marginBottom: 16,
        fontFamily: "ABeeZee",
    },
    linkButton: {
        backgroundColor: "#E8F5E9",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginBottom: 24,
    },
    linkText: {
        fontSize: 16,
        color: "#388E3C",
        fontWeight: "600",
        fontFamily: "ABeeZee",
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "#C8E6C9",
        marginVertical: 24,
    },
    subTitle: {
        fontSize: 20,
        color: "#2E7D32",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 12,
        fontFamily: "ABeeZee",
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
    },
    logo: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    appName: {
        fontSize: 16,
        color: "#4CAF50",
        fontWeight: "bold",
        fontFamily: "ABeeZee",
    },
    mapButton: {
        backgroundColor: "#4CAF50",
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 14,
        marginTop: 10,
        marginBottom: 20,
    },
    mapButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "ABeeZee",
        textAlign: "center",
    },    
});

export default DonateScreen;
