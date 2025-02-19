import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window"); // Haal de schermgrootte op

const Login = () => {
  return (
    <ImageBackground
      source={require("../assets/images/mobilebackground.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Image source={require("../assets/images/EcoBite2.png")} style={styles.logo} />
        <Text style={styles.title}>Welkom</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Aan de slag</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.link}>Ik heb al een account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: width,  // Maak de achtergrond net zo breed als het scherm
    height: height, // Maak de achtergrond net zo hoog als het scherm
    resizeMode: "cover", // Zorgt ervoor dat de afbeelding wordt geschaald zonder te vervormen
    justifyContent: "center", // Zorgt dat de content in het midden blijft
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Voeg een subtiele overlay toe voor betere leesbaarheid
  },
  logo: {
    width: 150,

    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 10,
    color: "#4CAF50",
    textDecorationLine: "underline",
  },
});

export default Login;