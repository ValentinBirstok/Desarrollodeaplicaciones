import { View, Text, Pressable, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gestor de Tareas</Text>
      <Text style={styles.subtitulo}>Iteración 2 — React Native</Text>

      <Pressable
        style={styles.boton}
        onPress={() => navigation.navigate('Tareas')}
      >
        <Text style={styles.botonTxt}>Ver Tareas (CRUD)</Text>
      </Pressable>

      <Pressable
        style={[styles.boton, styles.botonTerciario]}
        onPress={() => navigation.navigate('TareasLocal')}
      >
        <Text style={styles.botonTxt}>Tareas Locales (SQLite)</Text>
      </Pressable>

      <Pressable
        style={[styles.boton, styles.botonSecundario]}
        onPress={() => navigation.navigate('AcercaDe')}
      >
        <Text style={styles.botonTxt}>Acerca De</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
    gap: 16,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1B3A6B',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 32,
  },
  boton: {
    backgroundColor: '#1B3A6B',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  botonSecundario: {
    backgroundColor: '#4a7bc8',
  },
  botonTerciario: {
    backgroundColor: '#2d6a4f',
  },
  botonTxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
