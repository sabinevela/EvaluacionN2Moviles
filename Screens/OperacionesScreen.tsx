import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getDatabase, ref, set } from 'firebase/database';
import { auth } from '../Config/Config';

const OperacionesScreen = () => {
  const [idOperacion, setIdOperacion] = useState<string>('');
  const [monto, setMonto] = useState<string>('');
  const [tipoOperacion, setTipoOperacion] = useState<string>('');
  const [comentario, setComentario] = useState<string>('');

  const handleOperaciones = () => {
    // Validar que los campos no estén vacíos
    if (idOperacion.trim() === '' || monto.trim() === '' || tipoOperacion.trim() === '' || comentario.trim() === '') {
      Alert.alert('Por favor, complete todos los campos.');
      return;
    }

    const montoNumerico = parseFloat(monto);

    // Validar que el monto sea positivo
    if (montoNumerico < 0) {
      Alert.alert('Error', 'El monto no puede ser negativo.');
      return;
    }

    // Si el monto es mayor a $500, preguntar si desea continuar
    if (montoNumerico > 500) {
      Alert.alert(
        'Confirmar Transacción',
        'El monto es mayor a $500. ¿Desea continuar con la operación?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Continuar',
            onPress: () => realizarOperacion(montoNumerico),
          },
        ]
      );
    } else {
      realizarOperacion(montoNumerico);
    }
  };

  const realizarOperacion = (montoNumerico: number) => {
    const db = getDatabase();
    const operacionesRef = ref(db, 'operaciones/' + idOperacion);

    set(operacionesRef, {
      idOperacion,
      monto: montoNumerico,
      tipoOperacion,
      comentario,
      usuario: auth.currentUser?.uid,
      timestamp: new Date().toISOString(),
    })
      .then(() => {
        Alert.alert('Operación registrada', 'La operación se ha ejecutado correctamente.');
        setIdOperacion('');
        setMonto('');
        setTipoOperacion('');
        setComentario('');
      })
      .catch((error) => {
        Alert.alert('Error', 'No se pudo registrar la operación.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Operaciones</Text>

      <TextInput
        style={styles.input}
        placeholder="ID de operación"
        value={idOperacion}
        onChangeText={setIdOperacion}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Monto"
        keyboardType="numeric"
        value={monto}
        onChangeText={setMonto}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Tipo de operación"
        value={tipoOperacion}
        onChangeText={setTipoOperacion}
      />

      <TextInput
        style={styles.input}
        placeholder="Comentario"
        value={comentario}
        onChangeText={setComentario}
      />

      <TouchableOpacity style={styles.button} onPress={handleOperaciones}>
        <Text style={styles.buttonText}>Ejecutar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    width: '100%',
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OperacionesScreen;


