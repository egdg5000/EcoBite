import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function ScanScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Voeg hier voedsel toe!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#25292e',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});
