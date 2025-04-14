import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity, SafeAreaView } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";

const ScanScreen = () => {
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const router = useRouter();
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  const [fontsLoaded] = useFonts({
    ABeeZee: require("../../assets/fonts/ABeeZee.ttf"),
  });

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    setScannedData(data);
    console.log("Gescannde data:", data);
  };

  // if (hasPermission === null) {
  //   return (
  //     <View style={styles.centered}>
  //       <Text style={styles.text}>Toestemming wordt gevraagd...</Text>
  //     </View>
  //   );
  // }

  // if (hasPermission === false) {
  //   return (
  //     <View style={styles.centered}>
  //       <Text style={styles.text}>Geen toegang tot camera</Text>
  //     </View>
  //   );
  // }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <View style={styles.scannerContainer}>
        <CameraView
          facing={facing}
          barcodeScannerSettings={{
            barcodeTypes: ["ean13"],
          }}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>

      <View style={styles.infoContainer}>
        {scanned ? (
          <>
            <Text style={styles.scanResult}>Gescande code: {scannedData}</Text>
            <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
              <Text style={styles.buttonText}>Opnieuw scannen</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.text}>Richt je camera op een barcode</Text>
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
  centered: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
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
  button: {
    backgroundColor: "#A0E07C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
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
});

export default ScanScreen;
