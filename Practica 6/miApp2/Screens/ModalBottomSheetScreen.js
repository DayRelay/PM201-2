import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';

import { MiModal } from '../components/MiModal';
import { BottomSheet } from '../components/BottomSheet';

export default function ModalBottomSheetScreen({ onVolver }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Práctica 18
      </Text>

      <Text style={styles.subtitulo}>
        Modal & Bottom Sheet
      </Text>

      <Pressable
        style={[styles.boton, styles.botonModal]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.botonTexto}>
          Mostrar Modal
        </Text>
      </Pressable>

      <Pressable
        style={[styles.boton, styles.botonSheet]}
        onPress={() => setSheetVisible(true)}
      >
        <Text style={styles.botonTexto}>
          Abrir Bottom Sheet
        </Text>
      </Pressable>

      <Pressable
        style={styles.botonVolver}
        onPress={onVolver}
      >
        <Text style={styles.textoVolver}>
          Volver al menú
        </Text>
      </Pressable>

      <MiModal
        visible={modalVisible}
        onCerrar={() => setModalVisible(false)}
        titulo="Información del estudiante"
      >
        <Text style={styles.informacion}>
          Nombre: Alexis Maldonado
        </Text>

        <Text style={styles.informacion}>
          Carrera: Derechos y Ciencias Políticas
        </Text>

        <Text style={styles.informacion}>
          Cuatrimestre: 9
        </Text>
      </MiModal>

      <BottomSheet
        visible={sheetVisible}
        onCerrar={() => setSheetVisible(false)}
        titulo="Bottom Sheet"
      >
        <Text style={styles.informacion}>
          Este componente aparece desde abajo.
        </Text>

        <Text style={styles.textoCentrado}>
          También se puede cerrar tocando el área oscura.
        </Text>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#172033',
  },

  subtitulo: {
    fontSize: 19,
    color: '#64748b',
    marginBottom: 28,
  },

  boton: {
    width: '85%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },

  botonModal: {
    backgroundColor: '#2a7e01',
  },

  botonSheet: {
    backgroundColor: 'red',
  },

  botonTexto: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },

  botonVolver: {
    marginTop: 8,
    padding: 12,
  },

  textoVolver: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '600',
  },

  informacion: {
    fontSize: 16,
    marginBottom: 6,
  },

  textoCentrado: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  },
});