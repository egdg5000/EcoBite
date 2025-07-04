import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext'; 

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme(); 
  const isDark = theme === 'dark'; 

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(10)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const leftTabs = state.routes.filter(
    (r: any) => r.name === 'home' || r.name === 'discover'
  );
  const rightTabs = state.routes.filter(
    (r: any) => r.name === 'fridge' || r.name === 'account'
  );

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

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const renderTabButton = (route: any) => {
    const { options } = descriptors[route.key];
    const isFocused = state.index === state.routes.findIndex((r: any) => r.key === route.key);

    let iconName: keyof typeof Ionicons.glyphMap = 'home';
    if (route.name === 'discover') iconName = 'search';
    if (route.name === 'account') iconName = 'person';
    if (route.name === 'fridge') iconName = 'fast-food';

    const onPress = () => {
      setMenuOpen(false);
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
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Ionicons
            name={iconName}
            size={24}
            color={isFocused ? '#66BB6A' : isDark ? '#ccc' : '#888'}
          />
        </Animated.View>
        <Text
          style={{
            fontFamily: 'ABeeZee',
            fontSize: 12,
            color: isFocused ? '#66BB6A' : isDark ? '#ccc' : '#888',
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
              <BlurView intensity={30} tint={isDark ? 'dark' : 'light'} style={StyleSheet.absoluteFill} />
            ) : (
              <View style={styles.menuOverlay} />
            )}
          </View>
        </TouchableWithoutFeedback>
      )}

      <SafeAreaView edges={['bottom']} style={[styles.safeArea, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
        <View style={[styles.tabBar, {
          backgroundColor: isDark ? '#1e1e1e' : '#fff',
          shadowColor: isDark ? '#000' : '#000',
        }]}>
          <View style={styles.sideContainer}>
            {leftTabs.map(renderTabButton)}
          </View>

          <View style={styles.centerSpacer} />

          <View style={styles.centerWrapper}>
            <TouchableOpacity
              style={[styles.plusButton, { backgroundColor: isDark ? '#66BB6A' : '#4CAF50' }]}
              onPress={() => setMenuOpen((prev) => !prev)}
              activeOpacity={0.8}
            >
              <Ionicons name={menuOpen ? 'close' : 'add'} size={28} color="#fff" />
            </TouchableOpacity>

            <Animated.View
              pointerEvents={menuOpen ? 'auto' : 'none'}
              style={[
                styles.fabMenu,
                {
                  backgroundColor: isDark ? '#388E3C' : '#4CAF50',
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                }
              ]}
            >
              <TouchableOpacity
                style={styles.fabItem}
                onPress={() => {
                  router.push('/scan');
                  setMenuOpen(false);
                }}
              >
                <Ionicons name="barcode" size={20} color="#fff" />
                <Text style={styles.fabText}>Scan Producten</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.fabItem}
                onPress={() => {
                  router.push('/add_food');
                  setMenuOpen(false);
                }}
              >
                <Ionicons name="restaurant" size={20} color="#fff" />
                <Text style={styles.fabText}>Voedsel Toevoegen</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          <View style={styles.centerSpacer} />

          <View style={styles.sideContainer}>
            {rightTabs.map(renderTabButton)}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white',
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 90,
    borderTopWidth: 0,
    borderRadius: 15,
    elevation: 10,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    paddingHorizontal: 24,
  },
  sideContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  centerSpacer: {
    width: 10,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerWrapper: {
    position: 'relative',
    width: 56,
    alignItems: 'center',
  },
  plusButton: {
    top: -5,
    borderRadius: 28,
    height: 56,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  fabMenu: {
    position: 'absolute',
    bottom: '100%',
    marginBottom: 20,
    borderRadius: 16,
    padding: 10,
    elevation: 10,
    minWidth: 140,
    flexDirection: 'column',
    alignItems: 'center',
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

export default CustomTabBar;
