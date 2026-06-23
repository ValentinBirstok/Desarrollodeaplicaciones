import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';

// El módulo nativo solo existe en Android; en web/iOS devuelve undefined
let DispositivoModule: any = null;
if (Platform.OS === 'android') {
  DispositivoModule = require('../modules/dispositivo/src/DispositivoModule').default;
}

interface InfoDispositivo {
  modelo: string;
  fabricante: string;
  version: string;
}

export default function DispositivoScreen() {
  const [info, setInfo] = useState<InfoDispositivo | null>(null);
  const [nombre, setNombre] = useState('');
  const [saludo, setSaludo] = useState('');

  useEffect(() => {
    if (DispositivoModule) {
      setInfo({
        modelo: DispositivoModule.getModelo(),
        fabricante: DispositivoModule.getFabricante(),
        version: DispositivoModule.getVersionAndroid(),
      });
    }
  }, []);

  function obtenerSaludo() {
    if (!DispositivoModule) {
      setSaludo('Este módulo nativo solo funciona en Android.');
      return;
    }
    const resultado = DispositivoModule.saludar(nombre.trim() || 'Mundo');
    setSaludo(resultado);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Módulo Nativo Android</Text>
      <Text style={styles.subtitulo}>Componente escrito en Kotlin, integrado en React Native</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Información del dispositivo</Text>
        {info ? (
          <>
            <Fila etiqueta="Modelo" valor={info.modelo} />
            <Fila etiqueta="Fabricante" valor={info.fabricante} />
            <Fila etiqueta="Sistema" valor={info.version} />
          </>
        ) : (
          <Text style={styles.noDisponible}>
            {Platform.OS === 'android'
              ? 'Cargando...'
              : 'Solo disponible en Android'}
          </Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Saludo desde Kotlin</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Tu nombre..."
          placeholderTextColor="#999"
        />
        <Pressable style={styles.boton} onPress={obtenerSaludo}>
          <Text style={styles.botonTxt}>Saludar desde Android</Text>
        </Pressable>
        {saludo ? <Text style={styles.saludo}>{saludo}</Text> : null}
      </View>

      <View style={styles.nota}>
        <Text style={styles.notaTxt}>
          Las funciones getModelo(), getFabricante(), getVersionAndroid() y saludar()
          están implementadas en Kotlin usando la Expo Modules API y se llaman
          directamente desde JavaScript.
        </Text>
      </View>
    </View>
  );
}

function Fila({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <View style={styles.fila}>
      <Text style={styles.etiqueta}>{etiqueta}:</Text>
      <Text style={styles.valor}>{valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B3A6B',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  card: {
    backgroundColor: '#f0f4ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B3A6B',
    marginBottom: 12,
  },
  fila: {
    flexDirection: 'row',
    marginBottom: 6,
    gap: 8,
  },
  etiqueta: { fontWeight: '600', color: '#444', width: 90 },
  valor: { flex: 1, color: '#222' },
  noDisponible: { color: '#999', fontStyle: 'italic' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  boton: {
    backgroundColor: '#1B3A6B',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonTxt: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  saludo: {
    marginTop: 14,
    fontSize: 15,
    color: '#1B3A6B',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 22,
  },
  nota: {
    borderLeftWidth: 3,
    borderLeftColor: '#1B3A6B',
    paddingLeft: 12,
    marginTop: 4,
  },
  notaTxt: { fontSize: 12, color: '#555', lineHeight: 18 },
});
