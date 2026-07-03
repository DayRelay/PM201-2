import React, { useState } from 'react';

import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function ActivityIndicatorCarga() {
  const [cargando, setCargando] = useState(false);

  const iniciarCarga = () => {
    setCargando(true);

    setTimeout(() => {
      setCargando(false);
    }, 3000);
  };

  return (
    <View style={styles.tarjeta}>
      <Text style={styles.titulo}>
        Simulación de carga
      </Text>

      <Text style={styles.descripcion}>
        Presiona el botón para simular un proceso de tres segundos.
      </Text>

      {cargando ? (
        <View style={styles.contenedorCarga}>
          <ActivityIndicator
            size="large"
            color="#E63946"
          />

          <Text style={styles.mensaje}>
            Procesando...
          </Text>
        </View>
      ) : (
        <Pressable
          style={({ pressed }) => [
            styles.boton,
            pressed && styles.botonPresionado,
          ]}
          onPress={iniciarCarga}
        >
          <Text style={styles.textoBoton}>
            Iniciar carga
          </Text>
        </Pressable>
      )}
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

  contenedorCarga: {
    alignItems: 'center',
  },

  mensaje: {
    color: '#555555',
    fontSize: 16,
    marginTop: 12,
  },

  boton: {
    alignItems: 'center',
    backgroundColor: '#1D3557',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },

  botonPresionado: {
    opacity: 0.7,
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});