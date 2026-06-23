import { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { TareaLocal } from './tipos';

export default function TareasLocalScreen() {
  const db = useSQLiteContext();
  const [tareas, setTareas] = useState<TareaLocal[]>([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [textoEdicion, setTextoEdicion] = useState('');

  useEffect(() => {
    cargar();
  }, []);

  async function cargar() {
    const resultado = await db.getAllAsync<TareaLocal>(
      'SELECT * FROM tareas ORDER BY id DESC'
    );
    setTareas(resultado);
  }

  async function agregar() {
    if (!nuevaTarea.trim()) return;
    await db.runAsync('INSERT INTO tareas (task) VALUES (?)', [nuevaTarea.trim()]);
    setNuevaTarea('');
    await cargar();
  }

  async function toggleCompletada(id: number, completadaActual: number) {
    const nuevoEstado = completadaActual === 0 ? 1 : 0;
    await db.runAsync('UPDATE tareas SET completada = ? WHERE id = ?', [nuevoEstado, id]);
    setTareas(prev =>
      prev.map(t => (t.id === id ? { ...t, completada: nuevoEstado } : t))
    );
  }

  async function guardarEdicion() {
    if (!editandoId) return;
    await db.runAsync('UPDATE tareas SET task = ? WHERE id = ?', [textoEdicion, editandoId]);
    setEditandoId(null);
    await cargar();
  }

  async function eliminar(id: number) {
    await db.runAsync('DELETE FROM tareas WHERE id = ?', [id]);
    setTareas(prev => prev.filter(t => t.id !== id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tareas Locales</Text>

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

      <FlatList<TareaLocal>
        data={tareas}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.vacio}>No hay tareas locales todavía</Text>
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
                <Pressable
                  style={[styles.check, item.completada ? styles.checkActivo : null]}
                  onPress={() => toggleCompletada(item.id, item.completada)}
                >
                  <Text style={styles.checkTxt}>{item.completada ? '✓' : ' '}</Text>
                </Pressable>
                <Text style={[styles.texto, item.completada ? styles.textoTachado : null]}>
                  {item.task}
                </Text>
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
  check: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#1B3A6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkActivo: { backgroundColor: '#1B3A6B' },
  checkTxt: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  texto: { flex: 1, fontSize: 16 },
  textoTachado: { textDecorationLine: 'line-through', color: '#999' },
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
  vacio: { textAlign: 'center', color: '#999', marginTop: 32, fontSize: 16 },
});
