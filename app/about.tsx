import React from "react";
import { View, Text, Image, ImageBackground, StyleSheet, ScrollView, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window"); // Schermafmetingen ophalen

const AboutScreen = () => {
  return (
    <ImageBackground 
      source={require("../assets/images/foodmaken.png")} 
      style={styles.background} 
      imageStyle={styles.imageStyle} // Zorgt dat de afbeelding goed schaalt
    >
      {/* Container voor het logo */}
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
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  imageStyle: {
    opacity: 0.9, // Maakt de afbeelding iets doorzichtig voor betere leesbaarheid
  },
  logoContainer: {
    position: "absolute",
    top: 40, // Iets naar beneden zodat het niet tegen de rand zit
    left: 20,
    zIndex: 10, // Zorgt ervoor dat het logo bovenaan blijft
  },
  logo: {
    width: 60, // Pas aan op basis van je logo
    height: 60,
    resizeMode: "contain",
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingHorizontal: 25,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Donkere overlay voor betere leesbaarheid
    justifyContent: "center",
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 15,
  },
  text: {
    fontSize: width * 0.045,
    color: "white",
    lineHeight: width * 0.06,
    textAlign: "center",
  },
  footer: {
    fontSize: width * 0.04,
    color: "lightgray",
    textAlign: "center",
    marginTop: 20,
  },
});

export default AboutScreen;
