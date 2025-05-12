import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { Button, Input } from '@rneui/themed';

const RegistrationScreen = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [errorMessageEmail, setErrorEmail] = useState('');
  const [errorMessageUsername, setErrorUsername] = useState('');
  const [errorMessagePassword, setErrorPassword] = useState('');
  const [username, setUsername] = useState('');
  const [newemail, setEmail] = useState(email || '');
  const [password, setPassword] = useState('');
  const [registerText, setRegisterText] = useState('Registreren');
  const [buttonLoading, setLoadingStatus] = useState(false);

  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  const [fontsLoaded] = useFonts({
    ABeeZee: require('../assets/fonts/ABeeZee.ttf'),
  });

  const validatePassword = (password: string) => {
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
    };
    setPasswordCriteria(criteria);
  };

  const validate = () => {
    let error = false;

    if (!username) {
      setErrorUsername('Voer een gebruikersnaam in');
      error = true;
    } else {
      setErrorUsername('');
    }

    if (!newemail) {
      setErrorEmail('Voer een email in');
      error = true;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newemail)) {
        setErrorEmail('Voer een geldige email in');
        error = true;
      } else setErrorEmail('');
    }

    if (!password) {
      setErrorPassword('Voer een wachtwoord in');
      error = true;
    } else {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(password)) {
        setErrorPassword(
          'Het wachtwoord moet minstens één hoofdletter, één kleine letter en één cijfer bevatten en moet minstens 8 tekens lang zijn.'
        );
        error = true;
      } else setErrorPassword('');
    }

    return !error;
  };

  const throwError = (response: any) => {
    if (response.message === 'Gebruikersnaam en email zijn al in gebruik') {
      setErrorUsername('Gebruikersnaam is al in gebruik');
      setErrorEmail('Email is al in gebruik');
    }
    if (response.message === 'Gebruikersnaam is al in gebruik')
      setErrorUsername(response.message);
    if (response.message === 'Email is al in gebruik')
      setErrorEmail(response.message);
  };

  const register = async () => {
    if (!validate()) return;
    setLoadingStatus(true);
    const body = JSON.stringify({
      username: username,
      email: newemail,
      password: password,
    });
    const response = await fetch('https://edg5000.com/users/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    const data = await response.json();
    if (!response.ok) {
      throwError(data);
    }
    if (data.success) {
      setRegisterText('Geregistreerd!');
      router.push('/setup');
    } else setRegisterText('Registreren');
    setLoadingStatus(false);
  };

  const PasswordCriteriaList = ({ criteria }: { criteria: typeof passwordCriteria }) => (
    <View style={styles.criteriaContainer}>
      <Text style={criteria.length ? styles.criteriaMet : styles.criteriaNietMet}>
        • Minimaal 8 tekens
      </Text>
      <Text style={criteria.uppercase ? styles.criteriaMet : styles.criteriaNietMet}>
        • Minstens 1 hoofdletter
      </Text>
      <Text style={criteria.lowercase ? styles.criteriaMet : styles.criteriaNietMet}>
        • Minstens 1 kleine letter
      </Text>
      <Text style={criteria.number ? styles.criteriaMet : styles.criteriaNietMet}>
        • Minstens 1 cijfer
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          <Image source={require('../assets/images/EcoBite2.png')} style={styles.logo} />
          <Text style={styles.title}>Registreren</Text>
          <Text style={styles.subtitle}>Vul uw gegevens in om door te gaan</Text>

          <Input
            placeholder="Gebruikersnaam"
            placeholderTextColor="#777"
            value={username}
            onChangeText={setUsername}
            errorMessage={errorMessageUsername}
            renderErrorMessage={true}
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
          />

          <Input
            placeholder="Email"
            placeholderTextColor="#777"
            value={newemail}
            onChangeText={setEmail}
            errorMessage={errorMessageEmail}
            renderErrorMessage={true}
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
          />

          <Input
            placeholder="Wachtwoord"
            placeholderTextColor="#777"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              validatePassword(text);
            }}
            errorMessage={errorMessagePassword}
            renderErrorMessage={true}
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
          />

          <PasswordCriteriaList criteria={passwordCriteria} />

          <Button
            loading={buttonLoading}
            containerStyle={{ width: '100%' }}
            buttonStyle={styles.button}
            onPress={register}
            title={registerText}
            titleStyle={styles.buttonText}
          />

          <Text style={styles.loginText}>
            Al een account?
            <Link href="/login" asChild>
              <Text style={styles.loginLink}> Inloggen</Text>
            </Link>
          </Text>
        </View>
      </KeyboardAvoidingView>

      <View style={styles.linkContainer}>
        <Link href="/terms" asChild>
          <TouchableOpacity>
            <Text style={styles.link}>Servicevoorwaarden</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/privacy_policy" asChild>
          <TouchableOpacity>
            <Text style={styles.link}>Privacybeleid</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'flex-end',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'ABeeZee',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    fontFamily: 'ABeeZee',
  },
  inputContainer: {
    width: '100%',
    borderBottomWidth: 0,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    fontFamily: 'ABeeZee',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'ABeeZee',
  },
  loginText: {
    marginTop: 20,
    color: '#666',
    fontFamily: 'ABeeZee',
  },
  loginLink: {
    color: '#007BFF',
    fontWeight: 'bold',
    fontFamily: 'ABeeZee',
  },
  linkContainer: {
    paddingTop: 100,
    alignSelf: 'center',
    bottom: 25,
  },
  link: {
    color: '#007BFF',
    fontWeight: 'bold',
    fontFamily: 'ABeeZee',
    textAlign: 'center',
  },
  criteriaContainer: {
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  criteriaMet: {
    color: 'green',
    fontFamily: 'ABeeZee',
    fontSize: 14,
    textAlign: 'center',
  },
  criteriaNietMet: {
    color: 'red',
    fontFamily: 'ABeeZee',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default RegistrationScreen;
