import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";

export default function AddFoodPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [expiry, setExpiry] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleAdd = async () => {
    const newProduct = {
      id: Date.now().toString(),
      name,
      quantity,
      expiry: expiry.toLocaleDateString("nl-NL"),
      category,
      isFavorite: false,
    };

    // Stuur product mee als route parameter naar fridge.tsx
    router.push({ pathname: "/fridge", params: { newProduct: JSON.stringify(newProduct) } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voeg handmatig een product toe</Text>
      <Text style={styles.description}>
        Deze pagina stelt je in staat om producten toe te voegen die geen barcode hebben. Vul simpelweg de naam, hoeveelheid, categorie en houdbaarheidsdatum in, en voeg het product toe aan je voorraad.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Naam"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Hoeveelheid"
        value={quantity}
        onChangeText={setQuantity}
      />
      <TextInput
        style={styles.input}
        placeholder="Categorie"
        value={category}
        onChangeText={setCategory}
      />

      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateButton}>
        <Text style={styles.dateText}>
          Houdbaar tot: {expiry.toLocaleDateString("nl-NL")}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={expiry}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || expiry;
            setShowPicker(false);
            setExpiry(currentDate);
          }}
        />
      )}

      <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
        <Text style={styles.addButtonText}>Toevoegen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: "bold",
    fontFamily: "ABeeZee",
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
    color: "#666",
    fontFamily: "ABeeZee",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    fontFamily: "ABeeZee",
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  dateButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  dateText: {
    color: "#333",
    fontFamily: "ABeeZee",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "ABeeZee",
    fontSize: 16,
  },
});

