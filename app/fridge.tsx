import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Plus, Filter } from "lucide-react-native";
import { useFonts } from 'expo-font';

const FridgePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([
    { id: "1", name: "Melk", quantity: "1L", expiry: "02-04-2025" },
    { id: "2", name: "Kipfilet", quantity: "500g", expiry: "05-04-2025" },
    { id: "3", name: "Appels", quantity: "4 stuks", expiry: "10-04-2025" },
  ]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

   const [fontsLoaded] = useFonts({
      'ABeeZee': require('../assets/fonts/ABeeZee.ttf'),
    });
  

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
        <TouchableOpacity style={styles.filterButton}>
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
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton}>
        <Plus size={28} color="white" />
      </TouchableOpacity>
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
});

export default FridgePage;