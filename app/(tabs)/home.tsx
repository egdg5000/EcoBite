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
    const progress = useSharedValue(0);
    const [greeting, setGreeting] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [weetje, setWeetje] = useState('');

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
    
        // Nieuw: dagelijks weetje kiezen
        const startDate = new Date(2024, 0, 1); // 1 januari 2024
        const daysSinceStart = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        const index = daysSinceStart % weetjesData.length;
        setWeetje(weetjesData[index].feit); // Hier alleen de feit-string doorgeven
    
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
        <Animated.View style={[styles.container, backgroundColor]}>
            <SafeAreaView style={[{ flex: 1, }]}>
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
        </SafeAreaView>
    </Animated.View>
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
    statsPercentage: {
        position: 'absolute',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#66FF66',
        fontFamily: "ABeeZee",
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        marginTop: 80,
    },
});

export default HomeScreen;
