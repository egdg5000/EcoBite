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
import { useFonts } from "expo-font";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";


const router = useRouter();


const AddFoodPage = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [expiry, setExpiry] = useState("");
  const [category, setCategory] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    quantity: "",
    unit: "",
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

  const validateForm = () => {
    const newErrors: any = {
      name: "",
      quantity: "",
      unit: "",
      expiry: "",
      category: "",
    };

    if (!name) newErrors.name = "Vul de productnaam in";
    if (!quantity) newErrors.quantity = "Vul de hoeveelheid in";
    if (!unit) newErrors.unit = "Selecteer een eenheid";
    if (!expiry) newErrors.expiry = "Selecteer een houdbaarheidsdatum";
    if (!category) newErrors.category = "Selecteer een categorie";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const parseDutchDate = (dutchDate: string): string => {
    const [day, month, year] = dutchDate.split("-");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    const formattedExpiry = parseDutchDate(expiry);
    const newProduct = {
      item_name: name,
      quantity,
      unit,
      expiration_date: formattedExpiry,
      category,
    };
    try {
      const response = await fetch("https://edg5000.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newProduct),
      });

      const result = await response.json();
      if (result.success) {
        Toast.show({
          type: 'success',
          text1: 'Toegevoegd!',
          text2: `${name} is toegevoegd aan je voorraad.`,
        });

        router.replace("/fridge");
      } else {
        Alert.alert("Fout", "Toevoegen mislukt.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Serverfout", "Kon geen verbinding maken met de server.");
    }
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
        {errors.quantity && (
          <Text style={styles.errorText}>{errors.quantity}</Text>
        )}

        <Text style={styles.label}>Eenheid</Text>
        <Picker
          itemStyle={{ color: "black" }}
          selectedValue={unit}
          onValueChange={(itemValue) => setUnit(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="stuk(s)" value="stuk(s)" />
          <Picker.Item label="Liter" value="L" />
          <Picker.Item label="Gram" value="g" />
          <Picker.Item label="Kilogram" value="kg" />
        </Picker>
        {errors.unit && <Text style={styles.errorText}>{errors.unit}</Text>}

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
            textColor="black"
            value={new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}
        {errors.expiry && <Text style={styles.errorText}>{errors.expiry}</Text>}

        <Text style={styles.label}>Categorie</Text>
        <Picker
          itemStyle={{ color: "black" }}
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          dropdownIconColor="#4CAF50"
          style={styles.input}
        >
          <Picker.Item label="Selecteer een categorie" value="" />
          <Picker.Item label="Fruit" value="fruit" />
          <Picker.Item label="Groente" value="groente" />
          <Picker.Item label="Vlees" value="vlees" />
          <Picker.Item label="Vis" value="vis" />
          <Picker.Item label="Zuivel" value="zuivel" />
        </Picker>
        {errors.category && (
          <Text style={styles.errorText}>{errors.category}</Text>
        )}

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
  picker: {
    
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
