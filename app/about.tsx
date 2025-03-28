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
        <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>

      <ImageBackground 
        source={require("../assets/images/foodmaken.png")} 
        style={styles.background} 
        imageStyle={styles.imageStyle}
      >
        {/* Logo linksboven van de pagina */}
        <View style={styles.logoContainer}>
          <Image source={require("../assets/images/EcoBite2.png")} style={styles.logo} />
        </View>

        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Over ons</Text>
          <Text style={styles.text}>
            Voedselverspilling is een groot probleem. Wij willen daar iets aan doen!{"\n\n"}
            Ons team heeft een innovatieve app ontwikkeld die je helpt om slimmer om te gaan met je boodschappen. 
            Door simpelweg je producten in je koelkast te scannen, laat onze app je direct zien welke recepten je ermee kunt maken.{"\n\n"}
            Zo hoef je minder eten weg te gooien en bespaar je geld. En door gebruik te maken van gamification kan je op een leuke 
            speelse wijze bijhouden hoeveel voedsel jij bespaart.{"\n\n"}
            Wij geloven dat technologie kan bijdragen aan een duurzamere wereld en met onze app willen wij het makkelijker voor 
            iedereen maken om creatief te koken met wat je in huis hebt.{"\n\n"}
          </Text>
          <Text style={styles.footer}>
            Dit project is een initiatief van Björn Alderden, Bryan Keisliar, Paul Becking, Vincent Nijboer en Leon Hermans.
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
    opacity: 0.8,
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
    top: 50, // Gebruik SafeAreaView, <-- dit is de afstand vanaf de bovenkant
    right: 20,
    zIndex: 100, // knopje boven
    backgroundColor: "rgba(0,0,0,0.6)", // donkere achtergrond voor zichtbaarheid
    borderRadius: 25,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingHorizontal: 25,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 15,
    fontFamily: 'ABeeZee', 
  },
  text: {
    fontSize: width * 0.045,
    color: "white",
    lineHeight: width * 0.06,
    textAlign: "center",
    fontFamily: 'ABeeZee', 
  },
  footer: {
    fontSize: width * 0.04,
    color: "lightgray",
    textAlign: "center",
    marginTop: 20,
    fontFamily: 'ABeeZee', 
  },
});

export default AboutScreen;
