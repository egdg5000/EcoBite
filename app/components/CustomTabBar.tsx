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
import { useNavigation } from 'expo-router';
import { BlurView } from 'expo-blur';

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const nav = useNavigation<any>();
  const [menuOpen, setMenuOpen] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(10)).current;

  const leftTabs = state.routes.filter(
    (r: any) => r.name === 'home' || r.name === 'discover'
  );
  const rightTabs = state.routes.filter(
    (r: any) => r.name === 'account' || r.name === 'donate'
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

  const renderTabButton = (route: any) => {
    const { options } = descriptors[route.key];
    const isFocused = state.index === state.routes.findIndex((r: any) => r.key === route.key);

    let iconName: keyof typeof Ionicons.glyphMap = 'home';
    if (route.name === 'discover') iconName = 'search';
    if (route.name === 'account') iconName = 'person';
    if (route.name === 'donate') iconName = 'heart';

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
        <View style={styles.sideContainer}>
          {leftTabs.map(renderTabButton)}
        </View>

        <View style={styles.centerSpacer} />

        <View style={styles.sideContainer}>
          {rightTabs.map(renderTabButton)}
        </View>

        <View style={styles.centerWrapper}>
          <TouchableOpacity
            style={styles.plusButton}
            onPress={() => setMenuOpen((prev) => !prev)}
            activeOpacity={0.8}
          >
            <Ionicons name={menuOpen ? 'close' : 'add'} size={28} color="#fff" />
          </TouchableOpacity>

          <Animated.View
            pointerEvents={menuOpen ? 'auto' : 'none'}
            style={[styles.fabMenu, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
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

            <View style={styles.divider} /> {/* Divider tussen de knoppen */}

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
    borderTopLeftRadius: 25, // Afgeronde hoeken
    borderTopRightRadius: 25, // Afgeronde hoeken
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    position: 'relative',
  },
  sideContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  centerSpacer: {
    width: 90,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerWrapper: {
    position: 'absolute',
    bottom: 7,
    left: '50%',
    transform: [{ translateX: -30 }],
    zIndex: 10,
  },
  plusButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  fabMenu: {
    position: 'absolute',
    bottom: 80,
    left: '-56%',
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
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#fff',
    marginVertical: 6, // Ruimte tussen de knoppen
  },
  menuOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 5,
  },
});

export default CustomTabBar;
