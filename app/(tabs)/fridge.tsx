import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
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

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mijn Voorraad</Text>

      {products.length === 0 ? (
        <Text style={styles.empty}>Geen producten gevonden</Text>
      ) : (
        <FlatList
          data={products}
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
  card: {
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
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
});