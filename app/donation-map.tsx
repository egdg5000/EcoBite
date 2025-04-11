import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator, Alert, Modal, TouchableOpacity, Linking } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import * as Location from "expo-location";
import donationData from "../assets/data/donation_points.json";

// Type voor donatiepunt
type DonationPoint = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  address: string;
};

const DonationMap = () => {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPoint, setSelectedPoint] = useState<DonationPoint | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Toegang geweigerd", "Locatietoegang is nodig om donatiepunten te tonen.");
        setLoading(false);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      setLoading(false);
    })();
  }, []);

  const openGoogleMaps = (lat: number, lng: number) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`;
    Linking.openURL(url);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Locatie ophalen...</Text>
      </View>
    );
  }

  const region: Region = {
    latitude: location?.latitude ?? 52.3676,
    longitude: location?.longitude ?? 4.9041,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        region={region}
      >
        {(donationData as DonationPoint[]).map((point) => (
          <Marker
            key={point.id}
            coordinate={{ latitude: point.latitude, longitude: point.longitude }}
            title={point.name}
            onPress={() => setSelectedPoint(point)}
            pinColor="#4CAF50"
          />
        ))}
      </MapView>

      {selectedPoint && (
        <Modal
          transparent
          animationType="slide"
          visible={true}
          onRequestClose={() => setSelectedPoint(null)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{selectedPoint.name}</Text>
              <Text style={styles.modalAddress}>{selectedPoint.address}</Text>
              <Text style={styles.modalDescription}>{selectedPoint.description}</Text>

              <TouchableOpacity
                style={styles.routeButton}
                onPress={() => {
                  openGoogleMaps(selectedPoint.latitude, selectedPoint.longitude);
                  setSelectedPoint(null);
                }}
              >
                <Text style={styles.routeButtonText}>📍 Route openen in Google Maps</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedPoint(null)}
              >
                <Text style={styles.closeButtonText}>Sluiten</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#555",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 8,
  },
  modalAddress: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  modalDescription: {
    fontSize: 15,
    color: "#333",
    marginBottom: 16,
  },
  routeButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  routeButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  closeButton: {
    alignItems: "center",
  },
  closeButtonText: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default DonationMap;
