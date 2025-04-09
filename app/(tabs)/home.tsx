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
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const HomeScreen = () => {
    const [fontsLoaded] = useFonts({
        'ABeeZee': require('../../assets/fonts/ABeeZee.ttf'),
    });

    const animatedRef = useAnimatedRef<Animated.ScrollView>();
    const scrollY = useScrollViewOffset(animatedRef);
    const maxScroll = 200;

    const [co2Reduction, setCo2Reduction] = useState(0);
    const progress = useSharedValue(0);
    const [greeting, setGreeting] = useState('');

    // Animatie voor begroetingstekst
    const greetingOpacity = useSharedValue(0);
    const greetingTranslateY = useSharedValue(10);

    useEffect(() => {
        progress.value = withTiming(75, { duration: 2000 });
        setCo2Reduction(75);

        // Bepaal begroeting + emoji
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

        // Start fade-in animatie
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
                    
                    {/* Header met logo en naam */}
                    <View style={styles.header}>
                        <View style={styles.logoContainer}>
                            <Image source={require('../../assets/images/EcoBite2.png')} style={styles.logo} />
                            <Text style={styles.title}>
                                <Text style={styles.darkGreen}>Eco</Text>
                                <Text style={styles.lightGreen}>Bite</Text>
                            </Text>
                        </View>

                        {/* Begroeting met animatie */}
                        <Animated.Text style={[styles.greetingText, greetingStyle]}>
                            {greeting}
                        </Animated.Text>

                    </View>

                    <View style={styles.statsContainer}>
                        <Text style={styles.statsTitle}>Jouw statistieken:</Text>
                        <Svg height="100" width="100" viewBox="0 0 100 100">
                            <Circle cx="50" cy="50" r="40" stroke="white" strokeWidth="5" fill="none" />
                            <AnimatedCircle cx="50" cy="50" r="40" stroke="green" strokeWidth="5" strokeDasharray="251.2" animatedProps={animatedProps} fill="none" />
                        </Svg>
                        <Text style={styles.statsText}>CO2-reductie: {co2Reduction}%</Text>
                    </View>

                    <View style={styles.groundContainer}>
                        <Text style={styles.groundTitle}>Jouw stukje grond:</Text>
                        <Image source={getTreeImage()} style={styles.treeImage} />
                    </View>

                    <View style={styles.bottomTextContainer}>
                        <View style={styles.bottomTextRow}>
                            <Text style={styles.bottomText}>Meer informatie over ons team? Klik icoon voor meer informatie.</Text>
                            <Link href="/about">
                                <Ionicons name="information-circle" size={24} color="green" style={styles.icon} />
                            </Link>
                        </View>
                    </View>
                </ScrollView>
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingBottom: 500,
    },
    header: {
        padding: 20,
        alignItems: 'center',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginRight: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: "ABeeZee",
    },
    darkGreen: {
        color: '#006400',
    },
    lightGreen: {
        color: '#66C466',
    },
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
    pageTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: "ABeeZee",
        textAlign: 'center',
        marginTop: 5,
    },
    statsContainer: {
        marginVertical: 20,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 15,
        borderRadius: 10,
    },
    statsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: "ABeeZee",
    },
    statsText: {
        fontSize: 16,
        color: 'white',
        fontFamily: "ABeeZee",
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
    treeImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginTop: 10,
    },
    bottomTextContainer: {
        marginTop: 40,
        padding: 15,
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 10,
    },
    bottomTextRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    bottomText: {
        fontSize: 16,
        color: 'white',
        fontFamily: "ABeeZee",
        marginRight: 10,
    },
    icon: {
        marginLeft: 10,
    },
});

export default HomeScreen;
