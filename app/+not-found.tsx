import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Link, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const { width } = Dimensions.get('window');
const MOLE_SIZE = 60;
const GAME_DURATION = 15; // in seconden

export default function NotFoundScreen() {
  const [fontsLoaded] = useFonts({
    'ABeeZee': require('../assets/fonts/ABeeZee.ttf'),
  });

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [activeMole, setActiveMole] = useState<number | null>(null);
  const [gameRunning, setGameRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const moleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (gameRunning) {
      startGame();
    } else {
      stopGame();
    }

    return stopGame;
  }, [gameRunning]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);

    moleIntervalRef.current = setInterval(() => {
      const newMole = Math.floor(Math.random() * 6);
      setActiveMole(newMole);
    }, 700);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          clearInterval(moleIntervalRef.current!);
          setGameRunning(false);
          setActiveMole(null);
          if (score > highScore) setHighScore(score);
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopGame = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (moleIntervalRef.current) clearInterval(moleIntervalRef.current);
    setActiveMole(null);
  };

  const handleWhack = (index: number) => {
    if (index === activeMole) {
      setScore((prev) => prev + 1);
      setActiveMole(null);
    }
  };

  const renderMoles = () => {
    return [...Array(6)].map((_, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => handleWhack(index)}
        style={styles.hole}
        activeOpacity={0.7}
      >
        {activeMole === index && (
          <Image
            source={require('../assets/images/strawberry.png')}
            style={styles.mole}
          />
        )}
      </TouchableOpacity>
    ));
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Oeps! Pagina niet gevonden' }} />
      <View style={styles.container}>
        <Image
          source={require('../assets/images/EcoBite2.png')}
          style={styles.logo}
        />
        <Ionicons name="warning" size={60} color="#ff5722" style={styles.icon} />
        <Text style={styles.errorMessage}>Oeps! Deze pagina is niet beschikbaar.</Text>
        <Link href="/home" style={styles.button}>
          Terug naar de homepagina
        </Link>

        <Text style={styles.score}>🎯 Score: {score}</Text>
        <Text style={styles.highScore}>🏆 Highscore: {highScore}</Text>
        {gameRunning && <Text style={styles.timer}>⏱️ Tijd: {timeLeft}s</Text>}

        {gameRunning ? (
          <View style={styles.gameBoard}>{renderMoles()}</View>
        ) : (
          <TouchableOpacity
            onPress={() => setGameRunning(true)}
            style={styles.playButton}
          >
            <Text style={styles.playButtonText}>Speel "Whack-a-Waste" 🍎</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  icon: {
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'ABeeZee',
  },
  button: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '80%',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'ABeeZee',
  },
  score: {
    fontSize: 18,
    marginTop: 20,
    fontFamily: 'ABeeZee',
  },
  highScore: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
    fontFamily: 'ABeeZee',
  },
  timer: {
    fontSize: 16,
    marginTop: 6,
    color: '#D84315',
    fontFamily: 'ABeeZee',
  },
  playButton: {
    backgroundColor: '#2DBE60',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'ABeeZee',
  },
  gameBoard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width - 40,
    marginTop: 20,
    justifyContent: 'space-around',
  },
  hole: {
    width: MOLE_SIZE,
    height: MOLE_SIZE,
    margin: 10,
    borderRadius: 30,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mole: {
    width: 50,
    height: 50,
  },
});
