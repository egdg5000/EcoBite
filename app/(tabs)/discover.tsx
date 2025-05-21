import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  category: string;
  expiry?: string; // optioneel, als je het later wil gebruiken
}

export default function DiscoverScreen() {
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const loadFilters = async () => {
      const storedFilters = await AsyncStorage.getItem('recipeFilters');
      if (storedFilters) {
        setFilters(JSON.parse(storedFilters));
      }
    };

    const loadIngredients = async () => {
      const stored = await AsyncStorage.getItem('selectedIngredients');
      if (stored) {
        setIngredients(JSON.parse(stored));
      }
    };

    loadFilters();
    loadIngredients();
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Vind recepten</Text>

      {/* Zoekbalk */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Zoeken"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#888"
        />
      </View>

      {/* Categorieën */}
      <FlatList
        data={recipeCategories}
        numColumns={2}
        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.grid}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: item.color }]}
            activeOpacity={0.8}
            onPress={() => console.log('Gekozen:', item.title)}
          >
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Dynamische recepten op basis van ingrediënten */}
      <Text style={styles.subheader}>Recepten op basis van je voorraad</Text>
      {ingredients.length === 0 ? (
        <Text style={styles.noData}>Geen ingrediënten gevonden uit je voorraad.</Text>
      ) : (
        ingredients.map((item, index) => (
          <View key={index} style={styles.ingredientCard}>
            <Text style={styles.ingredientName}>{item.name}</Text>
            <Text style={styles.ingredientDetail}>Hoeveelheid: {item.quantity}</Text>
            <Text style={styles.ingredientDetail}>Categorie: {item.category}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: 'ABeeZee',
    color: '#333',
  },
  subheader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    fontFamily: 'ABeeZee',
    color: '#2e7d32',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'ABeeZee',
    color: '#333',
  },
  grid: {
    paddingBottom: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'ABeeZee',
    color: '#333',
  },
  ingredientCard: {
    backgroundColor: '#f1f8e9',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'ABeeZee',
    color: '#33691e',
  },
  ingredientDetail: {
    fontSize: 14,
    fontFamily: 'ABeeZee',
    color: '#555',
  },
  noData: {
    fontSize: 16,
    fontFamily: 'ABeeZee',
    color: '#777',
  },
});
