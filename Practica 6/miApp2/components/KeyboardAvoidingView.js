import React, { useState } from 'react';

import {
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function KeyboardAvoidingDemo() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');

  return (
    <RNKeyboardAvoidingView
      style={styles.tarjeta}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={20}
    >
      <View>
        <Text style={styles.titulo}>
          KeyboardAvoidingView
        </Text>

        <Text style={styles.descripcion}>
          Evita que el teclado cubra los campos de texto.
        </Text>

        <Text style={styles.etiqueta}>
          Nombre
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Escribe tu nombre"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.etiqueta}>
          Correo electrónico
        </Text>

        <TextInput
          style={styles.input}
          placeholder="correo@ejemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={correo}
          onChangeText={setCorreo}
        />

        <Text style={styles.resultado}>
          Nombre: {nombre || 'Sin escribir'}
        </Text>

        <Text style={styles.resultado}>
          Correo: {correo || 'Sin escribir'}
        </Text>
      </View>
    </RNKeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 3,
    marginBottom: 20,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  titulo: {
    color: '#1D3557',
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  descripcion: {
    color: '#555555',
    fontSize: 16,
    marginBottom: 20,
    marginTop: 8,
    textAlign: 'center',
  },

  etiqueta: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  input: {
    backgroundColor: '#F1F3F6',
    borderColor: '#AAAAAA',
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 15,
    padding: 12,
  },

  resultado: {
    color: '#555555',
    fontSize: 15,
    marginTop: 5,
  },
});