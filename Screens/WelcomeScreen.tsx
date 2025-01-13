import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }: any) => (
  <View style={styles.container}>
    <Image 
      source={{ uri: 'https://i.pinimg.com/736x/b3/cc/d5/b3ccd57b054a73af1a0d281265b54ec8.jpg' }} 
      style={styles.image} 
    />

    <Text style={styles.title}>¡Bienvenido!</Text>

    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
      <Text style={styles.buttonText}>Iniciar Sesión</Text>
    </TouchableOpacity>

    <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={() => navigation.navigate('Registro')}>
      <Text style={styles.buttonText}>Registrarse</Text>
    </TouchableOpacity>

    <Text style={styles.footer}>Desarrollado por: <Text style={styles.author}>Sabine Vela</Text></Text>
  </View>
);

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
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 20 
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
  registerButton: {
    backgroundColor: '#03dac6',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 30,
    fontSize: 16,
    color: '#777',
  },
  author: {
    fontWeight: 'bold',
    color: '#6200ea',
  },
});

export default WelcomeScreen;



