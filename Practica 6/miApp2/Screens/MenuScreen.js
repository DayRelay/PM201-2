/* Zona 1: importaciones de archivos y componentes  */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import React, {Component, useEffect,useState} from 'react';
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
import { ComponenetesNativos } from './ComponenetesNativos';
import { KeyboardAvoidingDemo } from '../components/KeyboardAvoidingView';



/* Zona 2: Main – Componentes */
export default function App() {

    const [screen,setScreen] = useState('menu');

    useEffect(() => {
        if (screen === 'splashScreen') {
            const timer = setTimeout(() => {
                setScreen('home');
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [screen]);

    switch(screen){
        case 'tarjetas': 
            return <TarjetasScreen/>
        
        case 'componente1':
            return <Componente1/>

        case 'pressable':
            return <PressableScreen/>

        case 'switch':
            return <SwitchScreen/>
        
        case 'formulario':
            return (
                <FormularioScreen
                onVolver={() => setScreen('menu')}
                />
            );

        case 'practica':
            return <Practica10/>

        case 'componente4':
            return <Componente4_0/>

        case 'componenteAlert':
            return <ComponenteAlert/>

        case 'flatlist':
            return <FlatListScreen/>

        case 'sectionlist':
            return <SectionListScreen/>

        case 'imagenFondo':
            return <ImagenFondo style={styles.container}/>
        
        case 'home':
            return <Home/>

        case 'splashScreen':
            return <SplashScreen/>
        
        case 'ComponentesNativos':
            return <ComponenetesNativos/>
        
        case 'menu':
            default:

        return (
            <View>
                <Text>Aqui va la primer Practica de Componentes Nativos</Text>

                <Button title="Practica Tarjetas" onPress={()=>setScreen('tarjetas')}/>

                
                <Button title="Practica Componente1" onPress={()=>setScreen('componente1')}/>
                
                <Button title="Practica Pressable" onPress={() => setScreen('pressable')}/>

                <Button title="Practica Swtich" onPress={() => setScreen('switch')}/>

                <Button title="Practica Formulario" onPress={()=>setScreen('formulario')}/>
                
                <Button title="Practica SafeArea" onPress={() => setScreen('practica')}/>

                <Button title="Practica TextInput" onPress={() => setScreen('componente4')}/>

                <Button title="Practica Alert" onPress={() => setScreen('componenteAlert')}/>

                <Button title="Practica FlatList" onPress={() => setScreen('flatlist')}/>
                
                <Button title="Practica SectionList" onPress={() => setScreen('sectionlist')}/>

                <Button title='Imagen Bg' onPress={() => setScreen('imagenFondo')}/>

                <Button title='Splash' onPress={() => setScreen('splashScreen')}/>

                <Button title='Home' onPress={() => setScreen('home')}/>

                <Button title='Componentes Nativos' onPress={() => setScreen('ComponentesNativos')}/>
            </View>

        );
    }
}
/* Zona 3: Estilos y posicionamientos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
});