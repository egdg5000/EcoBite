import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  ScrollView,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import { useFonts } from 'expo-font';
import { useTheme } from "./context/ThemeContext";

const DonateScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [fontsLoaded] = useFonts({
    'ABeeZee': require('../assets/fonts/ABeeZee.ttf'),
  });

  if (!fontsLoaded) return null;

  const openWebsite = () => {
    Linking.openURL("https://voedselbankennederland.nl/");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#ffffff' }]}>
      <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
        <Text style={[styles.closeText, { color: isDark ? "#81C784" : "#4CAF50" }]}>×</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: isDark ? "#A5D6A7" : "#2E7D32" }]}>Voedsel doneren</Text>

        <Image source={require("../assets/images/image 21.png")} style={styles.foodbankLogo} />

        <Text style={[styles.description, { color: isDark ? "#ddd" : "#333" }]}>
          Wij zetten ons in tegen voedselverspilling. Gaat u voor een langere tijd weg, en heeft u nog voedsel over dat u niet meer gaat gebruiken?
          Of heeft u nog voedsel over wat u niet meer kunt gebruiken? Veel mensen gooien het weg, maar dit kunt u ook doneren.
        </Text>

        <Text style={[styles.description, { color: isDark ? "#ddd" : "#333" }]}>
          Bijvoorbeeld bij de voedselbank, of een punt bij u in de buurt. U kunt inzamellocaties bij u in de buurt zien door op een locatie te klikken.
        </Text>

        <TouchableOpacity onPress={openWebsite} style={[styles.linkButton, { backgroundColor: isDark ? "#1e1e1e" : "#E8F5E9" }]}>
          <Text style={[styles.linkText, { color: isDark ? "#A5D6A7" : "#388E3C" }]}>→ Bezoek Voedselbanken Nederland</Text>
        </TouchableOpacity>

        <View style={[styles.divider, { backgroundColor: isDark ? "#2E7D32" : "#C8E6C9" }]} />

        <Text style={[styles.subTitle, { color: isDark ? "#A5D6A7" : "#2E7D32" }]}>Waarom doneren?</Text>
        <Text style={[styles.description, { color: isDark ? "#ccc" : "#333" }]}>
          Jaarlijks wordt er in Nederland enorm veel voedsel verspild, terwijl duizenden gezinnen moeite hebben om genoeg eten op tafel te krijgen.
          Door voedsel te doneren help je niet alleen anderen, maar draag je ook bij aan een duurzamer voedselsysteem.
        </Text>

        <View style={styles.footer}>
          <Image source={require("../assets/images/EcoBite2.png")} style={styles.logo} />
          <Text style={[styles.appName, { color: isDark ? "#A5D6A7" : "#4CAF50" }]}>EcoBite</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontWeight: "bold",
  },
  title: {
    fontSize: 26,
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
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 16,
    fontFamily: "ABeeZee",
  },
  linkButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  linkText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "ABeeZee",
  },
  divider: {
    width: "100%",
    height: 1,
    marginVertical: 24,
  },
  subTitle: {
    fontSize: 20,
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
