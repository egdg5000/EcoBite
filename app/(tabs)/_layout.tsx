import { Tabs } from 'expo-router';
import { useFonts } from 'expo-font';
import CustomTabBar from '../components/CustomTabBar'; 

export default function TabLayout() {
  const [fontsLoaded] = useFonts({
    ABeeZee: require('../../assets/fonts/ABeeZee.ttf'), 
  });

  if (!fontsLoaded) return null;

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="discover" options={{ title: 'Ontdek' }} />
      <Tabs.Screen name="donate" options={{ title: 'Doneer' }} />
      <Tabs.Screen name="account" options={{ title: 'Account' }} />
      <Tabs.Screen name="scan" options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="fridge" options={{ tabBarButton: () => null }} />
    </Tabs>
  );
}
