import React from "react";
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, Linking, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { useFonts } from 'expo-font';

const DonateScreen = () => {
    const router = useRouter();

    const [fontsLoaded] = useFonts({
        'ABeeZee': require('../../assets/fonts/ABeeZee.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    const openWebsite = () => {
        Linking.openURL("https://voedselbankennederland.nl/");
    };

    return (
        <SafeAreaView style={styles.safeArea}> {/* SafeAreaView toegevoegd */}
            <ImageBackground source={require("../../assets/images/donate.jpg")} style={styles.background}>
                <View style={styles.overlay}>
                    
                    {/* Sluitknop */}
                    <TouchableOpacity style={styles.closeButton} onPress={() => router.push("/home")}>
                        <Text style={styles.closeText}>×</Text>
                    </TouchableOpacity>

                    {/* Titel */}
                    <Text style={styles.title}>Voedsel Doneren?</Text>

                    {/* Website Link */}
                    <TouchableOpacity onPress={openWebsite}>
                        <Text style={styles.link}>Voedselbanken Nederland</Text>
                    </TouchableOpacity>

                    {/* Voedselbank Logo */}
                    <View style={styles.logoContainer}>
                        <Image source={require("../../assets/images/image 21.png")} style={styles.foodbankLogo} />
                    </View>

                    {/* Beschrijving */}
                    <Text style={styles.description}>
                        Wij zetten ons in tegen voedselverspilling. Gaat u voor een langere tijd weg, en heeft u nog voedsel over dat u niet meer gaat gebruiken? 
                        Of heeft u nog voedsel over wat u niet meer kunt gebruiken? Veel mensen gooien het weg, maar dit kunt u ook doneren. 
                        Bijvoorbeeld bij de voedselbank, of een punt bij u in de buurt. U kunt inzamellocaties bij u in de buurt zien door op een locatie te klikken.
                    </Text>

                    {/* EcoBite Logo en Naam */}
                    <View style={styles.footer}>
                        <Image source={require("../../assets/images/EcoBite2.png")} style={styles.logo} />
                        <Text style={styles.appName}>EcoBite</Text>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    closeButton: {
        position: "absolute",
        top: 50,
        right: 20,
        zIndex: 100,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    closeText: {
        fontSize: 22,
        color: "white",
        fontWeight: "bold",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#F8A44C",
        textAlign: "center",
        marginBottom: 10,
        fontFamily: "ABeeZee",
    },
    link: {
        fontSize: 16,
        color: "#87CEEB",
        textAlign: "center",
        marginBottom: 15,
        textDecorationLine: "underline",
        fontFamily: "ABeeZee",
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    foodbankLogo: {
        width: 100,
        height: 100,
        resizeMode: "contain",
    },
    description: {
        fontSize: 16,
        color: "white",
        textAlign: "center",
        marginBottom: 20,
        lineHeight: 24,
        fontFamily: "ABeeZee",
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    appName: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
        fontFamily: "ABeeZee",
    },
});

export default DonateScreen;
