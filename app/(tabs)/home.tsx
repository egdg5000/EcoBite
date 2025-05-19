import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, SafeAreaView, Modal, Pressable } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedProps,
    useAnimatedStyle,
    useAnimatedRef,
    useScrollViewOffset,
} from 'react-native-reanimated';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import weetjesData from '../../assets/data/weetjes.json';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const HomeScreen = () => {
    const [fontsLoaded] = useFonts({
        'ABeeZee': require('../../assets/fonts/ABeeZee.ttf'),
    });

    const animatedRef = useAnimatedRef<Animated.ScrollView>();
    const scrollY = useScrollViewOffset(animatedRef);
    const maxScroll = 400;

    const [co2Reduction, setCo2Reduction] = useState(0);
    const [xp, setXp] = useState(320);
    const [level, setLevel] = useState(3);
    const [xpForNextLevel, setXpForNextLevel] = useState(500);
    const [streakDays, setStreakDays] = useState(5);

    const progress = useSharedValue(0);
    const [greeting, setGreeting] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [weetje, setWeetje] = useState('');
    const [showStreakPopup, setShowStreakPopup] = useState(false);

    const greetingOpacity = useSharedValue(0);
    const greetingTranslateY = useSharedValue(10);

    useEffect(() => {
        progress.value = withTiming(75, { duration: 2000 });
        setCo2Reduction(75);

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
        const daysSinceStart = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
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
        let red = red1 - ((red1 - red2) / maxScroll * scrollY.value);
        let green = green1 - ((green1 - green2) / maxScroll * scrollY.value);
        let blue = blue1 - ((blue1 - blue2) / maxScroll * scrollY.value);
        return { backgroundColor: `rgb(${red}, ${green}, ${blue})` };
    });

    const getTreeImage = () => {
        if (co2Reduction >= 80) return require('../../assets/images/tree5.png');
        if (co2Reduction >= 60) return require('../../assets/images/tree4.png');
        if (co2Reduction >= 40) return require('../../assets/images/tree3.png');
        if (co2Reduction >= 20) return require('../../assets/images/tree2.png');
        return require('../../assets/images/tree1.png');
    };

    const xpProgress = Math.min(xp / xpForNextLevel, 1);

    return (
        <Animated.View style={[styles.container, backgroundColor]}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollContainer} ref={animatedRef} scrollEventThrottle={16}>
                    <View style={styles.header}>
                        <View style={styles.logoContainer}>
                            <Image source={require('../../assets/images/EcoBite2.png')} style={styles.logo} />
                            <Text style={styles.title}>
                                <Text style={styles.darkGreen}>Eco</Text>
                                <Text style={styles.lightGreen}>Bite</Text>
                            </Text>
                        </View>

                        <Animated.Text style={[styles.greetingText, greetingStyle]}>
                            {greeting}
                        </Animated.Text>

                        <Animated.Text style={[styles.dateText, greetingStyle]}>
                            {currentDate}
                        </Animated.Text>

                        <View style={styles.factContainer}>
                            <Text style={styles.factLabel}>💡 Wist je dat?</Text>
                            <Text style={styles.factText}>{weetje}</Text>
                        </View>

                        <View style={styles.divider} />
                    </View>

                   <View style={styles.treeStatContainer}>
                        <Text style={styles.groundTitle}>Jouw Boom:</Text>
                        <Image source={getTreeImage()} style={styles.treeImage} />

                        <View style={styles.co2MinimalBox}>
                            <Text style={styles.co2Value}>{co2Reduction}%</Text>
                            <Text style={styles.co2Label}>CO₂-reductie</Text>
                        </View>
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
                                        Behoudt je streak door dagelijks een product te scannen en recepten te maken.
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
                    </View>

                   <View style={styles.leaderboardContainer}>
                        <Text style={styles.leaderboardTitle}>🏆 Leaderboard</Text>

                        <View style={styles.podiumContainer}>
                            <View style={[styles.second]}>
                                <Text style={styles.podiumRank}>2</Text>
                                <Text style={styles.podiumName}>Tom</Text>
                                <Text style={styles.podiumXP}>980 XP</Text>
                            </View>

                            <View style={[styles.first]}>
                                <Text style={styles.podiumRank}>1</Text>
                                <Text style={styles.podiumName}>Anna</Text>
                                <Text style={styles.podiumXP}>1520 XP</Text>
                            </View>

                            <View style={[styles.third]}>
                                <Text style={styles.podiumRank}>3</Text>
                                <Text style={styles.podiumName}>Jij</Text>
                                <Text style={styles.podiumXP}>{xp} XP</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.topList}>
                            <Text style={styles.leaderboardText}>4. Sara - 750 XP</Text>
                            <Text style={styles.leaderboardText}>5. Milan - 600 XP</Text>
                            <Text style={styles.leaderboardText}>6. Noor - 580 XP</Text>
                            <Text style={styles.leaderboardText}>7. Max - 550 XP</Text>
                            <Text style={styles.leaderboardText}>8. Lotte - 510 XP</Text>
                            <Text style={styles.leaderboardText}>9. Finn - 480 XP</Text>
                            <Text style={styles.leaderboardText}>10. Isa - 450 XP</Text>
                        </View>
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
        paddingBottom: 500,
    },
    header: { padding: 20, alignItems: 'center' },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    logo: {
        width: 50, height: 50,
        resizeMode: 'contain',
        marginRight: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: "ABeeZee",
    },
    darkGreen: { color: '#006400' },
    lightGreen: { color: '#66C466' },
    greetingText: {
        fontSize: 22,
        fontWeight: '600',
        color: 'white',
        marginTop: 10,
        fontFamily: "ABeeZee",
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    dateText: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'ABeeZee',
        marginTop: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
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
    divider: {
        height: 1,
        backgroundColor: 'white',
        width: '80%',
        marginTop: 15,
        marginBottom: 10,
        opacity: 0.4,
    },
    treeStatContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    treeImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    groundContainer: {
        marginVertical: 20,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 15,
        borderRadius: 10,
        width: '80%',
    },
    groundTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: "ABeeZee",
    },
    xpContainer: {
        width: '90%',
        backgroundColor: 'rgba(0,0,0,0.25)',
        borderRadius: 12,
        padding: 15,
        marginTop: 20,
        alignItems: 'center',
    },
    xpTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
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
        color: 'white',
        fontFamily: 'ABeeZee',
    },
    streakContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    streakText: {
        color: '#FFA500',
        fontSize: 14,
        marginLeft: 5,
        fontFamily: 'ABeeZee',
    },
    leaderboardContainer: {
        width: '90%',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 12,
        padding: 15,
        marginTop: 30,
    },
    leaderboardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'ABeeZee',
        marginBottom: 8,
    },
    leaderboardText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'ABeeZee',
        marginVertical: 2,
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
    co2MinimalBox: {
        marginTop: 12,
        backgroundColor: '#ffffff22',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: '#66C466', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, 
    },
    co2Value: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'ABeeZee',
    },
    co2Label: {
        fontSize: 14,
        color: '#eee',
        marginTop: 2,
        fontFamily: 'ABeeZee',
    },
    podiumContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginVertical: 20,
        gap: 10,
    },
    first: {
        height: 130,
        width: 90,
        zIndex: 2,
        backgroundColor: '#FFD700', 
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 10,
        position: 'relative',
    },
    second: {
        height: 100,
        width: 90,
        marginTop: 30,
        backgroundColor: '#C0C0C0', 
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 10,
        position: 'relative',
    },
    third: {
        height: 90,
        width: 90,
        marginTop: 40,
        backgroundColor: '#CD7F32', 
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 10,
        position: 'relative',
    },
    podiumRank: {
        position: 'absolute',
        top: -20,
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#fff',
        color: '#66C466',
        borderRadius: 20,
        width: 30,
        height: 30,
        textAlign: 'center',
        lineHeight: 30,
        overflow: 'hidden',
    },
    podiumName: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        marginTop: 40,
        fontFamily: 'ABeeZee', 
    },
    podiumXP: {
        fontSize: 14,
        color: '#333',
        fontFamily: 'ABeeZee', 
    },
    topList: {
        marginTop: 10,
    },
});

export default HomeScreen;
