import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';

const integrantes = [
  { nombre: 'Birstok Valentín' },
  { nombre: 'Aguirre Juan Ignacio' },
  { nombre: 'Fiordalisi Faustino' },
  { nombre: 'Stinga Mateo' },
  { nombre: 'Vázquez Bautista' },
  { nombre: 'Hackbartt Martina' },
];

function AvatarPlaceholder({ nombre }: { nombre: string }) {
  const iniciales = nombre
    .split(' ')
    .slice(0, 2)
    .map(p => p[0])
    .join('');
  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarTxt}>{iniciales}</Text>
    </View>
  );
}

export default function AcercaDeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Acerca De</Text>
      <Text style={styles.subtitulo}>
        Gestor de Tareas — Iteración 2
      </Text>
      <Text style={styles.descripcion}>
        Aplicación desarrollada para la materia Desarrollo de Aplicaciones 1 (UADE).
        Esta iteración está construida en React Native + Expo.
      </Text>

      <Text style={styles.seccion}>Integrantes del equipo</Text>

      {integrantes.map(({ nombre }) => (
        <View key={nombre} style={styles.tarjeta}>
          <AvatarPlaceholder nombre={nombre} />
          <Text style={styles.nombre}>{nombre}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1B3A6B',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 12,
  },
  descripcion: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  seccion: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1B3A6B',
    marginBottom: 12,
  },
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f4ff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    gap: 14,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1B3A6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  nombre: { fontSize: 16, color: '#222' },
});
