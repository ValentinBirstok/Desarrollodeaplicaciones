import { View, Text, Pressable, StyleSheet } from 'react-native';
import { TareaLocal } from '../screens/tipos';

interface Props {
  tarea: TareaLocal;
  onCompletar: (tarea: TareaLocal) => void;
  onEliminar: (id: number) => void;
  onEditar: (tarea: TareaLocal) => void;
}

export default function TareaItem({ tarea, onCompletar, onEliminar, onEditar }: Props) {
  return (
    <View style={styles.fila}>
      <Pressable
        style={[styles.check, tarea.completada ? styles.checkActivo : null]}
        onPress={() => onCompletar(tarea)}
      >
        <Text style={styles.checkTxt}>{tarea.completada ? '[X]' : '[ ]'}</Text>
      </Pressable>

      <Text style={[styles.texto, tarea.completada ? styles.textoTachado : null]}>
        {tarea.task}
      </Text>

      <View style={styles.acciones}>
        <Pressable style={styles.btnEditar} onPress={() => onEditar(tarea)}>
          <Text style={styles.botonTxt}>Editar</Text>
        </Pressable>
        <Pressable style={styles.btnEliminar} onPress={() => onEliminar(tarea.id)}>
          <Text style={styles.botonTxt}>X</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkActivo: {},
  checkTxt: { fontWeight: 'bold', fontSize: 14, color: '#1B3A6B' },
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
  botonTxt: { color: '#fff', fontWeight: 'bold' },
});
