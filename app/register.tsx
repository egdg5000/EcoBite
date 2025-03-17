import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useFonts } from 'expo-font';
import {Button, Input } from '@rneui/themed';


const RegistrationScreen = () => {
    const router = useRouter();
    const {email} = useLocalSearchParams<{ email: string }>();
    const [errorMessageEmail, setErrorEmail] = useState('')
    const [errorMessageUsername, setErrorUsername] = useState('')
    const [errorMessagePassword, setErrorPassword] = useState('')
    const [username, setUsername] = useState('');
    const [newemail, setEmail] = useState(email);
    const [password, setPassword] = useState('');
    const [registerText, setRegisterText] = useState('Register');
    const [buttonLoading, setLoadingStatus] = useState(false);

    const [fontsLoaded] = useFonts({
        'ABeeZee': require('../assets/fonts/ABeeZee.ttf'),
      });

    const validate = () => {
        let error = false;
    
        if (!username) {
          setErrorUsername('Please enter a username');
          error = true;
        } else {
          setErrorUsername('');
        }
    
        if (!newemail) {
          setErrorEmail('Please enter an email');
          error = true;
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(newemail)) {
            setErrorEmail('Please enter a valid email address');
            error = true;
          } else setErrorEmail('');
        }
    
        if (!password) {
          setErrorPassword('Please enter a password');
          error = true;
        } else {
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
          if (!passwordRegex.test(password)) {
            setErrorPassword('Password must contain at least one uppercase letter, one lowercase letter and a number, and must be at least 8 characters long.');
            error = true;
          } else setErrorPassword('');
        }
    
        return !error;
    }

    const throwError = (response: any) => {
        if (response.message === 'Username and email already in use') {
          setErrorUsername('Username already in use');
          setErrorEmail('Email already in use');
        };
        if (response.message === 'Username already in use') setErrorUsername(response.message);
        if (response.message === 'Email already in use') setErrorEmail(response.message);
    }
    
    const register = async () => {
        if (!validate()) return;
        setLoadingStatus(true);
        const body = JSON.stringify({
          username: username,
          email: newemail,
          password: password,
        })
        const response = await fetch('http://localhost:3000/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body
        });
        
        const data = await response.json();
        if (!response.ok) {
          throwError(data);
        }
        if (data.success){
          setRegisterText('Registered!');
          router.push('/home');
        } else setRegisterText('Register')
        setLoadingStatus(false);
    };
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}> 
          <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.container}>
              <Image source={require('../assets/images/EcoBite2.png')} style={styles.logo} />
              <Text style={styles.title}>Registreren</Text>
              <Text style={styles.subtitle}>Vul uw gegevens in om door te gaan</Text>
              
              <Text style={styles.label}>Gebruikersnaam</Text>
              <Input 
                  id='username'
                  style={[styles.input]}
                  placeholder="Username"
                  placeholderTextColor="#777"
                  value={username}
                  onChangeText={setUsername}
                  errorMessage={errorMessageUsername}
                  renderErrorMessage={true}
                  inputContainerStyle={{
                    width: '100%',
                    borderBottomWidth:0,
                    alignSelf: 'center'
                  }}
              />
              
              <Text style={styles.label}>Email</Text>
              <Input 
                  id='email'
                  style={[styles.input]}
                  placeholder="Email"
                  placeholderTextColor="#777"
                  value={newemail}
                  onChangeText={setEmail}
                  errorMessage={errorMessageEmail}
                  renderErrorMessage={true}
                  inputContainerStyle={{
                    width: '100%',
                    borderBottomWidth:0,
                    alignSelf: 'center'
                  }}
              />
              
              <Text style={styles.label}>Wachtwoord</Text>
              <Input 
                  id='password'
                  style={[styles.input]}
                  placeholder="Password"
                  placeholderTextColor="#777"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                  renderErrorMessage={true}
                  errorMessage={errorMessagePassword}
                  inputContainerStyle={{
                    width: '100%',
                    borderBottomWidth:0,
                    alignSelf: 'center'
                  }}
              />

              <Button 
                  loading={buttonLoading}
                  containerStyle={{width: '100%'}}
                  buttonStyle={styles.button}
                  onPress={register}
                  title={registerText}/>
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
        justifyContent: 'flex-end'
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
    label: {
        alignSelf: 'flex-start',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        fontFamily: 'ABeeZee', 
    },
    input: {
        backgroundColor: '#F5F5F5',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 8,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '100%',
        marginTop: 5,
    },
    linkContainer: {
      paddingTop: 100,
      alignSelf: 'center',
      bottom: 25,
    },
    link: {
        color: '#28a745',
        fontWeight: 'bold',
        fontFamily: 'ABeeZee',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#2DBE60',
        padding: 10,
        borderRadius: 5,
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
});

export default RegistrationScreen;