import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CountryFlag from "react-native-country-flag";
import { useFonts } from 'expo-font';
import { Link } from 'expo-router';

  

const HomePage = () => {

  const [fontsLoaded] = useFonts({
    'ABeeZee': require('../assets/fonts/ABeeZee.ttf'),
  });

  
  return (
    <View>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default HomePage;
