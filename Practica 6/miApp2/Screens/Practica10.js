/* importaciones */

import React, {useState} from 'react';
import { SafeAreaView, ScrollView, View, Text, Button } from 'react-native';


/* Función */

export default function Practica() {

    const [tareas, setTareas] = useState([
        'Ir al gimnasio',
        'Asistir a clases',
        'Pasar lista',
        'Ver a la novia',
        'Dormir temprano',
    ]);

    const agregarTarea = () => {
        setTareas([ ...tareas, `Nueva Tarea ${tareas.length + 1}`]);
    };

    return (

/* Interfaz */
        <SafeAreaView style={{ flex: 1}}>
        
            <Button title="Agregar tarea" onPress={agregarTarea} />

            <ScrollView contentContainerStyle={{ padding: 30}}>
            
                {tareas.map((tarea, index) => (
                    <View key={index} style={{ marginBottom: 10, padding: 15, backgroundColor: '#ddd'}}>
                        <Text>{tarea}</Text>
                    </View>))}

            </ScrollView>

        </SafeAreaView>
    );
}