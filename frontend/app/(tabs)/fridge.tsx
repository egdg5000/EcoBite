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

export default function FridgePage() {
  const [products, setProducts] = useState<Product[]>([]);
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
    setProducts(products);
    setExpiringSoon(expiringSoon)
  };

  useFocusEffect(
    useCallback(() => {
      fetchAll();
    }, [])
  );

  useEffect(() => {
    const fetchDeleted = async () => {
      try {
        const res = await fetch("https://edg5000.com/products/deleted/", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.deleted.length > 0) {
          Alert.alert(
            "Verlopen producten verwijderd",
            data.deleted
              .map((p: any) => `• ${p.item_name} (${p.category})`)
              .join("\n")
          );
        }
      } catch (err) {
        console.error("Fout bij ophalen verwijderde producten:", err);
      }
    };
    fetchDeleted();
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

  const onRefresh = async () => {
    setRefreshing(true);
    const { products, expiringSoon } = await fetchProducts();
    setProducts(products);
    setExpiringSoon(expiringSoon);
    setRefreshing(false);
  };

  const uniqueCategories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

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
                (new Date(item.expiration_date).getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24)
              );
              return (
                <Text key={item.id} style={[styles.alertItem, { color: isDark ? '#eee' : '#444' }]}>
                  {item.item_name} verloopt over {daysLeft} dag{daysLeft > 1 ? "en" : ""}
                </Text>
              );
            })}
          </View>
        )}

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
                <View style={styles.row}>
                  <Icon name="scale" size={16} color="#4CAF50" />
                  <Text style={[styles.details, { color: isDark ? '#ccc' : '#444' }]}> {item.quantity} {item.unit}</Text>
                </View>
                <View style={styles.row}>
                  <Icon name="calendar-today" size={16} color="#4CAF50" />
                  <Text style={[styles.details, { color: isDark ? '#ccc' : '#444' }]}> {item.expiration_date}</Text>
                </View>
                <View style={styles.row}>
                  <Icon name="category" size={16} color="#4CAF50" />
                  <Text style={[styles.details, { color: isDark ? '#ccc' : '#444' }]}> {item.category}</Text>
                </View>

                <View style={styles.actionRow}>
                  <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.iconButton}>
                    <Icon
                      name={favorites.includes(item.id) ? "favorite" : "favorite-border"}
                      size={22}
                      color="#e91e63"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteProduct(item.id)} style={styles.iconButton}>
                    <Icon name="delete" size={22} color="#f44336" />
                  </TouchableOpacity>
                </View>
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

      <Modal
        visible={categoryModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <View style={{ backgroundColor: isDark ? '#2c2c2c' : '#fff', padding: 20, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
            <Text style={{ fontFamily: 'ABeeZee', fontSize: 16, fontWeight: 'bold', marginBottom: 12, color: isDark ? '#fff' : '#333' }}>
              Filter op categorie
            </Text>

            <TouchableOpacity onPress={() => { setSelectedCategory(null); setCategoryModalVisible(false); }}>
              <Text style={{ paddingVertical: 10, fontFamily: "ABeeZee", color: isDark ? '#A5D6A7' : '#4CAF50' }}>Toon alles</Text>
            </TouchableOpacity>

            {uniqueCategories.length === 0 ? (
              <Text style={{ color: isDark ? '#888' : '#999', fontStyle: 'italic', fontFamily: "ABeeZee", }}>Geen categorieën beschikbaar</Text>
            ) : (
              uniqueCategories.map(cat => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => {
                    setSelectedCategory(cat);
                    setCategoryModalVisible(false);
                  }}
                >
                  <Text style={{ paddingVertical: 10, fontFamily: "ABeeZee", color: selectedCategory === cat ? (isDark ? '#A5D6A7' : '#4CAF50') : (isDark ? '#ccc' : '#333') }}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>
      </Modal>

      {products.length > 0 && (
        <View style={[styles.tipsContainer, { backgroundColor: isDark ? '#2e7d32' : '#e6f4ea' }]}>
          <Text style={[styles.tipsTitle, { color: isDark ? '#fff' : '#2e7d32' }]}>💡 Voedselbewaar Tips</Text>
          <Text style={[styles.tip, { color: isDark ? '#ddd' : '#333' }]}>• Vaak is een product nog goed na de houdbaarheidsdatum.</Text>
          <Text style={[styles.tip, { color: isDark ? '#ddd' : '#333' }]}>• Ruik, kijk en proef voordat je iets weggooit.</Text>
          <Text style={[styles.tip, { color: isDark ? '#ddd' : '#333' }]}>• Bewaar producten koel en droog.</Text>
          <Text style={[styles.tip, { color: isDark ? '#ddd' : '#333' }]}>• Gebruik eerst de oudste producten ("First In, First Out").</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: 26,
    fontFamily: "ABeeZee",
    fontWeight: "bold",
    marginBottom: 16,
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
