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
  expiry?: string;
}

interface Recipe {
  id: number;
  title: string;
  description?: string;
  estimated_time?: number;
}

export default function DiscoverScreen() {
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const storedFilters = await AsyncStorage.getItem('recipeFilters');
      if (storedFilters) {
        setFilters(JSON.parse(storedFilters));
      }

      const storedIngredients = await AsyncStorage.getItem('selectedIngredients');
      if (storedIngredients) {
        const parsed = JSON.parse(storedIngredients);
        setIngredients(parsed);

        try {
          const response = await fetch('https://edg5000.com/recipes/from-ingredients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ingredients: parsed }),
          });

          const data = await response.json();
          if (data.recipes) setRecipes(data.recipes);
        } catch (err) {
          console.error('Fout bij ophalen recepten:', err);
        }
      }
    };

    loadData();
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
      {recipes.length === 0 ? (
        <Text style={styles.noData}>Geen recepten gevonden voor je ingrediënten.</Text>
      ) : (
        recipes.map((recipe) => (
          <View key={recipe.id} style={styles.recipeCard}>
            <Text style={styles.recipeTitle}>{recipe.title}</Text>
            {recipe.description && <Text style={styles.recipeText}>{recipe.description}</Text>}
            {recipe.estimated_time && (
              <Text style={styles.recipeTime}>⏱️ {recipe.estimated_time} min</Text>
            )}
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
  recipeCard: {
    backgroundColor: '#e8f5e9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'ABeeZee',
    color: '#1b5e20',
  },
  recipeText: {
    fontSize: 14,
    fontFamily: 'ABeeZee',
    color: '#555',
    marginTop: 4,
  },
  recipeTime: {
    marginTop: 4,
    fontSize: 13,
    fontFamily: 'ABeeZee',
    color: '#888',
  },
  noData: {
    fontSize: 16,
    fontFamily: 'ABeeZee',
    color: '#777',
    textAlign: 'center',
  },
});
