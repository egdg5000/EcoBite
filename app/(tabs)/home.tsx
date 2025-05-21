import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Image, SafeAreaView, Modal, Pressable,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue, withTiming, useAnimatedProps, useAnimatedStyle,
  useAnimatedRef, useScrollViewOffset,
} from 'react-native-reanimated';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import weetjesData from '../../assets/data/weetjes.json';

interface LeaderboardEntry {
  username: string;
  xp: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const HomeScreen = () => {
  const [fontsLoaded] = useFonts({
    ABeeZee: require('../../assets/fonts/ABeeZee.ttf'),
  });

  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useScrollViewOffset(animatedRef);
  const maxScroll = 400;

  const [co2Reduction, setCo2Reduction] = useState(0);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [xpForNextLevel, setXpForNextLevel] = useState(100);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [streakDays, setStreakDays] = useState(5);

  const progress = useSharedValue(0);
  const [greeting, setGreeting] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [weetje, setWeetje] = useState('');
  const [showStreakPopup, setShowStreakPopup] = useState(false);

  const greetingOpacity = useSharedValue(0);
  const greetingTranslateY = useSharedValue(10);

  useEffect(() => {
    const fetchProgress = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) return;

      try {
        const response = await fetch(`https://edg5000.com/gamification/${userId}`);
        const data = await response.json();
        setXp(data.xp || 0);
        setLevel(data.level || 1);
        setCo2Reduction(parseFloat(data.co2_saved) || 0);
        setXpForNextLevel(data.xp_for_next_level || 100);
      } catch (err) {
        console.error('Fout bij ophalen gamification:', err);
      }
    };

    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('https://edg5000.com/gamification/leaderboard');
        const data = await res.json();
        setLeaderboard(data);
      } catch (err) {
        console.error('Fout bij leaderboard ophalen:', err);
      }
    };

    fetchProgress();
    fetchLeaderboard();

    const currentHour = new Date().getHours();
    setGreeting(
      currentHour < 12
        ? 'Goedemorgen 🌅'
        : currentHour < 18
        ? 'Goedemiddag 🌤️'
        : 'Goedenavond 🌙'
    );

    const today = new Date();
    const formattedDate = today.toLocaleDateString('nl-NL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    setCurrentDate(formattedDate);

    const startDate = new Date(2024, 0, 1);
    const daysSinceStart = Math.floor(
      (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const index = daysSinceStart % weetjesData.length;
    setWeetje(weetjesData[index].feit);

    greetingOpacity.value = withTiming(1, { duration: 800 });
    greetingTranslateY.value = withTiming(0, { duration: 800 });
  }, []);
  const greetingStyle = useAnimatedStyle(() => ({
    opacity: greetingOpacity.value,
    transform: [{ translateY: greetingTranslateY.value }],
  }));

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: 251.2 - (progress.value / 100) * 251.2,
  }));

  const backgroundColor = useAnimatedStyle(() => {
    let red1 = 135, green1 = 206, blue1 = 235;
    let red2 = 107, green2 = 62, blue2 = 38;
    let red = red1 - ((red1 - red2) / maxScroll) * scrollY.value;
    let green = green1 - ((green1 - green2) / maxScroll) * scrollY.value;
    let blue = blue1 - ((blue1 - blue2) / maxScroll) * scrollY.value;
    return { backgroundColor: `rgb(${red}, ${green}, ${blue})` };
  });

  const xpProgress = Math.min(xp / xpForNextLevel, 1);

  return (
    <Animated.View style={[styles.container, backgroundColor]}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} ref={animatedRef}>
          <View style={styles.header}>
            <Text style={styles.title}>Welkom terug!</Text>
            <Animated.Text style={[styles.greetingText, greetingStyle]}>{greeting}</Animated.Text>
            <Animated.Text style={[styles.dateText, greetingStyle]}>{currentDate}</Animated.Text>

            <View style={styles.factContainer}>
                <Text style={styles.factLabel}>💡 Wist je dat?</Text>
                <Text style={styles.factText}>{weetje}</Text>
            </View>

            <View style={styles.divider} />
          </View>

          <View style={styles.treeContainer}>
            <Image
              source={
                co2Reduction >= 80
                  ? require('../../assets/images/tree5.png')
                  : co2Reduction >= 60
                  ? require('../../assets/images/tree4.png')
                  : co2Reduction >= 40
                  ? require('../../assets/images/tree3.png')
                  : co2Reduction >= 20
                  ? require('../../assets/images/tree2.png')
                  : require('../../assets/images/tree1.png')
              }
              style={styles.treeImage}
            />
            <Text style={styles.co2Label}>{co2Reduction}% CO₂-reductie</Text>
          </View>

          <View style={styles.xpContainer}>
            <Text style={styles.xpTitle}>Level {level}</Text>
            <View style={styles.xpBarBackground}>
              <View style={[styles.xpBarFill, { width: `${xpProgress * 100}%` }]} />
            </View>
            <Text style={styles.xpText}>{xp} / {xpForNextLevel} XP</Text>
            <Pressable onPress={() => setShowStreakPopup(true)} style={styles.streakContainer}>
              <Ionicons name="flame-outline" size={24} color="#FFA500" />
              <Text style={styles.streakText}>{streakDays} dagen streak</Text>
            </Pressable>
          </View>

          <Modal
            visible={showStreakPopup}
            animationType="fade"
            transparent
            onRequestClose={() => setShowStreakPopup(false)}
          >
            <View style={styles.modalBackdrop}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>🔥 Streak behouden</Text>
                <Text style={styles.modalText}>
                  Behoud je streak door dagelijks een product te scannen en recepten te maken.
                </Text>
                <Pressable
                  style={styles.modalButton}
                  onPress={() => setShowStreakPopup(false)}
                >
                  <Text style={styles.modalButtonText}>Oké!</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <View style={styles.leaderboardContainer}>
            <Text style={styles.leaderboardTitle}>🏆 Leaderboard</Text>
            {leaderboard.map((entry, index) => (
              <Text key={index} style={styles.leaderboardText}>
                {index + 1}. {entry.username} - {entry.xp} XP
              </Text>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 100,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'ABeeZee',
    color: '#fff',
  },
  greetingText: {
    fontSize: 20,
    marginTop: 10,
    color: '#fff',
    fontFamily: 'ABeeZee',
  },
  dateText: {
    fontSize: 14,
    color: '#eee',
    fontFamily: 'ABeeZee',
  },
  treeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  treeImage: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },
  co2Label: {
    fontSize: 16,
    fontFamily: 'ABeeZee',
    color: '#fff',
    marginTop: 8,
  },
  xpContainer: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  xpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'ABeeZee',
    marginBottom: 5,
  },
  xpBarBackground: {
    width: '100%',
    height: 14,
    backgroundColor: '#ffffff44',
    borderRadius: 7,
    overflow: 'hidden',
    marginBottom: 5,
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: '#66FF66',
  },
  xpText: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'ABeeZee',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  streakText: {
    color: '#FFA500',
    fontSize: 14,
    marginLeft: 5,
    fontFamily: 'ABeeZee',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'ABeeZee',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'ABeeZee',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#66C466',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'ABeeZee',
  },
  factContainer: {
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: 'rgba(255,255,255,0.25)',
        padding: 16,
        borderRadius: 15,
        width: '90%',
        borderLeftWidth: 5,
        borderLeftColor: '#66FF66',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
    },
    factLabel: {
        color: '#2E8B57',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
        fontFamily: 'ABeeZee',
        textTransform: 'uppercase',
        letterSpacing: 1,
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    factText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'ABeeZee',
        lineHeight: 22,
    },
  leaderboardContainer: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 16,
  },
  leaderboardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'ABeeZee',
  },
  leaderboardText: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'ABeeZee',
    marginBottom: 4,
  },
  divider: {
  height: 1,
  backgroundColor: 'white',
  width: '80%',
  marginTop: 15,
  marginBottom: 10,
  opacity: 0.4,
},
});

export default HomeScreen;
