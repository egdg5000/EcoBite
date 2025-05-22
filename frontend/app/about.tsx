import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import { useFonts } from 'expo-font';
import { useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AboutScreen() {
  const [fontsLoaded] = useFonts({
    'ABeeZee': require('../assets/fonts/ABeeZee.ttf'),
  });

  const router = useRouter();

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Over ons</Text>
        <View style={{ width: 24 }} /> {/* Spacer for alignment */}
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("../assets/images/EcoBite2.png")} style={styles.logo} />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Waarom deze app?</Text>
          <Text style={styles.cardText}>
            Voedselverspilling is een groot probleem, en wij willen daar iets aan doen! Onze app helpt je slimmer omgaan met je boodschappen en minder eten weg te gooien.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Hoe werkt het?</Text>
          <Text style={styles.cardText}>
            Scan simpelweg je producten en ontdek direct recepten met wat je al in huis hebt. Gamification maakt besparen leuk en inzichtelijk!
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Onze missie</Text>
          <Text style={styles.cardText}>
            Wij geloven dat technologie kan bijdragen aan een duurzamere wereld. Met onze app maken we het makkelijker om creatief te koken en voedselverspilling te verminderen.
          </Text>
        </View>

        <Text style={styles.footer}>
          Dit project is een initiatief van Björn Alderden, Bryan Keislair, Emmet de Graaf, Paul Becking, Vincent Nijboer en Leon Hermans.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "ABeeZee",
    color: "#333",
  },
  container: {
    padding: 20,
    alignItems: "center",
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f1f1f1",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    width: "100%",
  },
  cardTitle: {
    fontSize: 18,
    color: "#2e7d32",
    fontFamily: "ABeeZee",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    color: "#333",
    fontFamily: "ABeeZee",
    lineHeight: 22,
  },
  footer: {
    fontSize: 14,
    textAlign: "center",
    color: "#888",
    marginTop: 20,
    fontFamily: "ABeeZee",
  },
});
