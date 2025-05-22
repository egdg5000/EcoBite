import { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, Dimensions, Animated } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';  // Voeg Ionicons toe voor iconen

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

const { width, height } = Dimensions.get("window"); // Haal de schermgrootte op

export default function App() {
  return (
    <Splash>
      <MainScreen />
    </Splash>
  );
}

function Splash({ children }: { children: React.ReactNode }) {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, maak eventuele API-aanroepen hier
        await Font.loadAsync({ 'ABeeZee': require('../assets/fonts/ABeeZee.ttf') });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      // Dit vertelt het splash scherm om direct te verdwijnen!
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      onLayout={onLayoutRootView}>
      {children}
    </View>
  );
}

async function checkLogin() {
  const router = useRouter();
  const response = await fetch('https://edg5000.com/users/loginStatus', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    console.log("Something went wrong");
    console.log(response);
  }
  if (data.success) {
    console.log('Logged in!');
    router.push('/home');
  } else console.log(response);
}

function MainScreen() {
  checkLogin();
  
  const [logoOpacity] = useState(new Animated.Value(0));
  const [buttonOpacity] = useState(new Animated.Value(0));
  const [buttonTranslateY] = useState(new Animated.Value(20));

  useEffect(() => {
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    Animated.timing(buttonOpacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    Animated.timing(buttonTranslateY, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [logoOpacity, buttonOpacity, buttonTranslateY]);

  return (
    <ImageBackground
      source={require("../assets/images/spinach.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Animated.Image 
          source={require("../assets/images/EcoBite2.png")}
          style={[styles.logo, { opacity: logoOpacity }]}
        />
        <Text style={styles.title}>Welkom</Text>

        <Animated.View style={[styles.buttonContainer, { opacity: buttonOpacity, transform: [{ translateY: buttonTranslateY }] }]}>
          <Link href='/Starting' asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Aan de slag</Text>
            </TouchableOpacity>
          </Link>
        </Animated.View>

        <Link href='/login' asChild>
          <TouchableOpacity style={styles.linkContainer}>
            <Ionicons name="log-in-outline" size={24} color="#fff" />
            <Text style={styles.link}>Ik heb al een account</Text>
          </TouchableOpacity>
        </Link>
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
    fontFamily: "ABeeZee",
  },
  buttonContainer: {
    width: "80%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "ABeeZee",
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  link: {
    marginLeft: 5,
    color: "#fff",
    textDecorationLine: "underline",
    fontFamily: "ABeeZee",
  },
});

