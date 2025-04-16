// app/tabs/favorites.tsx

import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useLocalSearchParams } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";

interface Product {
  id: string;
  name: string;
  quantity: string;
  expiry: string;
  category: string;
  isFavorite: boolean;
}

const FavoritesPage = () => {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const allProductsParam = Array.isArray(params.products)
      ? params.products[0]
      : params.products;

    if (allProductsParam) {
      try {
        const allProducts = JSON.parse(allProductsParam);
        const favoriteItems = allProducts.filter((p: Product) => p.isFavorite);
        setFavorites(favoriteItems);
      } catch (error) {
        console.error("Fout bij laden van favorieten:", error);
      }
    }
  }, [params.products]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={20} color="#4CAF50" />
        <Text style={styles.backText}>Terug</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Mijn Favorieten</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.details}>Hoeveelheid: {item.quantity}</Text>
            <Text style={styles.details}>Houdbaar tot: {item.expiry}</Text>
            <Text style={styles.details}>Categorie: {item.category}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  backText: {
    marginLeft: 6,
    color: "#4CAF50",
    fontSize: 16,
    fontFamily: "ABeeZee",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    fontFamily: "ABeeZee",
  },
  card: {
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 10,
  },
  name: { fontSize: 18, fontWeight: "bold", fontFamily: "ABeeZee" },
  details: { fontSize: 14, color: "#555", fontFamily: "ABeeZee" },
});

export default FavoritesPage;
