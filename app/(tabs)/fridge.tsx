import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
} from "react-native";
import { Plus, Filter } from "lucide-react-native";
import { useFonts } from "expo-font";
import Icon from "react-native-vector-icons/FontAwesome";
import { useLocalSearchParams, Link } from "expo-router";

// Definieer een interface voor het product
interface Product {
  id: string;
  name: string;
  quantity: string;
  expiry: string;
  category: string;
  isFavorite: boolean;
}

const FridgePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  // Definieer de state voor de producten en favorieten met het juiste type
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);

  const [fontsLoaded] = useFonts({
    ABeeZee: require("../../assets/fonts/ABeeZee.ttf"),
  });

  const params = useLocalSearchParams();

  // ✅ Controleer op nieuwe producten via URL
  useEffect(() => {
    const newProductParam = Array.isArray(params.newProduct)
      ? params.newProduct[0]
      : params.newProduct;

    if (newProductParam) {
      try {
        const parsedProduct = JSON.parse(newProductParam);
        const newProductWithId = {
          ...parsedProduct,
          id: Date.now().toString(), // unieke ID
          isFavorite: false,
        };
        setProducts((prev) => [...prev, newProductWithId]);
      } catch (error) {
        console.error("Fout bij het verwerken van het nieuwe product:", error);
      }
    }
  }, [params.newProduct]);

  const toggleFavorite = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );

    // Verplaats het product naar de favorieten als het een favoriet wordt
    setFavorites((prevFavorites) => {
      const updatedFavorites = products.filter((product) => product.isFavorite);
      return updatedFavorites;
    });
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory ? product.category === selectedCategory : true)
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mijn Voorraad</Text>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Zoek product..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setIsFilterModalVisible(true)}
        >
          <Filter size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDetails}>Hoeveelheid: {item.quantity}</Text>
            <Text style={styles.productExpiry}>Houdbaar tot: {item.expiry}</Text>

            <View style={styles.iconsContainer}>
              <TouchableOpacity
                onPress={() =>
                  setProducts((prev) =>
                    prev.filter((product) => product.id !== item.id)
                  )
                }
              >
                <Icon name="times" size={24} color="#d32f2f" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                <Icon
                  name={item.isFavorite ? "heart" : "heart-o"}
                  size={24}
                  color={item.isFavorite ? "#ff4081" : "#888"}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Voeg-knop met link naar handmatig toevoegen */}
      <Link href="/add_food" asChild>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color="#4CAF50" style={{ marginRight: 6 }} />
          <Text style={{ color: "#4CAF50", fontWeight: "bold", fontFamily: "ABeeZee" }}>
            Product
          </Text>
        </TouchableOpacity>
      </Link>

      {/* Filter modal */}
      <Modal
        visible={isFilterModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsFilterModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter op categorie</Text>
            {Array.from(new Set(products.map((p) => p.category))).map((category) => (
              <TouchableOpacity
                key={category}
                style={styles.filterOption}
                onPress={() => {
                  setSelectedCategory(category);
                  setIsFilterModalVisible(false);
                }}
              >
                <Text style={styles.filterOptionText}>{category}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.filterOption}
              onPress={() => {
                setSelectedCategory(null);
                setIsFilterModalVisible(false);
              }}
            >
              <Text style={styles.filterOptionText}>Alle categorieën</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    fontFamily: "ABeeZee",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f5f5f5",
    fontFamily: "ABeeZee",
  },
  filterButton: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginLeft: 8,
  },
  productCard: {
    padding: 12,
    marginTop: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: "relative",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "ABeeZee",
  },
  productDetails: {
    fontSize: 14,
    color: "#666",
    fontFamily: "ABeeZee",
  },
  productExpiry: {
    fontSize: 14,
    color: "#d32f2f",
    fontWeight: "600",
    fontFamily: "ABeeZee",
  },
  iconsContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 50,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#4CAF50",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "ABeeZee",
  },
  filterOption: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
  },
  filterOptionText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "ABeeZee",
  },
});

export default FridgePage;
