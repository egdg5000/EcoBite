import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  category: string;
  expiry?: string;
}

interface Recipe {
  recipe_id: number;
  contains: string[];
  count: number;
  recipe: {
    id: number;
    title: string;
    description?: string;
    cookTime?: number;
  }
}

export default function DiscoverScreen() {
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [userAllergies, setUserAllergies] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchAllRecipes = async () => {
        const response = await fetch('https://edg5000.com/recipes/by-ingredients', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        data.recipes.sort((a: any, b: any) => b.count - a.count);
        data.recipes = data.recipes.slice(0, 10);
        for (const recipe of data.recipes) {
          const recipeResponse = await fetch('https://edg5000.com/recipes/by-recipe-id', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipe_id: recipe.recipe_id }),
          });
          const recipeData = await recipeResponse.json();
          recipe.recipe = recipeData.recipe;
        }
        if (data.recipes) setRecipes(data.recipes);
      };
      fetchAllRecipes();
    }, [])
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        // Allergieën ophalen van backend
        const allergyRes = await fetch('https://edg5000.com/users/preferences', {
          method: 'GET',
          credentials: 'include',
        });
        const allergyData = await allergyRes.json();
        if (allergyRes.ok && Array.isArray(allergyData.allergies)) {
          setUserAllergies(allergyData.allergies);
        }

        const storedIngredients = await AsyncStorage.getItem('selectedIngredients');
        if (storedIngredients) {
          const parsed = JSON.parse(storedIngredients);
          setIngredients(parsed);

          const response = await fetch('https://edg5000.com/recipes/from-ingredients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ingredients: parsed }),
          });

          const data = await response.json();
          if (data.recipes) setRecipes(data.recipes);
        }
      } catch (err) {
        console.error('Fout bij ophalen recepten of allergieën:', err);
      }
    };

    loadData();
  }, []);

  const handleCategoryPress = async (category: string) => {
    setSelectedCategory(category);

    try {
      const response = await fetch('https://edg5000.com/recipes/by-category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category }),
      });

      const data = await response.json();
      if (data.recipes) {
        setRecipes(data.recipes);
      } else {
        setRecipes([]);
      }
    } catch (err) {
      console.error('Fout bij ophalen recepten per categorie:', err);
    }
  };

  const filterRecipesByAllergies = (recipeList: Recipe[]): Recipe[] => {
    if (!userAllergies.length) return recipeList;

    return recipeList.filter(recipe => {
      const description = recipe.recipe.description?.toLowerCase() || '';
      return !userAllergies.some(allergen =>
        description.includes(allergen.toLowerCase())
      );
    });
  };

  const handleAISuggestions = async () => {
    setLoadingAi(true);
    try {
      const response = await fetch('https://edg5000.com/ai/recipe-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
          ingredients,
          allergies: userAllergies, 
        }),
      });

      const data = await response.json();
      if (data.suggestions) setAiSuggestion(data.suggestions);
    } catch (err) {
      console.error('Fout bij AI suggestie:', err);
      setAiSuggestion('Er ging iets mis bij het ophalen van AI suggesties.');
    }
    setLoadingAi(false);
  };

  const completeRecipe = async (recipeId: number) => {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) return;

    try {
      await fetch('https://edg5000.com/gamification/add-xp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: Number(userId), recipeId }),
      });
      Alert.alert('✅ Recept voltooid!', 'Je hebt XP en CO₂ bespaard!');
    } catch (err) {
      console.error('Fout bij XP-registratie:', err);
    }
  };

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
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Vind recepten</Text>

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

      <FlatList
        data={recipeCategories}
        numColumns={2}
        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.grid}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              { backgroundColor: item.color },
              selectedCategory === item.title && styles.activeCard,
            ]}
            onPress={() => handleCategoryPress(item.title)}
          >
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.subheader}>
        {selectedCategory ? `Aanbevolen: ${selectedCategory}` : 'Op basis van je voorraad'}
      </Text>

      {filterRecipesByAllergies(recipes).length === 0 ? (
        <Text style={styles.noData}>Geen recepten gevonden die passen bij je allergieën.</Text>
      ) : (
        filterRecipesByAllergies(recipes).map((recipe) => (
          <TouchableOpacity
            key={recipe.recipe.id}
            style={styles.recipeCard}
            onPress={() => completeRecipe(recipe.recipe.id)}
          >
            <Text style={styles.recipeTitle}>{recipe.recipe.title}</Text>
            {recipe.recipe.description && <Text style={styles.recipeText}>{recipe.recipe.description}{'\n'}</Text>}
            {recipe.contains && <Text style={styles.recipeText}>Bevat: {[...new Set(recipe.contains)].join(', ')}</Text>}
            {recipe.recipe.cookTime && (
              <Text style={styles.recipeTime}>⏱️ {recipe.recipe.cookTime} min</Text>
            )}
          </TouchableOpacity>
        ))
      )}

      <TouchableOpacity style={styles.aiButton} onPress={handleAISuggestions} disabled={loadingAi}>
        <Text style={styles.aiButtonText}>
          {loadingAi ? 'AI denkt na...' : '🔮 Vraag AI om suggestie'}
        </Text>
      </TouchableOpacity>

      {aiSuggestion && (
        <View style={styles.aiCard}>
          <Text style={styles.aiTitle}>AI Suggestie</Text>
          <Text style={styles.aiText}>{aiSuggestion}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', fontFamily: 'ABeeZee', marginBottom: 16 },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, fontFamily: 'ABeeZee', color: '#333' },
  grid: { paddingBottom: 10 },
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
  },
  activeCard: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  cardImage: { width: 60, height: 60, marginBottom: 12, resizeMode: 'contain' },
  cardText: { fontSize: 15, fontFamily: 'ABeeZee' },
  subheader: { fontSize: 20, fontWeight: 'bold', fontFamily: 'ABeeZee', marginVertical: 20 },
  recipeCard: {
    backgroundColor: '#e8f5e9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  recipeTitle: { fontSize: 18, fontWeight: 'bold', fontFamily: 'ABeeZee', color: '#1b5e20' },
  recipeText: { fontSize: 14, fontFamily: 'ABeeZee', color: '#555', marginTop: 4 },
  recipeTime: { fontSize: 13, fontFamily: 'ABeeZee', color: '#888', marginTop: 4 },
  aiButton: {
    backgroundColor: '#EDE9FE',       
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 2,
    borderColor: '#7D5FFF',          
    shadowColor: '#7D5FFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  aiButtonText: {
    color: '#4B0082',                 
    fontSize: 16,
    fontFamily: 'ABeeZee',
    fontWeight: 'bold',
  },
  aiCard: { backgroundColor: '#f1f8e9', borderRadius: 12, padding: 16, marginBottom: 20 },
  aiTitle: { fontSize: 18, fontWeight: 'bold', fontFamily: 'ABeeZee', marginBottom: 6 },
  aiText: { fontSize: 15, fontFamily: 'ABeeZee', color: '#444' },
  noData: { fontSize: 16, fontFamily: 'ABeeZee', color: '#777', textAlign: 'center' },
});
