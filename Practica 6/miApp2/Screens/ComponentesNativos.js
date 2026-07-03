import React from 'react';

import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

import ActivityIndicatorCarga from '../components/ActivityindicatorCarga';
import ActivityIndicatorDemo from '../components/ActivityindicatorDemo';
import KeyboardAvoidingDemo from '../components/KeyboardAvoidingView';

export default function ComponentesNativosScreen({ onVolver }) {
  return (
    <View style={styles.pantalla}>
      <StatusBar style="dark" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.encabezado}>
          Práctica 16
        </Text>

        <Text style={styles.subtitulo}>
          ActivityIndicator y KeyboardAvoidingView
        </Text>

        <ActivityIndicatorDemo />

        <ActivityIndicatorCarga />

        <KeyboardAvoidingDemo />

        <View style={styles.contenedorBoton}>
          <Button
            title="Volver al menú"
            onPress={onVolver}
            color="#1D3557"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#F1F3F6',
  },

  scroll: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    paddingBottom: 40,
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  encabezado: {
    color: '#1D3557',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitulo: {
    color: '#555555',
    fontSize: 18,
    marginBottom: 25,
    marginTop: 8,
    textAlign: 'center',
  },

  contenedorBoton: {
    marginBottom: 20,
    marginTop: 5,
  },
});