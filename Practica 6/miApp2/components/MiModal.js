import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

export function MiModal({
  visible,
  onCerrar,
  titulo,
  children,
}) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCerrar}
    >
      <View style={styles.fondo}>
        <View style={styles.contenido}>
          <Text style={styles.titulo}>{titulo}</Text>

          {children}

          <Pressable
            style={styles.boton}
            onPress={onCerrar}
          >
            <Text style={styles.botonTexto}>
              Cerrar
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.27)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  contenido: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },

  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 11,
  },

  boton: {
    marginTop: 16,
    backgroundColor: '#2a7e01',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },

  botonTexto: {
    color: 'white',
    fontWeight: '600',
  },
});