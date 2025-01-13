import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import { getDatabase, ref, get } from 'firebase/database';
import { auth } from '../Config/Config';

type Operacion = {
  id: string;
  idOperacion: string;
  monto: string;
  tipoOperacion: string;
  comentario: string;
  timestamp: string;
};

const HistorialScreen: React.FC = () => {
  const [historial, setHistorial] = useState<Operacion[]>([]);

  useEffect(() => {
    const db = getDatabase();
    const historialRef = ref(db, 'operaciones/');
    
    get(historialRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const operaciones = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));
          setHistorial(operaciones);
        } else {
          Alert.alert('No hay historial disponible');
        }
      })
      .catch((error) => {
        Alert.alert('Error al obtener historial', error.message);
      });
  }, []);

  const handleItemPress = (comentario: string) => {
    Alert.alert('Comentario de la operación', comentario);
  };

  const renderItem = ({ item }: { item: Operacion }) => (
    <TouchableOpacity onPress={() => handleItemPress(item.comentario)}>
      <View style={styles.item}>
        <Text style={styles.itemText}>ID Operación: {item.idOperacion}</Text>
        <Text style={styles.itemText}>Monto: {item.monto}</Text>
        <Text style={styles.itemText}>Tipo de Operación: {item.tipoOperacion}</Text>
        <Text style={styles.itemText}>Comentario: {item.comentario}</Text>
        <Text style={styles.itemText}>Fecha: {item.timestamp}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Operaciones</Text>

      <FlatList
        data={historial}
        renderItem={renderItem}
        keyExtractor={(item) => item.id} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: '100%',
  },
  itemText: { fontSize: 16, color: '#333', marginBottom: 5 },
});

export default HistorialScreen;
