import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, SafeAreaView } from 'react-native';
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

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const weetjes = [
    "Je kunt groentenresten gebruiken om je eigen bouillon te maken.",
    "Ongeveer 1/3 van al het voedsel wereldwijd wordt verspild.",
    "Brood is het meest verspilde product in Nederland.",
    "Restjes invriezen is een makkelijke manier om voedselverspilling tegen te gaan.",
    "Een gemiddelde Nederlander verspilt jaarlijks zo’n 34 kilo voedsel.",
    "Je neus is een goede indicator: voedsel is vaak nog goed, ook na de houdbaarheidsdatum.",
    "Schillen van groenten bevatten vaak de meeste voedingsstoffen.",
    "Bewaar tomaten buiten de koelkast voor de beste smaak.",
    "Een goed georganiseerde koelkast helpt verspilling te verminderen.",
    "Gebruik oudere ingrediënten eerst: 'first in, first out' principe!"
];

const HomeScreen = () => {
    const [fontsLoaded] = useFonts({
        'ABeeZee': require('../../assets/fonts/ABeeZee.ttf'),
    });

    const animatedRef = useAnimatedRef<Animated.ScrollView>();
    const scrollY = useScrollViewOffset(animatedRef);
    const maxScroll = 400;

    const [co2Reduction, setCo2Reduction] = useState(0);
    const progress = useSharedValue(0);
    const [greeting, setGreeting] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [dailyFact, setDailyFact] = useState('');

    const greetingOpacity = useSharedValue(0);
    const greetingTranslateY = useSharedValue(10);

    useEffect(() => {
        progress.value = withTiming(75, { duration: 2000 });
        setCo2Reduction(75);

        const currentHour = new Date().getHours();
        let timeGreeting = '';
        if (currentHour < 12) {
            timeGreeting = 'Goedemorgen 🌅';
        } else if (currentHour < 18) {
            timeGreeting = 'Goedemiddag 🌤️';
        } else {
            timeGreeting = 'Goedenavond 🌙';
        }
        setGreeting(timeGreeting);

        const today = new Date();
        const formattedDate = today.toLocaleDateString('nl-NL', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        setCurrentDate(formattedDate);

        // ✅ Kies weetje op basis van de dag
        const index = today.getDate() % weetjes.length;
        setDailyFact(weetjes[index]);

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
        let reddiff = red1 - red2, greendiff = green1 - green2, bluediff = blue1 - blue2;
        let red = red1 - (reddiff / maxScroll * scrollY.value);
        let green = green1 - (greendiff / maxScroll * scrollY.value);
        let blue = blue1 - (bluediff / maxScroll * scrollY.value);
        return { backgroundColor: `rgb(${red}, ${green}, ${blue})` };
    });

    const getTreeImage = () => {
        if (co2Reduction >= 80) return require('../../assets/images/tree5.png');
        if (co2Reduction >= 60) return require('../../assets/images/tree4.png');
        if (co2Reduction >= 40) return require('../../assets/images/tree3.png');
        if (co2Reduction >= 20) return require('../../assets/images/tree2.png');
        return require('../../assets/images/tree1.png');
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Animated.View style={[styles.container, backgroundColor]}>
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

                        {/* ✅ Dagelijks weetje */}
                        <Animated.View style={[styles.factContainer, greetingStyle]}>
                            <Text style={styles.factTitle}>Wist je dat?</Text>
                            <Text style={styles.factText}>{dailyFact}</Text>
                        </Animated.View>

                        <View style={styles.divider} />
                    </View>

                    <View style={styles.statsContainer}>
                        <Text style={styles.statsTitle}>Jouw statistieken:</Text>
                        <Svg height="150" width="150" viewBox="0 0 100 100">
                            <Circle cx="50" cy="50" r="40" stroke="#ffffff66" strokeWidth="8" fill="none" />
                            <AnimatedCircle
                                cx="50"
                                cy="50"
                                r="40"
                                stroke="#66C466"
                                strokeWidth="8"
                                strokeDasharray="251.2"
                                animatedProps={animatedProps}
                                fill="none"
                                strokeLinecap="round"
                            />
                        </Svg>
                        <Text style={styles.statsPercentage}>{co2Reduction}%</Text>
                        <Text style={styles.statsText}>CO2-reductie</Text>
                    </View>

                    <View style={styles.groundContainer}>
                        <Text style={styles.groundTitle}>Jouw stukje grond:</Text>
                        <Image source={getTreeImage()} style={styles.treeImage} />
                    </View>
                </ScrollView>
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContainer: { alignItems: 'center', paddingBottom: 500 },
    header: { padding: 20, alignItems: 'center' },
    logoContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    logo: { width: 50, height: 50, resizeMode: 'contain', marginRight: 10 },
    title: { fontSize: 24, fontWeight: 'bold', fontFamily: 'ABeeZee' },
    darkGreen: { color: '#006400' },
    lightGreen: { color: '#66C466' },
    greetingText: {
        fontSize: 22, fontWeight: '600', color: 'white', marginTop: 10,
        fontFamily: 'ABeeZee', textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3,
    },
    dateText: {
        fontSize: 16, color: 'white', fontFamily: 'ABeeZee', marginTop: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.3)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2,
    },
    factContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 12,
        padding: 12,
        marginTop: 10,
        marginBottom: 10,
        width: '90%',
    },
    factTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'ABeeZee',
        marginBottom: 4,
    },
    factText: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'ABeeZee',
    },
    statsContainer: {
        marginVertical: 20,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    statsTitle: { fontSize: 18, fontWeight: 'bold', color: 'white', fontFamily: 'ABeeZee' },
    statsText: { fontSize: 16, color: 'white', fontFamily: 'ABeeZee' },
    groundContainer: {
        marginVertical: 20,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 15,
        borderRadius: 10,
        width: '80%',
    },
    groundTitle: { fontSize: 18, fontWeight: 'bold', color: 'white', fontFamily: 'ABeeZee' },
    treeImage: { width: 150, height: 150, resizeMode: 'contain', marginTop: 10 },
    divider: { height: 1, backgroundColor: 'white', width: '80%', marginTop: 15, marginBottom: 10, opacity: 0.4 },
    statsPercentage: {
        position: 'absolute',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#66FF66',
        fontFamily: 'ABeeZee',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        marginTop: 80,
    },
});

export default HomeScreen;
