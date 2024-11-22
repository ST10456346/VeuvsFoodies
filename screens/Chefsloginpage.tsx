import { StyleSheet, Text, View, TextInput, Image, Button } from 'react-native';
import React, { useState } from 'react';

const ChefsLoginPage = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'Chef' && password === 'Password123') {
      navigation.navigate('ChefsMenu');
    } else {
      alert('Invalid credentials, please try again!');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Chef Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} color="#F57C00" />
    </View>
  );
};

export default ChefsLoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2C2C2C',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    color: '#FFFFFF',
  },
  input: {
    width: '100%',
    padding: 13,
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
});
