import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';
import { useFonts } from 'expo-font';
import CustomTabBar from '../components/CustomTabBar'; 

export default function TabLayout() {
   const [fontsLoaded] = useFonts({
    'ABeeZee': require('../../assets/fonts/ABeeZee.ttf'),
  });
  return (
    <Tabs
    tabBar={(props) => <CustomTabBar {...props} />}
    screenOptions={{
      headerShown: false,
    }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon name="home" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Ontdek',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon name="search" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon name="barcode" color={color} focused={focused} isCenter />
          ),
        }}
      />
      <Tabs.Screen
        name="fridge"
        options={{
          title: 'Koelkast',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon name="fast-food" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon name="person" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

type AnimatedIconProps = {
  name: keyof typeof Ionicons.glyphMap; 
  color: string;
  focused: boolean;
  isCenter?: boolean; 
};

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ name, color, focused, isCenter = false }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: focused ? 1.2 : 1, 
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Ionicons name={name} size={isCenter ? 36 : 24} color={color} />
    </Animated.View>
  );
};
