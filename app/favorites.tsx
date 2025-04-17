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

      <Text style={styles.title}>🌟 Mijn Favorieten</Text>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Je hebt nog geen favoriete producten.</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.detailRow}>
                <Icon name="archive" size={16} color="#4CAF50" />
                <Text style={styles.details}> {item.quantity}</Text>
              </View>
              <View style={styles.detailRow}>
                <Icon name="calendar" size={16} color="#4CAF50" />
                <Text style={styles.details}> Houdbaar tot: {item.expiry}</Text>
              </View>
              <View style={styles.detailRow}>
                <Icon name="tag" size={16} color="#4CAF50" />
                <Text style={styles.details}> {item.category}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9fdf9" },
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
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
    fontFamily: "ABeeZee",
    color: "#2e7d32",
  },
  card: {
    padding: 14,
    backgroundColor: "#e8f5e9",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "ABeeZee",
    marginBottom: 6,
    color: "#1b5e20",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: "#4b4b4b",
    fontFamily: "ABeeZee",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: "ABeeZee",
    color: "#777",
    textAlign: "center",
  },
});

export default FavoritesPage;
