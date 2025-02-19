import React, { useState } from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input } from '@rneui/themed';

export default function Register() {
  const [errorMessageEmail, setErrorEmail] = useState('')
  const [errorMessageUsername, setErrorUsername] = useState('')
  const [errorMessagePassword, setErrorPassword] = useState('')
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerText, setRegisterText] = useState('Register');
  const [buttonLoading, setLoadingStatus] = useState(false);

  const validate = () => {
    let error = false;

    if (!username) {
      setErrorUsername('Please enter a username');
      error = true;
    } else {
      setErrorUsername('');
    }

    if (!email) {
      setErrorEmail('Please enter an email');
      error = true;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
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
      email: email,
      password: password,
    })
    try {
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
      } else setRegisterText('Register')
    } catch (error) {
      console.error('Network error:', error);
      setRegisterText('Network error occurred');
    } finally {
      setLoadingStatus(false);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        id='username'
        style={[styles.input]}
        placeholder="Username"
        placeholderTextColor="black"
        value={username}
        onChangeText={text => setUsername(text)}
        errorMessage={errorMessageUsername}
        renderErrorMessage={true}
        errorStyle={{marginLeft: '20%'}}
        inputContainerStyle={{
          width: '70%',
          borderBottomColor:'transparent',
          alignSelf: 'center'
        }}
      />
      <Input
        id='email'
        style={[styles.input]}
        placeholder="Email"
        placeholderTextColor="black"
        value={email}
        onChangeText={text => setEmail(text)}
        errorMessage={errorMessageEmail}
        renderErrorMessage={true}
        errorStyle={{marginLeft: '20%'}}
        inputContainerStyle={{
          width: '70%',
          borderBottomColor:'transparent',
          alignSelf: 'center'
        }}
      />
      <Input
        id='password'
        style={[styles.input]}
        placeholder="Password"
        placeholderTextColor="black"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
        renderErrorMessage={true}
        errorStyle={{marginLeft: '20%'}}
        errorMessage={errorMessagePassword}
        inputContainerStyle={{
          width: '70%',
          borderBottomColor:'transparent',
          alignSelf: 'center'
        }}
      />
      <Button 
        loading={buttonLoading}
        buttonStyle={styles.button}
        onPress={register}
        title={registerText}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  errorMessage: {
    flex: 1,
    backgroundColor: 'blue',
    width: '100%',
  },
  input: {
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    },
  button: {
    padding: 6, 
    backgroundColor: 'rgb(98, 169, 255)',
    margin: 100,
  },
});
