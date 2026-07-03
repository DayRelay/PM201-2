import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';
import MenuScreen from './Screens/MenuScreen'


/* Zona 2: Main – Componentes */
export default function App() {

  return (
    <MenuScreen></MenuScreen>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
});
