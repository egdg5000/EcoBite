import React from "react";
import { View, Text, Image, ImageBackground, StyleSheet, ScrollView, Dimensions, TouchableOpacity, SafeAreaView } from "react-native";
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get("window");

const AboutScreen = () => {
   const [fontsLoaded] = useFonts({
      'ABeeZee': require('../assets/fonts/ABeeZee.ttf'),
    });

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Sluitknopje */}
      <TouchableOpacity style={styles.closeButton} onPress={() => alert("Sluitknop geklikt!")}> 
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>

      <ImageBackground 
        source={require("../assets/images/foodmaken.png")} 
        style={styles.background}
        imageStyle={styles.imageStyle}
      >
        {/* Semi-transparante overlay */}
        <View style={styles.overlay} />

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={require("../assets/images/EcoBite2.png")} style={styles.logo} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Over ons</Text>
          
          <View style={styles.section}>
            <Text style={styles.subtitle}>Waarom deze app?</Text>
            <Text style={styles.text}>
              Voedselverspilling is een groot probleem, en wij willen daar iets aan doen! Onze app helpt je slimmer omgaan met je boodschappen en minder eten weg te gooien.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.subtitle}>Hoe werkt het?</Text>
            <Text style={styles.text}>
              Scan simpelweg je producten en ontdek direct recepten met wat je al in huis hebt. Gamification maakt besparen leuk en inzichtelijk!
            </Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.subtitle}>Onze missie</Text>
            <Text style={styles.text}>
              Wij geloven dat technologie kan bijdragen aan een duurzamere wereld. Met onze app maken we het makkelijker om creatief te koken en voedselverspilling te verminderen.
            </Text>
          </View>
          
          <Text style={styles.footer}>
            Dit project is een initiatief van Björn Alderden, Bryan Keislair, Paul Becking, Vincent Nijboer en Leon Hermans.
          </Text>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  imageStyle: {
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  logoContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
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
  content: {
    flexGrow: 1,
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    fontFamily: "ABeeZee",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#A0E07C",
    textAlign: "center",
    fontFamily: "ABeeZee",
    marginBottom: 10,
  },
  section: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: "90%",
  },
  text: {
    fontSize: width * 0.045,
    color: "white",
    lineHeight: width * 0.06,
    textAlign: "center",
    fontFamily: "ABeeZee",
  },
  footer: {
    fontSize: width * 0.04,
    color: "lightgray",
    textAlign: "center",
    marginTop: 20,
    fontFamily: "ABeeZee",
  },
});

export default AboutScreen;