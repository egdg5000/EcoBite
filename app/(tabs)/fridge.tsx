import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useFonts } from "expo-font";

interface Product {
  id: number;
  item_name: string;
  quantity: number;
  unit: string;
  expiration_date: string;
  category: string;
}

export default function FridgePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");

  const [fontsLoaded] = useFonts({
    ABeeZee: require("../../assets/fonts/ABeeZee.ttf"),
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://edg5000.com/products/user/1", {
          credentials: "include",
        });
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Fout bij ophalen producten:", error);
      }
    };

    fetchProducts();
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const deleteProduct = async (id: number) => {
    try {
      await fetch(`https://edg5000.com/products/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setFavorites((prev) => prev.filter((f) => f !== id));
    } catch (err) {
      console.error("Verwijderen mislukt:", err);
    }
  };

  const filteredProducts =
    activeTab === "favorites"
      ? products.filter((p) => favorites.includes(p.id))
      : products;

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mijn Voorraad</Text>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => setActiveTab("all")}
          style={[
            styles.tab,
            activeTab === "all" && styles.activeTab,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "all" && styles.activeTabText,
            ]}
          >
            Alles
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("favorites")}
          style={[
            styles.tab,
            activeTab === "favorites" && styles.activeTab,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "favorites" && styles.activeTabText,
            ]}
          >
            Favorieten
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lijst */}
      {filteredProducts.length === 0 ? (
        <Text style={styles.empty}>Geen producten gevonden</Text>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 30 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.item_name}</Text>
              <View style={styles.row}>
                <Icon name="scale" size={16} color="#4CAF50" />
                <Text style={styles.details}>
                  {" "}
                  {item.quantity} {item.unit}
                </Text>
              </View>
              <View style={styles.row}>
                <Icon name="calendar-today" size={16} color="#4CAF50" />
                <Text style={styles.details}> {item.expiration_date}</Text>
              </View>
              <View style={styles.row}>
                <Icon name="category" size={16} color="#4CAF50" />
                <Text style={styles.details}> {item.category}</Text>
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity
                  onPress={() => toggleFavorite(item.id)}
                  style={styles.iconButton}
                >
                  <Icon
                    name={
                      favorites.includes(item.id)
                        ? "favorite"
                        : "favorite-border"
                    }
                    size={22}
                    color="#e91e63"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteProduct(item.id)}
                  style={styles.iconButton}
                >
                  <Icon name="delete" size={22} color="#f44336" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: {
    fontSize: 24,
    fontFamily: "ABeeZee",
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 16,
  },
  empty: {
    fontSize: 16,
    fontFamily: "ABeeZee",
    textAlign: "center",
    marginTop: 50,
    color: "#777",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
    gap: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },
  activeTab: {
    backgroundColor: "#4CAF50",
  },
  tabText: {
    fontFamily: "ABeeZee",
    fontSize: 14,
    color: "#555",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontFamily: "ABeeZee",
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  details: {
    fontFamily: "ABeeZee",
    fontSize: 14,
    color: "#444",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
});