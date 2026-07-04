import React, { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Libro = {
  id: string;
  titulo: string;
  autor: string;
  genero: string;
};

export default function RegistroLibrosScreen() {
  const [mostrarSplash, setMostrarSplash] = useState(true);

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');

  const [libros, setLibros] = useState<Libro[]>([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const agregarLibro = () => {
    const tituloLimpio = titulo.trim();
    const autorLimpio = autor.trim();
    const generoLimpio = genero.trim();

    if (tituloLimpio === '' || autorLimpio === '' || generoLimpio === '') {
      Alert.alert(
        'Alert',
        'Todos los campos son obligatorios.'
      );

      return;
    }

    setCargando(true);

    setTimeout(() => {
      const nuevoLibro: Libro = {
        id: Date.now().toString(),
        titulo: tituloLimpio,
        autor: autorLimpio,
        genero: generoLimpio,
      };

      setLibros((listaActual) => [nuevoLibro, ...listaActual]);

      setTitulo('');
      setAutor('');
      setGenero('');
      setCargando(false);

      Alert.alert(
        'Alert',
        'Libro guardado correctamente.'
      );
    }, 4000);
  };

  const renderLibro = ({ item }: { item: Libro }) => {
    return (
      <View style={styles.tarjetaLibro}>
        <Text style={styles.nombreLibro}>
          {item.titulo}
        </Text>

        <Text style={styles.detalleLibro}>
          Autor: {item.autor}
        </Text>

        <Text style={styles.detalleLibro}>
          Género: {item.genero}
        </Text>
      </View>
    );
  };

  if (mostrarSplash) {
    return (
      <View style={styles.splash}>
        <Text style={styles.iconoSplash}>
          📚
        </Text>

        <Text style={styles.textoSplash}>
          repaso2
        </Text>

        <Text style={styles.textoSplashSecundario}>
          Registro de libros leídos
        </Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop',
      }}
      style={styles.fondo}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.capaOscura}>
        <KeyboardAvoidingView
          style={styles.contenedor}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <FlatList
            data={libros}
            keyExtractor={(item) => item.id}
            renderItem={renderLibro}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.lista}
            ListHeaderComponent={
              <View>
                <Text style={styles.titulo}>
                  Catálogo de Libros
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Título del libro"
                  placeholderTextColor="#777777"
                  value={titulo}
                  onChangeText={setTitulo}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Autor"
                  placeholderTextColor="#777777"
                  value={autor}
                  onChangeText={setAutor}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Género"
                  placeholderTextColor="#777777"
                  value={genero}
                  onChangeText={setGenero}
                />

                <Pressable
                  style={({ pressed }) => [
                    styles.boton,
                    pressed && styles.botonPresionado,
                    cargando && styles.botonCargando,
                  ]}
                  onPress={agregarLibro}
                  disabled={cargando}
                >
                  {cargando ? (
                    <View style={styles.contenedorGuardando}>
                      <ActivityIndicator
                        size="small"
                        color="#FFFFFF"
                      />

                      <Text style={styles.textoBotonGuardando}>
                        Guardando...
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.textoBoton}>
                      Agregar Libro
                    </Text>
                  )}
                </Pressable>

                {cargando && (
                  <Text style={styles.textoGuardando}>
                    Guardando libro...
                  </Text>
                )}

                <Text style={styles.total}>
                  Total de libros: {libros.length}
                </Text>
              </View>
            }
            ListEmptyComponent={
              <View style={styles.tarjetaVacia}>
                <Text style={styles.textoVacio}>
                  Aún no hay libros registrados.
                </Text>
              </View>
            }
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconoSplash: {
    fontSize: 90,
    marginBottom: 15,
  },

  textoSplash: {
    color: '#111111',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },

  textoSplashSecundario: {
    color: '#555555',
    fontSize: 16,
    marginTop: 8,
  },

  fondo: {
    flex: 1,
  },

  capaOscura: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },

  contenedor: {
    flex: 1,
  },

  lista: {
    paddingHorizontal: 12,
    paddingTop: 55,
    paddingBottom: 40,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 22,
    textAlign: 'center',
  },

  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderRadius: 9,
    color: '#111111',
    fontSize: 15,
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  boton: {
    backgroundColor: '#006DD9',
    borderRadius: 9,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 2,
  },

  botonPresionado: {
    opacity: 0.75,
  },

  botonCargando: {
    backgroundColor: '#888888',
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  contenedorGuardando: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textoBotonGuardando: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  textoGuardando: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
    textAlign: 'center',
  },

  total: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 14,
    marginBottom: 12,
  },

  tarjetaLibro: {
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderRadius: 12,
    marginBottom: 12,
    padding: 15,
  },

  nombreLibro: {
    color: '#111111',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  detalleLibro: {
    color: '#222222',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },

  tarjetaVacia: {
    backgroundColor: 'rgba(255, 255, 255, 0.80)',
    borderRadius: 12,
    marginTop: 8,
    padding: 15,
  },

  textoVacio: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
});