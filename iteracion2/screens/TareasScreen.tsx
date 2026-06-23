import { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Tarea } from './tipos';
import { tareasApi } from '../services/tareasApi';

type Estado = 'cargando' | 'error' | 'listo';

export default function TareasScreen() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [estado, setEstado] = useState<Estado>('cargando');
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [textoEdicion, setTextoEdicion] = useState('');

  useEffect(() => {
    cargar();
  }, []);

  async function cargar() {
    setEstado('cargando');
    try {
      const res = await tareasApi.getAll();
      setTareas(res.data);
      setEstado('listo');
    } catch {
      setEstado('error');
    }
  }

  async function agregar() {
    if (!nuevaTarea.trim()) return;
    try {
      await tareasApi.create(nuevaTarea.trim());
      setNuevaTarea('');
      await cargar();
    } catch {
      setEstado('error');
    }
  }

  async function eliminar(id: string) {
    try {
      await tareasApi.remove(id);
      setTareas(prev => prev.filter(t => t.id !== id));
    } catch {
      setEstado('error');
    }
  }

  async function guardarEdicion() {
    if (!editandoId) return;
    try {
      await tareasApi.update(editandoId, textoEdicion);
      setEditandoId(null);
      await cargar();
    } catch {
      setEstado('error');
    }
  }

  if (estado === 'cargando') {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#1B3A6B" />
      </View>
    );
  }

  if (estado === 'error') {
    return (
      <View style={styles.centrado}>
        <Text style={styles.error}>Error al conectar con el servidor</Text>
        <Pressable style={styles.boton} onPress={cargar}>
          <Text style={styles.botonTxt}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mis Tareas</Text>

      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          value={nuevaTarea}
          onChangeText={setNuevaTarea}
          placeholder="Nueva tarea..."
          placeholderTextColor="#999"
        />
        <Pressable style={styles.boton} onPress={agregar}>
          <Text style={styles.botonTxt}>Agregar</Text>
        </Pressable>
      </View>

      <FlatList<Tarea>
        data={tareas}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.vacio}>No hay tareas todavía</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.fila}>
            {editandoId === item.id ? (
              <>
                <TextInput
                  value={textoEdicion}
                  onChangeText={setTextoEdicion}
                  style={styles.inputEdicion}
                />
                <Pressable style={styles.btnGuardar} onPress={guardarEdicion}>
                  <Text style={styles.botonTxt}>Guardar</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.texto}>{item.task}</Text>
                <View style={styles.acciones}>
                  <Pressable
                    style={styles.btnEditar}
                    onPress={() => {
                      setEditandoId(item.id);
                      setTextoEdicion(item.task);
                    }}
                  >
                    <Text style={styles.botonTxt}>Editar</Text>
                  </Pressable>
                  <Pressable
                    style={styles.btnEliminar}
                    onPress={() => eliminar(item.id)}
                  >
                    <Text style={styles.botonTxt}>Eliminar</Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  centrado: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B3A6B',
    textAlign: 'center',
    marginBottom: 16,
  },
  formulario: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  inputEdicion: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#1B3A6B',
    borderRadius: 8,
    padding: 8,
  },
  boton: {
    backgroundColor: '#1B3A6B',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  botonTxt: { color: '#fff', fontWeight: 'bold' },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    gap: 8,
  },
  texto: { flex: 1, fontSize: 16 },
  acciones: { flexDirection: 'row', gap: 6 },
  btnEditar: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  btnEliminar: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  btnGuardar: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  error: { color: '#dc2626', fontSize: 16, marginBottom: 16 },
  vacio: { textAlign: 'center', color: '#999', marginTop: 32, fontSize: 16 },
});
