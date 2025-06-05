import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "./context/ThemeContext";

export default function AboutScreen() {
  const [fontsLoaded] = useFonts({
    ABeeZee: require("../assets/fonts/ABeeZee.ttf"),
  });

  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDark ? "#121212" : "#fff" }]}>
      <View style={[styles.header, { borderColor: isDark ? "#333" : "#eee" }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={isDark ? "#66BB6A" : "#4CAF50"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? "#fff" : "#333" }]}>Over ons</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("../assets/images/EcoBite2.png")} style={styles.logo} />

        <View style={[styles.card, { backgroundColor: isDark ? "#1e1e1e" : "#f1f1f1" }]}>
          <Text style={[styles.cardTitle, { color: "#66BB6A" }]}>Waarom deze app?</Text>
          <Text style={[styles.cardText, { color: isDark ? "#ccc" : "#333" }]}>
            Voedselverspilling is een groot probleem, en wij willen daar iets aan doen! Onze app helpt je slimmer omgaan met je boodschappen en minder eten weg te gooien.
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: isDark ? "#1e1e1e" : "#f1f1f1" }]}>
          <Text style={[styles.cardTitle, { color: "#66BB6A" }]}>Hoe werkt het?</Text>
          <Text style={[styles.cardText, { color: isDark ? "#ccc" : "#333" }]}>
            Scan simpelweg je producten en ontdek direct recepten met wat je al in huis hebt. Gamification maakt besparen leuk en inzichtelijk!
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: isDark ? "#1e1e1e" : "#f1f1f1" }]}>
          <Text style={[styles.cardTitle, { color: "#66BB6A" }]}>Onze missie</Text>
          <Text style={[styles.cardText, { color: isDark ? "#ccc" : "#333" }]}>
            Wij geloven dat technologie kan bijdragen aan een duurzamere wereld. Met onze app maken we het makkelijker om creatief te koken en voedselverspilling te verminderen.
          </Text>
        </View>

        <Text style={[styles.footer, { color: isDark ? "#aaa" : "#888" }]}>
          Dit project is een initiatief van Björn Alderden, Bryan Keislair, Emmet de Graaf, Paul Becking en Vincent Nijboer.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "ABeeZee",
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
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    width: "100%",
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: "ABeeZee",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    fontFamily: "ABeeZee",
    lineHeight: 22,
  },
  footer: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "ABeeZee",
  },
});
