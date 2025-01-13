import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Config/Config';


const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Por favor, ingrese ambos campos.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert('Sesión iniciada');
        navigation.navigate('Perfil');
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert('Error', errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://i.pinimg.com/736x/0d/8a/17/0d8a17b67323b5e90fe8a4c4aaaffdea.jpg' }} 
        style={styles.image} 
      />
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Correo electrónico" 
        keyboardType="email-address" 
        value={email}
        onChangeText={setEmail} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Contraseña" 
        secureTextEntry 
        value={password}
        onChangeText={setPassword} 
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f5f5f5' 
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20 
  },
  input: { 
    width: '80%', 
    padding: 10, 
    marginVertical: 10, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 5 
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;



