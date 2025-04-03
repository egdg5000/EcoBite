import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
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
import { TouchableOpacity } from 'react-native';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const HomeScreen = () => {
    const [fontsLoaded] = useFonts({
        'ABeeZee': require('../../assets/fonts/ABeeZee.ttf'),
    });

    const animatedRef = useAnimatedRef<Animated.ScrollView>();
    const scrollY = useScrollViewOffset(animatedRef);
    const maxScroll = 300;

    const [treeCount, setTreeCount] = useState(0);  // Track number of trees

    const progress = useSharedValue(0);

    // Set progress value when component mounts
    useEffect(() => {
        progress.value = withTiming(75, { duration: 2000 });
        setTreeCount(Math.floor(progress.value)); // Dynamically update tree count based on progress
    }, []);

    // Animated properties for strokeDashoffset
    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: 251.2 - (progress.value / 100) * 251.2,
    }));

    // Animated style for background color based on scrollY
    const backgroundColor = useAnimatedStyle(() => {
        let red1 = 135; let green1 = 206; let blue1 = 235;
        let red2 = 107; let green2 = 62; let blue2 = 38;
        let reddiff = red1 - red2; let greendiff = green1 - green2; let bluediff = blue1 - blue2;
        let red = red1 - reddiff / maxScroll * scrollY.value;
        let green = green1 - greendiff / maxScroll * scrollY.value;
        let blue = blue1 - bluediff / maxScroll * scrollY.value;
        let color = `rgb(${red}, ${green}, ${blue})`;
        return {
            backgroundColor: color,
        };
    });

    // Scaling effect for "digging into the earth" effect
    const scaleEffect = useAnimatedStyle(() => {
        const scale = 1 + (scrollY.value / 1000); // Slight zoom in as you scroll
        return {
            transform: [{ scale }],
        };
    });

    return (
        <Animated.View style={[styles.container, backgroundColor]}> 
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                ref={animatedRef}
                scrollEventThrottle={16}
            >
                <View style={styles.header}> 
                    <View style={styles.logoContainer}>
                        {/* Logo */}
                        <Image 
                            source={require('../../assets/images/EcoBite2.png')} // Logo bestand
                            style={styles.logo} 
                        />
                        <Text style={styles.title}>
                            Eco
                            <Text style={styles.lightGreen}>Bite</Text> {/* Lichtere groen voor "Bite" */}
                        </Text>
                    </View>
                </View>
                
                <View style={styles.statsContainer}> 
                    <Text style={styles.statsTitle}>Jouw statistieken:</Text>
                    <Svg height="100" width="100" viewBox="0 0 100 100">
                        <Circle cx="50" cy="50" r="40" stroke="white" strokeWidth="5" fill="none" />
                        <AnimatedCircle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="green"
                            strokeWidth="5"
                            strokeDasharray="251.2"
                            animatedProps={animatedProps} // Animated props for the circle
                            fill="none"
                        />
                    </Svg>
                    <Text style={styles.statsText}>CO2-reductie: 75%</Text>
                </View>

                {/* Ground with trees */}
                <View style={styles.groundContainer}>
                    <Text style={styles.groundTitle}>Jouw stukje grond:</Text>
                    <Svg height="200" width="300" viewBox="0 0 300 200">
                        {/* Ground */}
                        <Rect x="0" y="100" width="300" height="100" fill="#3E8B3E" />
                        {/* Trees */}
                        {Array.from({ length: treeCount }, (_, index) => (
                            <Circle
                                key={index}
                                cx={Math.random() * 250 + 25}  // Random x position for each tree
                                cy={Math.random() * 100 + 100}  // Random y position on the ground
                                r="5"
                                fill="green"
                            />
                        ))}
                    </Svg>
                    <Text style={styles.statsText}>Aantal bomen: {treeCount}</Text>
                </View>

                <View style={styles.bottomTextContainer}>
                    <View style={styles.bottomTextRow}>
                        <Text style={styles.bottomText}>Wilt u doneren bij de voedselbank? Klik icoon voor meer informatie.</Text>
                        <Link href="/donate">
                            <Ionicons name="heart" size={24} color="green" style={styles.icon} />
                        </Link>
                    </View>
                    <View style={styles.divider} /> {/* Divider line between the items */}
                    <View style={styles.bottomTextRow}>
                        <Text style={styles.bottomText}>Meer informatie over ons team? Klik icoon voor meer informatie.</Text>
                        <Link href="/about">
                            <Ionicons name="information-circle" size={24} color="green" style={styles.icon} />
                        </Link>
                    </View>
                </View>
            </ScrollView>
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
        flexDirection: 'row',  // Zorgt ervoor dat het logo en de naam naast elkaar staan
        alignItems: 'center',
        marginBottom: 20, // Space between logo and other content
    },
    logo: {
        width: 40,  // Pas de grootte van het logo aan
        height: 40, // Pas de grootte van het logo aan
        resizeMode: 'contain', // Zorg ervoor dat het logo goed schaalt
        marginRight: 10,  // Wat ruimte tussen logo en tekst
    },
    title: {
        fontSize: 24,  // Aangepaste grootte voor de tekst
        fontWeight: 'bold',
        color: '#006400',  // Donkerder groen voor Eco
        fontFamily: "ABeeZee",
    },
    lightGreen: {
        color: '#66C466',  // Lichter groen voor Bite
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
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: 'white',
        marginVertical: 10,
    },
});

export default HomeScreen;
