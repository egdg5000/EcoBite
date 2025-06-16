import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Modal,
} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from "../context/ThemeContext";

interface Product {
  id: number;
  item_name: string;
  quantity: number;
  unit: string;
  expiration_date: string;
  category: string;
}

const fetchProducts = async (): Promise<{ products: Product[], expiringSoon: Product[] }> => {
  try {
    const response = await fetch("https://edg5000.com/products/inventory", {
      credentials: "include",
    });
    const data = await response.json();
    const today = new Date();
    const expiringSoon = data.products.filter((product: Product) => {
      const expiry = new Date(product.expiration_date);
      const diffDays = Math.ceil(
        (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );
      return diffDays === 7 || diffDays === 1;
    });

    return {
      products: data.products,
      expiringSoon
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], expiringSoon: [] };
  }
};

// 🔽 NIEUW: aparte fetch voor verlopen producten
const fetchExpiredProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch("https://edg5000.com/products/expired", {
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching expired products:", error);
    return [];
  }
};

export default function FridgePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [expiredProducts, setExpiredProducts] = useState<Product[]>([]); // 🆕
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");
  const [expiringSoon, setExpiringSoon] = useState<Product[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [fontsLoaded] = useFonts({
    ABeeZee: require("../../assets/fonts/ABeeZee.ttf"),
  });

  const fetchAll = async () => {
    const { products, expiringSoon } = await fetchProducts();
    const expired = await fetchExpiredProducts(); // 🆕
    setProducts(products);
    setExpiringSoon(expiringSoon);
    setExpiredProducts(expired); // 🆕
  };
  useFocusEffect(
    useCallback(() => {
      fetchAll();
    }, [])
  );

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // 🔁 NIEUW: bevestigingsdialoog bij verwijderen
  const deleteProduct = async (id: number) => {
    Alert.alert(
      "Bevestigen",
      "Weet je zeker dat je dit product wilt verwijderen?",
      [
        { text: "Annuleren", style: "cancel" },
        {
          text: "Verwijderen",
          style: "destructive",
          onPress: async () => {
            try {
              await fetch(`https://edg5000.com/products/delete/${id}`, {
                method: "DELETE",
                credentials: "include",
              });
              setProducts((prev) => prev.filter((p) => p.id !== id));
              setExpiredProducts((prev) => prev.filter((p) => p.id !== id));
              setFavorites((prev) => prev.filter((f) => f !== id));
            } catch (err) {
              console.error("Verwijderen mislukt:", err);
            }
          },
        },
      ]
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAll();
    setRefreshing(false);
  };

  const uniqueCategories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean))
  );

  const filteredProducts = products.filter((p) => {
    const matchesTab = activeTab === "favorites" ? favorites.includes(p.id) : true;
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    return matchesTab && matchesCategory;
  });

  if (!fontsLoaded) return null;
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#fff' }]}>
      <View style={{ padding: 20 }}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: isDark ? '#A5D6A7' : '#4CAF50' }]}>Mijn Voorraad</Text>
        </View>

        {expiringSoon.length > 0 && (
          <View style={[styles.alertBox, { backgroundColor: isDark ? '#332b00' : '#FFF8E1', borderLeftColor: '#FFB300' }]}>
            <Text style={[styles.alertTitle, { color: isDark ? '#FFB74D' : '#FF6F00' }]}>⏰ Let op!</Text>
            {expiringSoon.map((item) => {
              const daysLeft = Math.ceil(
                (new Date(item.expiration_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              );
              return (
                <Text key={item.id} style={[styles.alertItem, { color: isDark ? '#eee' : '#444' }]}>
                  {item.item_name} verloopt over {daysLeft} dag{daysLeft > 1 ? "en" : ""}
                </Text>
              );
            })}
          </View>
        )}

        {/* NIEUW: verlopen producten */}
        {expiredProducts.length > 0 && (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontFamily: 'ABeeZee', fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: isDark ? '#ef9a9a' : '#d32f2f' }}>
              ❗ Overdatum
            </Text>
            {expiredProducts.map((item) => (
              <View key={item.id} style={[styles.card, { backgroundColor: isDark ? '#2c2c2c' : '#fdecea' }]}>
                <Text style={[styles.name, { color: isDark ? '#fff' : '#333' }]}>{item.item_name}</Text>
                <Text style={[styles.details, { color: isDark ? '#ccc' : '#666' }]}>THT: {item.expiration_date}</Text>
                <TouchableOpacity onPress={() => deleteProduct(item.id)}>
                  <Text style={{ color: '#f44336', marginTop: 6 }}>🗑️ Verwijder</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Tabs en filters */}
        <View style={styles.tabs}>
          {["all", "favorites"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab as any)}
              style={[
                styles.tab,
                {
                  backgroundColor: activeTab === tab
                    ? "#4CAF50"
                    : isDark ? "#333" : "#e0e0e0",
                },
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: activeTab === tab
                      ? "#fff"
                      : isDark ? "#ccc" : "#555",
                    fontWeight: activeTab === tab ? "bold" : "normal",
                  },
                ]}
              >
                {tab === "all" ? "Alles" : "Favorieten"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => setCategoryModalVisible(true)}
          style={{ alignSelf: 'flex-end', marginBottom: 10 }}
        >
          <Icon name="filter-list" size={28} color={isDark ? '#ccc' : '#4CAF50'} />
        </TouchableOpacity>

        {filteredProducts.length === 0 ? (
          <Text style={[styles.empty, { color: isDark ? '#aaa' : '#777' }]}>Geen producten gevonden</Text>
        ) : (
          <FlatList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 30 }}
            renderItem={({ item }) => (
              <View style={[styles.card, { backgroundColor: isDark ? "#1e1e1e" : "#f1f1f1" }]}>
                <Text style={[styles.name, { color: isDark ? "#fff" : "#333" }]}>{item.item_name}</Text>
                <Text style={[styles.details, { color: isDark ? '#ccc' : '#444' }]}>{item.quantity} {item.unit}</Text>
                <Text style={[styles.details, { color: isDark ? '#ccc' : '#444' }]}>{item.expiration_date}</Text>
                <TouchableOpacity onPress={() => deleteProduct(item.id)}>
                  <Text style={{ color: '#f44336', marginTop: 6 }}>🗑️ Verwijder</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}

        <TouchableOpacity
          style={[styles.recipeButton, { backgroundColor: isDark ? '#66BB6A' : '#4CAF50' }]}
          onPress={() => router.push('/discover')}
        >
          <Text style={styles.recipeButtonText}>Ontdek Recepten</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: 26,
    fontFamily: "ABeeZee",
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 0,
  },
  empty: {
    fontSize: 16,
    fontFamily: "ABeeZee",
    textAlign: "center",
    marginTop: 50,
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
  },
  tabText: {
    fontFamily: "ABeeZee",
    fontSize: 14,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontFamily: "ABeeZee",
    fontWeight: "bold",
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
  alertBox: {
    borderLeftWidth: 4,
    padding: 12,
    marginBottom: 16,
    borderRadius: 6,
  },
  alertTitle: {
    fontFamily: "ABeeZee",
    fontWeight: "bold",
    marginBottom: 6,
  },
  alertItem: {
    fontFamily: "ABeeZee",
    fontSize: 14,
  },
  recipeButton: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  recipeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'ABeeZee',
    fontWeight: 'bold',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
  tipsContainer: {
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#b4dfc4',
  },
  tipsTitle: {
    fontFamily: 'ABeeZee',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tip: {
    fontFamily: 'ABeeZee',
    fontSize: 14,
    marginBottom: 6,
  },
});