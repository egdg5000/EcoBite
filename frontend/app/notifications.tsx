import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "./context/ThemeContext";

export default function NotificationsPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const userId = 1;

  const [notifyExpiry, setNotifyExpiry] = useState(true);
  const [notifyDeletion, setNotifyDeletion] = useState(true);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await fetch(
          `https://edg5000.com/users/preferences/${userId}`,
          { credentials: "include" }
        );
        const data = await response.json();
        setNotifyExpiry(data.notify_expiry);
        setNotifyDeletion(data.notify_deletion);
      } catch (err) {
        Alert.alert("Fout", "Kon voorkeuren niet ophalen.");
        console.error(err);
      }
    };

    fetchPreferences();
  }, []);

  const savePreferences = async (
    newExpiry: boolean,
    newDeletion: boolean
  ) => {
    try {
      await fetch("https://jouw-server.com/users/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          user_id: userId,
          notify_expiry: newExpiry,
          notify_deletion: newDeletion,
        }),
      });
    } catch (err) {
      Alert.alert("Fout", "Kon voorkeuren niet opslaan.");
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#121212" : "#fff" }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={[styles.backText, { color: isDark ? "#66BB6A" : "#4CAF50" }]}>← Terug</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: isDark ? "#66BB6A" : "#4CAF50" }]}>Meldingsvoorkeuren</Text>

        <View style={styles.row}>
          <Text style={[styles.label, { color: isDark ? "#ccc" : "#333" }]}>
            Melding bij bijna verlopen product
          </Text>
          <Switch
            value={notifyExpiry}
            onValueChange={(value) => {
              setNotifyExpiry(value);
              savePreferences(value, notifyDeletion);
            }}
          />
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, { color: isDark ? "#ccc" : "#333" }]}>
            Melding bij automatisch verwijderen
          </Text>
          <Switch
            value={notifyDeletion}
            onValueChange={(value) => {
              setNotifyDeletion(value);
              savePreferences(notifyExpiry, value);
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  backButton: {
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "ABeeZee",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "ABeeZee",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    flex: 1,
    paddingRight: 12,
    fontFamily: "ABeeZee",
  },
});
