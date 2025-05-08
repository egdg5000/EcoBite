import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DiscoverScreen() {
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const loadFilters = async () => {
      const storedFilters = await AsyncStorage.getItem('recipeFilters');
      if (storedFilters) {
        setFilters(JSON.parse(storedFilters));
      }
    };
    loadFilters();
  }, []);

  const recipeCategories = [
    {
      title: 'Favoriete Recepten',
      color: '#e6f4ea',
      image: require('../../assets/images/favorite.png'),
    },
    {
      title: 'Persoonlijke Recepten',
      color: '#fff1e6',
      image: require('../../assets/images/personal.png'),
    },
    {
      title: 'Eiwitrijke Recepten',
      color: '#fdecea',
      image: require('../../assets/images/protein.png'),
    },
    {
      title: 'Glutenvrije Recepten',
      color: '#f4ecf7',
      image: require('../../assets/images/glutenfree.png'),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Vind recepten</Text>
      <TextInput style={styles.searchInput} placeholder="Zoeken" />
      <FlatList
        data={recipeCategories}
        numColumns={2}
        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.card, { backgroundColor: item.color }]}>
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
    fontFamily: 'ABeeZee'
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 10,
    marginBottom: 20,
  },
  grid: {
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 150,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  cardImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'ABeeZee'
  },
});
