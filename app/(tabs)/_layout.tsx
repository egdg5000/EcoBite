import { Tabs, useNavigation } from 'expo-router';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { useState, useRef, useEffect } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StackNavigation } from 'expo-router/build/types';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  const [fontsLoaded] = useFonts({
    ABeeZee: require('../../assets/fonts/ABeeZee.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <Tabs
      tabBar={(props: BottomTabBarProps) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="discover" options={{ title: 'Ontdek' }} />
      <Tabs.Screen name="donate" options={{ title: 'Doneer' }} />
      <Tabs.Screen name="account" options={{ title: 'Account' }} />

      {/* Verberg 'scan' en 'fridge' uit de tabbar maar maak ze nog steeds deel van de navigatie */}
      <Tabs.Screen
        name="scan"
        options={{
          tabBarButton: () => null, // Verberg deze knop uit de tabbar
        }}
      />
      <Tabs.Screen
        name="fridge"
        options={{
          tabBarButton: () => null, // Verberg deze knop uit de tabbar
        }}
      />
    </Tabs>
  );
}

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = useNavigation<StackNavigation>();

  const leftTabs = state.routes.filter(
    (r) => r.name === 'home' || r.name === 'discover'
  );
  const rightTabs = state.routes.filter((r) => r.name === 'account' || r.name === 'donate');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    if (menuOpen) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
          easing: Easing.in(Easing.ease),
        }),
        Animated.timing(slideAnim, {
          toValue: 10,
          duration: 150,
          useNativeDriver: true,
          easing: Easing.in(Easing.ease),
        }),
      ]).start();
    }
  }, [menuOpen]);

  const renderTabButton = (route: typeof state.routes[0]) => {
    const { options } = descriptors[route.key];
    const isFocused = state.index === state.routes.findIndex((r) => r.key === route.key);

    let iconName: keyof typeof Ionicons.glyphMap = 'home';
    if (route.name === 'discover') iconName = 'search';
    if (route.name === 'account') iconName = 'person';
    if (route.name === 'donate') iconName = 'heart'; // Voeg hart-icoon toe voor doneerpagina

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    return (
      <TouchableOpacity
        key={route.key}
        onPress={onPress}
        style={styles.tabButton}
      >
        <Ionicons
          name={iconName}
          size={24}
          color={isFocused ? '#4CAF50' : '#888'}
        />
        <Text
          style={{
            fontFamily: 'ABeeZee',
            fontSize: 12,
            color: isFocused ? '#4CAF50' : '#888',
          }}
        >
          {options.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {menuOpen && (
        <TouchableWithoutFeedback onPress={() => setMenuOpen(false)}>
          <View style={StyleSheet.absoluteFill}>
            {Platform.OS === 'ios' ? (
              <BlurView intensity={30} tint="light" style={StyleSheet.absoluteFill} />
            ) : (
              <View style={styles.menuOverlay} />
            )}
          </View>
        </TouchableWithoutFeedback>
      )}

      <View style={styles.tabBar}>
        {/* Linkerknoppen */}
        <View style={styles.sideContainer}>
          {leftTabs.map(renderTabButton)}
        </View>

        {/* Ruimte voor FAB */}
        <View style={styles.centerSpacer} />

        {/* Rechterknoppen */}
        <View style={styles.sideContainer}>
          {rightTabs.map(renderTabButton)}
        </View>

        {/* Plus knop */}
        <View style={styles.centerWrapper}>
          <TouchableOpacity
            style={styles.plusButton}
            onPress={() => setMenuOpen((prev) => !prev)}
            activeOpacity={0.8}
          >
            <Ionicons name={menuOpen ? 'close' : 'add'} size={32} color="#fff" />
          </TouchableOpacity>

          <Animated.View
            pointerEvents={menuOpen ? 'auto' : 'none'}
            style={[
              styles.fabMenu,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.fabItem}
              onPress={() => {
                nav.navigate('scan' as never);
                setMenuOpen(false);
              }}
            >
              <Ionicons name="barcode" size={20} color="#fff" />
              <Text style={styles.fabText}>Scan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.fabItem}
              onPress={() => {
                nav.navigate('fridge' as never);
                setMenuOpen(false);
              }}
            >
              <Ionicons name="fast-food" size={20} color="#fff" />
              <Text style={styles.fabText}>Koelkast</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#fff',
    borderTopWidth: 0,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    position: 'relative',
  },
  sideContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  centerSpacer: {
    width: 80, // ruimte voor FAB
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerWrapper: {
    position: 'absolute',
    bottom: 5, // verlaagd zodat het in de tabbar past
    left: '50%',
    transform: [{ translateX: -35 }],
    zIndex: 10,
  },
  plusButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 35,
    width: 70,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  fabMenu: {
    position: 'absolute',
    bottom: 80,
    left: '-37%',
    transform: [{ translateX: -80 }],
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
    zIndex: 20,
  },
  fabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  fabText: {
    color: '#fff',
    fontFamily: 'ABeeZee',
    fontSize: 14,
  },
  menuOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 5,
  },
});
