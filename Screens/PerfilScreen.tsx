import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { getDatabase, ref, get } from 'firebase/database';
import { auth } from '../Config/Config';

const PerfilScreen = () => {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `usuarios/${user.uid}`);
      
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserInfo(snapshot.val());
          } else {
            Alert.alert('Error', 'No se encontraron datos del usuario.');
          }
        })
        .catch((error) => {
          Alert.alert('Error', error.message);
        });
    }
  }, []);

  if (!userInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>Nombre Completo: {userInfo.userName}</Text>
        <Text style={styles.info}>Correo Electrónico: {userInfo.email}</Text>
        <Text style={styles.info}>Número Celular: {userInfo.phone}</Text>
        <Text style={styles.info}>Bienvenido, {userInfo.userName}!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#f5f5f5' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20 
  },
  infoContainer: { 
    width: '100%', 
    padding: 10, 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 8, 
    elevation: 4 
  },
  info: { 
    fontSize: 18, 
    color: '#333', 
    marginBottom: 12 
  },
});

export default PerfilScreen;


