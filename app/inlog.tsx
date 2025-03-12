import React, { useState } from "react";
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet
} from "react-native";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secureText, setSecureText] = useState(true);

    return (
        <View style={styles.container}>
            {/* Titel */}
            <Text style={styles.title}>Inloggen</Text>
            <Text style={styles.subtitle}>Vul uw email en wachtwoord in</Text>

            {/* Email Input */}
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />

            {/* Wachtwoord Input */}
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Wachtwoord"
                    secureTextEntry={secureText}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                    <Text style={styles.toggleText}>{secureText ? "👁️" : "🙈"}</Text>
                </TouchableOpacity>
            </View>

            {/* Wachtwoord Vergeten */}
            <TouchableOpacity>
                <Text style={styles.forgotPassword}>Wachtwoord vergeten?</Text>
            </TouchableOpacity>

            {/* Inloggen Knop */}
            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Inloggen</Text>
            </TouchableOpacity>

            {/* Registreren Link */}
            <Text style={styles.registerText}>
                Geen account? <Text style={styles.registerLink}>Registreren</Text>
            </Text>
        </View>
    );
};

// Stijlen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#F5F5F5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        marginBottom: 15,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        marginBottom: 10,
    },
    passwordInput: {
        flex: 1,
    },
    toggleText: {
        fontSize: 16,
        color: "#666",
        marginLeft: 10,
    },
    forgotPassword: {
        alignSelf: "flex-end",
        color: "#007BFF",
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: "#4CAF50",
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 10,
    },
    loginButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    registerText: {
        marginTop: 20,
        color: "#666",
    },
    registerLink: {
        color: "#007BFF",
        fontWeight: "bold",
    },
});

export default LoginScreen;
