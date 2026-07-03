/* Zona 1: importaciones */
import React, { useEffect, useState } from 'react';

import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import TarjetasScreen from './TarjetasScreen';
import Componente1 from './Componente1';
import FormularioScreen from './Formulario';
import Practica10 from './Practica10';
import PressableScreen from './PressableScreen';
import SwitchScreen from './SwitchScreen';
import { Componente4_0 } from './Componente4_0';
import ComponenteAlert from './ComponenteAlert';
import FlatListScreen from './FlatListScreen';
import SectionListScreen from './SectionList';
import { ImagenFondo } from './ImagenFondo';
import { Home } from './Home';
import { SplashScreen } from './SplashScreen';

/*
  Este archivo usa export default, por eso no lleva llaves.
  El archivo debe llamarse ComponentesNativos.js.
*/
import ComponentesNativosScreen from './ComponentesNativos';


/* Zona 2: componente principal */
export default function MenuScreen() {
  const [screen, setScreen] = useState('menu');

  useEffect(() => {
    if (screen === 'splashScreen') {
      const timer = setTimeout(() => {
        setScreen('home');
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [screen]);

  switch (screen) {
    case 'tarjetas':
      return <TarjetasScreen />;

    case 'componente1':
      return <Componente1 />;

    case 'pressable':
      return <PressableScreen />;

    case 'switch':
      return <SwitchScreen />;

    case 'formulario':
      return (
        <FormularioScreen
          onVolver={() => setScreen('menu')}
        />
      );

    case 'practica':
      return <Practica10 />;

    case 'componente4':
      return <Componente4_0 />;

    case 'componenteAlert':
      return <ComponenteAlert />;

    case 'flatlist':
      return <FlatListScreen />;

    case 'sectionlist':
      return <SectionListScreen />;

    case 'imagenFondo':
      return <ImagenFondo />;

    case 'home':
      return <Home />;

    case 'splashScreen':
      return <SplashScreen />;

    case 'componentesNativos':
      return (
        <ComponentesNativosScreen
          onVolver={() => setScreen('menu')}
        />
      );

    case 'menu':
    default:
      return (
        <ScrollView
          style={styles.pantalla}
          contentContainerStyle={styles.menu}
        >
          <Text style={styles.titulo}>
            Prácticas de Componentes Nativos
          </Text>

          <View style={styles.espacioBoton}>
            <Button
              title="Práctica Tarjetas"
              onPress={() => setScreen('tarjetas')}
            />
          </View>

          <View style={styles.espacioBoton}>
            <Button
              title="Práctica Componente 1"
              onPress={() => setScreen('componente1')}
            />
          </View>

          <View style={styles.espacioBoton}>
            <Button
              title="Práctica Pressable"
              onPress={() => setScreen('pressable')}
            />
          </View>

          <View style={styles.espacioBoton}>
            <Button
              title="Práctica Switch"
              onPress={() => setScreen('switch')}
            />
          </View>

          <View style={styles.espacioBoton}>
            <Button
              title="Práctica Formulario"
              onPress={() => setScreen('formulario')}
            />
          </View>

          <View style={styles.espacioBoton}>
            <Button
              title="Práctica SafeArea"
              onPress={() => setScreen('practica')}
            />
          </View>

          <View style={styles.espacioBoton}>
            <Button
              title="Práctica TextInput"
              onPress={() => setScreen('componente4')}
            />
          </View>

          <View style={styles.espacioBoton}>
            <Button
              title="Práctica Alert"
              onPress={() => setScreen('componenteAlert')}
            />
          </View>

          <View style={styles.espacioBoton}>
            <Button
              title="Práctica FlatList"
              onPress={() => setScreen('flatlist')}
            />
          </View>

          <View style={styles.espacioBoton}>
            <Button
              title="Práctica SectionList"
              onPress={() => setScreen('sectionlist')}
            />
          </View>

          <View style={styles.espacioBoton}>
            <Button
              title="Imagen BG"
              onPress={() => setScreen('imagenFondo')}
            />
          </View>

          <View style={styles.espacioBoton}>
            <Button
              title="Splash"
              onPress={() => setScreen('splashScreen')}
            />
          </View>

          <View style={styles.espacioBoton}>
            <Button
              title="Home"
              onPress={() => setScreen('home')}
            />
          </View>

          <View style={styles.espacioBoton}>
            <Button
              title="Componentes Nativos"
              onPress={() => setScreen('componentesNativos')}
              color="#1D3557"
            />
          </View>
        </ScrollView>
      );
  }
}


/* Zona 3: estilos */
const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  menu: {
    paddingBottom: 30,
    paddingHorizontal: 15,
    paddingTop: 30,
  },

  titulo: {
    color: '#1D3557',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  espacioBoton: {
    marginBottom: 8,
  },
});