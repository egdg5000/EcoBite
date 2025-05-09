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
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useFonts } from "expo-font";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

const AddFoodPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiry, setExpiry] = useState("");
  const [category, setCategory] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Foutmeldingen state
  const [errors, setErrors] = useState({
    name: "",
    quantity: "",
    expiry: "",
    category: "",
  });

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

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  const validateForm = () => {
    const newErrors: any = {
      name: "",
      quantity: "",
      expiry: "",
      category: "",
    };

    if (!name) {
      newErrors.name = "Vul de productnaam in";
    }
    if (!quantity) {
      newErrors.quantity = "Vul de hoeveelheid in";
    }
    if (!expiry) {
      newErrors.expiry = "Selecteer een houdbaarheidsdatum";
    }
    if (!category) {
      newErrors.category = "Selecteer een categorie";
    }

    setErrors(newErrors);

    // Als er geen fouten zijn, return true om het formulier te verzenden
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = () => {
    if (!validateForm()) {
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
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <Text style={styles.label}>Hoeveelheid</Text>
        <TextInput
          style={styles.input}
          placeholder="Bijv. 3 stuks / 1L"
          value={quantity}
          onChangeText={setQuantity}
        />
        {errors.quantity && <Text style={styles.errorText}>{errors.quantity}</Text>}

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
        {errors.expiry && <Text style={styles.errorText}>{errors.expiry}</Text>}

        <Text style={styles.label}>Categorie</Text>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={category}
            onValueChange={handleCategorySelect}
            style={styles.dropdown}
            dropdownIconColor="#4CAF50"
          >
            <Picker.Item label="Selecteer een categorie" value="" />
            <Picker.Item label="Fruit" value="fruit" />
            <Picker.Item label="Groente" value="groente" />
            <Picker.Item label="Vlees" value="vlees" />
            <Picker.Item label="Vis" value="vis" />
            <Picker.Item label="Zuivel" value="zuivel" />
          </Picker>
        </View>
        {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}

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
  errorText: {
    fontSize: 12,
    color: "red",
    marginBottom: 8,
    fontFamily: "ABeeZee",
  },
  dropdownContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden",
    marginBottom: 16,
  },
  dropdown: {
    height: 50,
    color: "#333",
    paddingHorizontal: 10,
    fontFamily: "ABeeZee",
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
