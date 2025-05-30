import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ScanScreen = () => {
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [scanError, setScanError] = useState(false);
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();	

  const camera = useRef(null)

  const [fontsLoaded] = useFonts({
    ABeeZee: require("../../assets/fonts/ABeeZee.ttf"),
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!scanned) {
      timeout = setTimeout(() => {
        setScanError(true);
      }, 10000); // 10 seconden timeout
    }

    return () => clearTimeout(timeout);
  }, [scanned]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionTitle}>Toegang tot de camera nodig</Text>
        <Text style={styles.permissionText}>
          We hebben toestemming nodig om uw camera te gebruiken om barcodes te scannen. Klik hieronder om toegang te geven.
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Geef Toegang</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    setScanError(false);
    setScannedData(data);
    console.log("Gescannde data:", data);
  };

  const takePicture = async () => {
    if (!camera.current) return;

    try {
      const options = { quality: 0.5, base64: true };
      const data = await camera.current.takePictureAsync(options);

      const response = await fetch("https://edg5000.com/scan/detect", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: data }),
      });

      const responseData = await response.json();
      console.log(responseData, "<<<<<< BACKEND RESPONSE");

      if (responseData.success && responseData.productName) {
        const userId = await AsyncStorage.getItem("userId");

        const product = {
          item_name: responseData.productName,
          quantity: 1,
          unit: "stuk(s)",
          expiration_date: null,
          category: "onbekend",
          user_id: userId,
        };

        await fetch("https://edg5000.com/products/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(product),
        });

        Toast.show({
          type: "success",
          text1: "Product toegevoegd!",
          text2: `${responseData.productName} staat nu in je voorraad.`,
        });

        router.replace("/fridge");
      } else {
        setScanError(true);
        setScannedData("Geen product herkend");
      }
    } catch (error) {
      console.error("Scanfout:", error);
      setScanError(true);
      setScannedData("Fout bij verwerken.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <View style={styles.scannerContainer}>
        <CameraView
          ref={camera}
          facing={facing}
          barcodeScannerSettings={{
            barcodeTypes: ["ean13"],
          }}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      
      <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
        <Text style={styles.text}>Maak een foto</Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        {scanError ? (
          <>
            <Text style={styles.errorText}>
              We konden de barcode niet herkennen. Probeer opnieuw of voeg het product handmatig toe.
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => {
                  setScanned(false);
                  setScanError(false);
                }}
              >
                <Text style={styles.secondaryButtonText}>Opnieuw proberen</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/add_food")}
              >
                <Text style={styles.buttonText}>Voeg handmatig toe</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : scanned ? (
          <>
            <Text style={styles.scanResult}>Gescande code: {scannedData}</Text>
            <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
              <Text style={styles.buttonText}>Opnieuw scannen</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.text}>Richt uw camera op een barcode</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scannerContainer: {
    flex: 4,
    overflow: "hidden",
  },
  infoContainer: {
    flex: 2,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "ABeeZee",
    textAlign: "center",
  },
  scanResult: {
    color: "#A0E07C",
    fontSize: 18,
    marginBottom: 20,
    fontFamily: "ABeeZee",
    textAlign: "center",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 16,
    fontFamily: "ABeeZee",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "#A0E07C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontFamily: "ABeeZee",
    color: "#000",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  secondaryButtonText: {
    fontFamily: "ABeeZee",
    color: "#000",
    fontSize: 16,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 100,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: "#2C3E50",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "ABeeZee",
  },
  permissionText: {
    fontSize: 16,
    color: "#BDC3C7",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "ABeeZee",
  },
  permissionButton: {
    backgroundColor: "#A0E07C",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 5,
  },
  permissionButtonText: {
    fontSize: 18,
    fontFamily: "ABeeZee",
    color: "#000",
    fontWeight: "bold",
  },
  cameraButton: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ScanScreen;
