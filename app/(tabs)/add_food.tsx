import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  Modal,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useFonts } from "expo-font";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddFoodPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiry, setExpiry] = useState("");
  const [category, setCategory] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const [fontsLoaded] = useFonts({
    ABeeZee: require("../../assets/fonts/ABeeZee.ttf"),
  });

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString("nl-NL");
      setExpiry(formattedDate);
    }
  };

  const handleSubmit = () => {
    if (!name || !quantity || !expiry || !category) {
      Alert.alert("Vul alle velden in");
      return;
    }

    const newProduct = {
      name,
      quantity,
      expiry,
      category,
    };

    const encodedProduct = encodeURIComponent(JSON.stringify(newProduct));
    router.push(`/fridge?newProduct=${encodedProduct}`);
  };

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setShowCategoryModal(false); // Close modal after selection
  };

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Voeg nieuw product toe</Text>

        <Text style={styles.label}>Productnaam</Text>
        <TextInput
          style={styles.input}
          placeholder="Bijv. Appel"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Hoeveelheid</Text>
        <TextInput
          style={styles.input}
          placeholder="Bijv. 3 stuks / 1L"
          value={quantity}
          onChangeText={setQuantity}
        />

        <Text style={styles.label}>Houdbaar tot</Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>
            {expiry ? expiry : "Selecteer datum"}
          </Text>
          <Icon name="calendar-today" size={20} color="#4CAF50" />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}

        <Text style={styles.label}>Categorie</Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowCategoryModal(true)}
        >
          <Text style={styles.dateText}>
            {category ? category : "Selecteer een categorie"}
          </Text>
          <Icon name="arrow-drop-down" size={20} color="#4CAF50" />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showCategoryModal}
          onRequestClose={() => setShowCategoryModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => handleCategorySelect("Fruit")}
              >
                <Text style={styles.modalItemText}>Fruit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => handleCategorySelect("Groente")}
              >
                <Text style={styles.modalItemText}>Groente</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => handleCategorySelect("Vlees")}
              >
                <Text style={styles.modalItemText}>Vlees</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => handleCategorySelect("Vis")}
              >
                <Text style={styles.modalItemText}>Vis</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => handleCategorySelect("Zuivel")}
              >
                <Text style={styles.modalItemText}>Zuivel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Toevoegen</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "ABeeZee",
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4CAF50",
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: "ABeeZee",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#f5f5f5",
    fontFamily: "ABeeZee",
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#f5f5f5",
  },
  dateText: {
    fontFamily: "ABeeZee",
    fontSize: 14,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    width: 300,
  },
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  modalItemText: {
    fontSize: 16,
    fontFamily: "ABeeZee",
    color: "#333",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "ABeeZee",
    fontWeight: "bold",
  },
});

export default AddFoodPage;
