import React from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function ActivityIndicatorDemo() {
  return (
    <View style={styles.tarjeta}>
      <Text style={styles.titulo}>
        ActivityIndicator básico
      </Text>

      <Text style={styles.descripcion}>
        Este componente muestra que una actividad se está procesando.
      </Text>

      <ActivityIndicator
        size="large"
        color="#1D3557"
      />

      <Text style={styles.cargando}>
        Cargando información...
      </Text>
    </View>
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

  cargando: {
    color: '#555555',
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
  },
});