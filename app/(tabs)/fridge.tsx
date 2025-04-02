import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Plus, Filter } from "lucide-react-native";
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome'; // Voeg dit toe
import { Link } from 'expo-router';

const FridgePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: "",
    expiry: "",
    category: "",
  });

  const [products, setProducts] = useState([
    { id: "1", name: "Melk", quantity: "1L", expiry: "02-04-2025", category: "zuivel", isFavorite: false },
    { id: "2", name: "Kipfilet", quantity: "500g", expiry: "05-04-2025", category: "vlees", isFavorite: false },
    { id: "3", name: "Appels", quantity: "4 stuks", expiry: "10-04-2025", category: "vruchten", isFavorite: false },
  ]);

  const [fontsLoaded] = useFonts({
    'ABeeZee': require('../../assets/fonts/ABeeZee.ttf'),
  });

  const toggleFavorite = (productId: string) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );
  };

  const handleAddProduct = () => {
    const newProductId = (products.length + 1).toString();
    setProducts(prevProducts => [
      ...prevProducts,
      { ...newProduct, id: newProductId, isFavorite: false }
    ]);
    setNewProduct({ name: "", quantity: "", expiry: "", category: "" });
    setIsAddModalVisible(false);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory ? product.category === selectedCategory : true)
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Zoek product..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton} onPress={() => setIsFilterModalVisible(true)}>
          <Filter size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDetails}>Hoeveelheid: {item.quantity}</Text>
            <Text style={styles.productExpiry}>Houdbaar tot: {item.expiry}</Text>

            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={() => {
                setProducts(prevProducts => prevProducts.filter(product => product.id !== item.id));
              }}>
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

      <TouchableOpacity style={styles.addButton} onPress={() => setIsAddModalVisible(true)}>
        <Plus size={28} color="white" />
      </TouchableOpacity>

      {/* Filter Modal */}
      <Modal
        visible={isFilterModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsFilterModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter op categorie</Text>
            {["vruchten", "groente", "vlees", "vis", "zuivel"].map(category => (
              <TouchableOpacity key={category} style={styles.filterOption} onPress={() => {
                setSelectedCategory(category);
                setIsFilterModalVisible(false);
              }}>
                <Text style={styles.filterOptionText}>{category}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.filterOption} onPress={() => {
              setSelectedCategory(null);
              setIsFilterModalVisible(false);
            }}>
              <Text style={styles.filterOptionText}>Alle categorieën</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add Product Modal */}
      <Modal
        visible={isAddModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Sluitknop */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsAddModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>✖</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Voeg een nieuw product toe</Text>

            <TextInput
              style={styles.input}
              placeholder="Naam van het product"
              value={newProduct.name}
              onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Hoeveelheid"
              value={newProduct.quantity}
              onChangeText={(text) => setNewProduct({ ...newProduct, quantity: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Houdbaar tot"
              value={newProduct.expiry}
              onChangeText={(text) => setNewProduct({ ...newProduct, expiry: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Categorie"
              value={newProduct.category}
              onChangeText={(text) => setNewProduct({ ...newProduct, category: text })}
            />

            <TouchableOpacity style={styles.addProductButton} onPress={handleAddProduct}>
              <Text style={styles.addProductButtonText}>Voeg product toe</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
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
    fontFamily: 'ABeeZee',
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
    fontFamily: 'ABeeZee',
  },
  productDetails: {
    fontSize: 14,
    color: "#666",
    fontFamily: 'ABeeZee',
  },
  productExpiry: {
    fontSize: 14,
    color: "#d32f2f",
    fontWeight: "600",
    fontFamily: 'ABeeZee',
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
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
    fontFamily: 'ABeeZee',
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontFamily: 'ABeeZee',
  },
  addProductButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
  },
  addProductButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  // New styles for filterOption and filterOptionText
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
    fontFamily: 'ABeeZee',
  },

  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    width: 22,
    height: 22,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

});

export default FridgePage;
