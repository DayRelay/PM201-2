import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function ActivityIndicatorDemo() {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>ActivityIndicator</Text>

      <Text style={styles.descripcion}>
        La prop animating controla si el indicador se muestra. También se usan
        las props size y color.
      </Text>

      <Button
        title="Mostrar/Ocultar Spinner"
        onPress={() => setLoading((estadoActual) => !estadoActual)}
      />

      <View style={styles.indicador}>
        <ActivityIndicator
          size="large"
          color="blue"
          animating={loading}
        />
      </View>

      <Text style={styles.estado}>
        Estado actual: {loading ? 'Cargando' : 'Detenido'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 3,
    marginBottom: 20,
    padding: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descripcion: {
    color: '#444444',
    lineHeight: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  indicador: {
    height: 60,
    justifyContent: 'center',
    marginTop: 10,
  },
  estado: {
    fontWeight: '600',
  },
});