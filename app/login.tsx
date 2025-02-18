import React, { useState } from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input } from '@rneui/themed';

export default function Login() {
  const [errorMessageUsername, setErrorUsername] = useState('')
  const [errorMessagePassword, setErrorPassword] = useState('')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginText, setLoginText] = useState('Login');
  const [buttonLoading, setLoadingStatus] = useState(false);

  const validate = () => {
    let error = false;

    if (!username) {
      setErrorUsername('Please enter a username');
      error = true;
    } else {
      setErrorUsername('');
    }
    if (!password) {
      setErrorPassword('Please enter a password');
      error = true;
    } else setErrorPassword('');

    return !error;
  }

  const throwError = (response: any) => {
    if (response.message === 'Username or email not found') setErrorUsername(response.message);
    if (response.message === 'Incorrect password') setErrorPassword(response.message);
  }

  const login = async () => {
    if (!validate()) return;
    setLoadingStatus(true);
    const body = JSON.stringify({
      username: username,
      password: password,
    })
    const response = await fetch('http://localhost:3000/users/login', {
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
      setLoginText('Logged in!');
    } else setLoginText('Login')
    setLoadingStatus(false);
  };

  return (
    <View style={styles.container}>
      <Input
        id='username'
        style={[styles.input]}
        placeholder="Username or email"
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
        onPress={login}
        title={loginText}
      />
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
    backgroundColor: 'rgb(210, 230, 255)',
    margin: 100,
  },
});
