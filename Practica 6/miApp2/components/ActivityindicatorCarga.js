import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function ActivityIndicatorCarga() {
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('Presiona el botón para comenzar.');
  const temporizador = useRef(null);

  useEffect(() => {
    return () => clearTimeout(temporizador.current);
  }, []);

  const cargarDatos = () => {
    clearTimeout(temporizador.current);
    setLoading(true);
    setMensaje('Cargando información...');

    temporizador.current = setTimeout(() => {
      setLoading(false);
      setMensaje('Datos cargados correctamente.');
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Simulación de carga</Text>

      <Text style={styles.descripcion}>
        Este ejemplo simula durante tres segundos una petición de datos a un
        servidor.
      </Text>

      <Button
        title={loading ? 'Cargando...' : 'Obtener Datos'}
        onPress={cargarDatos}
        disabled={loading}
        color="green"
      />

      <View style={styles.indicador}>
        <ActivityIndicator
          size="large"
          color="green"
          animating={loading}
        />
      </View>

      <Text style={styles.texto}>{mensaje}</Text>
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
  texto: {
    fontSize: 16,
    textAlign: 'center',
  },
});