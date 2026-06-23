# Gestor de Tareas — Iteración 2 + Presentación Final
**Materia:** Desarrollo de Aplicaciones 1 — UADE  
**Tecnología:** React Native + Expo (TypeScript) + Módulo Nativo Android (Kotlin)  
**Entrega iteración 2:** 26/6/2026 | **Presentación final:** 10/7, 17/7 o 24/7/2026

---

## Índice
1. [Cómo instalar y probar la app](#cómo-instalar-y-probar-la-app)
2. [Cómo correr los tests](#cómo-correr-los-tests)
3. [Estructura del proyecto](#estructura-del-proyecto)
4. [Pantallas y funcionalidades](#pantallas-y-funcionalidades)
5. [Conceptos de clase aplicados](#conceptos-de-clase-aplicados)
6. [Conexión HTTP con MockAPI](#conexión-http-con-mockapi)
7. [Base de datos local con SQLite](#base-de-datos-local-con-sqlite)
8. [Tests](#tests)
9. [Módulo Nativo Android (Presentación Final)](#módulo-nativo-android-presentación-final)
8. [Tests](#tests)

---

## Cómo instalar y probar la app

### Prerequisitos
- **Node.js v18 o superior** — verificar con `node --version`
- **Expo Go** instalado en el celular (App Store o Google Play — buscar "Expo Go")
- El celular y la computadora deben estar **en la misma red WiFi**

### Pasos para correr la app

```bash
# 1. Clonar el repositorio (o hacer pull si ya lo tenés)
git clone https://github.com/ValentinBirstok/Desarrollodeaplicaciones.git
cd Desarrollodeaplicaciones

# 2. Entrar a la carpeta de la iteración 2
cd iteracion2

# 3. Instalar dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npx expo start
```

Cuando aparezca el QR en la terminal:
- **iPhone:** abrí la cámara y apuntá al QR — te va a pedir abrir en Expo Go
- **Android:** abrí Expo Go → "Scan QR code" → apuntá al QR

La app se carga en segundos. Cualquier cambio en el código se refleja al instante (hot reload).

> **Importante:** Expo Go debe ser versión SDK 54. Si aparece error de versión incompatible, actualizá Expo Go desde la App Store / Play Store.

---

## Cómo correr los tests

```bash
# Desde la carpeta iteracion2
npm test
```

Deberías ver algo así:

```
PASS __tests__/utils.test.ts
PASS __tests__/home-screen.test.tsx
PASS __tests__/TareaItem.test.tsx

Test Suites: 3 passed, 3 total
Tests:       17 passed, 17 total
```

---

## Estructura del proyecto

```
iteracion2/
├── App.tsx                        ← Punto de entrada. Configura navegación y base de datos
├── app.json                       ← Configuración de la app (nombre, íconos, plugins)
│
├── screens/
│   ├── tipos.ts                   ← Interfaces TypeScript (Tarea, TareaLocal)
│   ├── HomeScreen.tsx             ← Menú principal con botones de navegación
│   ├── TareasScreen.tsx           ← CRUD contra MockAPI (HTTP)
│   ├── TareasLocalScreen.tsx      ← CRUD contra SQLite (base de datos local)
│   └── AcercaDeScreen.tsx         ← Pantalla con los integrantes del equipo
│
├── services/
│   └── tareasApi.ts               ← Capa de acceso a la API REST con axios
│
├── database/
│   └── initDB.ts                  ← Creación de la tabla local en SQLite
│
├── components/
│   └── TareaItem.tsx              ← Componente reutilizable para mostrar una tarea local
│
├── utils/
│   └── tareas.ts                  ← Funciones puras: filtrarTareas, formatearFecha
│
└── __tests__/
    ├── utils.test.ts              ← Tests de funciones puras (Jest)
    ├── home-screen.test.tsx       ← Tests del menú principal (RTL)
    └── TareaItem.test.tsx         ← Tests del componente TareaItem (RTL)
```

---

## Pantallas y funcionalidades

### HomeScreen (`screens/HomeScreen.tsx`)
Menú principal de la app. Tiene tres botones que navegan a las distintas pantallas.

**Conceptos usados:** Stack Navigator, `navigate()`, `NativeStackNavigationProp`, tipado de navegación con `RootStackParamList`.

---

### TareasScreen (`screens/TareasScreen.tsx`)
CRUD completo contra el backend (MockAPI). Permite:
- Ver todas las tareas (GET)
- Agregar una nueva tarea (POST)
- Editar una tarea existente (PUT) — modo edición inline
- Eliminar una tarea (DELETE) — actualización optimista (sin recargar)

**Manejo de estados de carga:**
```typescript
type Estado = 'cargando' | 'error' | 'listo';
```
Mientras carga muestra un `ActivityIndicator`. Si hay error, muestra botón "Reintentar".

**Conceptos usados (Clase 12):** axios, `useState`, `useEffect`, union types para estado de carga, actualización optimista con `.filter()`, `FlatList`, `ActivityIndicator`.

---

### TareasLocalScreen (`screens/TareasLocalScreen.tsx`)
CRUD completo contra la base de datos SQLite local. Funcionalidades:
- Ver todas las tareas guardadas localmente
- Agregar tarea nueva
- Editar tarea existente
- Eliminar tarea
- Marcar como completada / pendiente (con tachado visual)

Los datos **persisten** aunque la app se cierre: quedan guardados en el dispositivo.

**Conceptos usados (Clase 13):** `useSQLiteContext()`, `getAllAsync()`, `runAsync()`, SQL con parámetros (`?`), `SQLiteProvider` en App.tsx.

---

### AcercaDeScreen (`screens/AcercaDeScreen.tsx`)
Pantalla con los integrantes del equipo. Muestra nombre e iniciales de cada integrante con `ScrollView`.

**Integrantes:**
- Birstok Valentín
- Aguirre Juan Ignacio
- Fiordalisi Faustino
- Stinga Mateo
- Vázquez Bautista
- Hackbartt Martina

---

## Conceptos de clase aplicados

### Clase 10 — Introducción a React Native
- Proyecto creado con `npx create-expo-app --template blank-typescript`
- Componentes básicos: `View`, `Text`, `TextInput`, `Pressable`, `ScrollView`
- `StyleSheet.create()` para estilos (equivalente a XML en Android)
- JSX para describir la UI

### Clase 11 — Componentes y Navegación
- **React Navigation** con Stack Navigator (`@react-navigation/native-stack`)
- `NavigationContainer` en `App.tsx` envuelve todo
- Tipado de rutas con `RootStackParamList` (TypeScript)
- `useEffect` para ejecutar código al montar el componente (equivalente a `LaunchedEffect` en Compose)
- `useState` para estado local del componente
- `FlatList` para listas eficientes (equivalente a `LazyColumn`)

### Clase 12 — Conexión HTTP
- **axios** para llamadas HTTP (preferido sobre `fetch` — manejo de errores automático, parseo de JSON automático)
- Instancia de axios con `baseURL` configurada una sola vez en `services/tareasApi.ts`
- Patrón de servicio separado de la pantalla:

```typescript
// services/tareasApi.ts
const api = axios.create({ baseURL: 'https://...' });

export const tareasApi = {
  getAll: () => api.get<Tarea[]>('/tareas'),
  create: (task: string) => api.post<Tarea>('/tareas', { task }),
  update: (id: string, task: string) => api.put<Tarea>(`/tareas/${id}`, { task }),
  remove: (id: string) => api.delete(`/tareas/${id}`),
};
```

- Patrón de estado de carga con union type (exactamente como lo muestra la clase):
```typescript
type Estado = 'cargando' | 'error' | 'listo';
```

- Actualización optimista en DELETE (no recarga toda la lista, solo filtra):
```typescript
setTareas(prev => prev.filter(t => t.id !== id));
```

### Clase 13 — Base de Datos Local
- **expo-sqlite** como base de datos local (equivalente a Room en Android)
- `SQLiteProvider` envuelve toda la app en `App.tsx`:

```typescript
<SQLiteProvider databaseName="tareas.db" onInit={initDB}>
  <NavigationContainer>
    ...
  </NavigationContainer>
</SQLiteProvider>
```

- `initDB` crea la tabla si no existe (se llama automáticamente al arrancar):
```typescript
await db.execAsync(`
  CREATE TABLE IF NOT EXISTS tareas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL,
    completada INTEGER NOT NULL DEFAULT 0
  );
`);
```

- `useSQLiteContext()` para acceder a la base en cualquier pantalla:
```typescript
const db = useSQLiteContext();
const tareas = await db.getAllAsync<TareaLocal>('SELECT * FROM tareas ORDER BY id DESC');
await db.runAsync('INSERT INTO tareas (task) VALUES (?)', [texto]);
await db.runAsync('DELETE FROM tareas WHERE id = ?', [id]);
```

- `TareaLocal` tiene campo `completada: number` (0 o 1) porque SQLite no tiene tipo boolean

### Clase 14 — Tests con Jest y React Testing Library

**Dos herramientas que trabajan juntas:**
- **Jest** — runner de tests, equivalente a JUnit. Para funciones puras y lógica sin UI.
- **React Testing Library (RTL)** — para testear componentes renderizados como lo haría el usuario.

**Configuración** en `package.json`:
```json
"scripts": {
  "test": "jest"
},
"jest": {
  "preset": "jest-expo"
}
```

**Patrón AAA** (Arrange / Act / Assert) — igual que en JUnit:
```typescript
it('filtra las tareas completadas', () => {
  // Arrange
  const tareas = [{ id: 1, task: 'Tarea', completada: 1 }];
  // Act
  const resultado = filtrarTareas(tareas, true);
  // Assert
  expect(resultado).toHaveLength(1);
});
```

**Tests de componentes con RTL:**
```typescript
const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
expect(getByText('Gestor de Tareas')).toBeTruthy();
fireEvent.press(getByText('Ver Tareas (CRUD)'));
expect(mockNavigate).toHaveBeenCalledWith('Tareas');
```

---

## Conexión HTTP con MockAPI

**Endpoint base:** `https://671195294eca2acdb5f52a81.mockapi.io/tareas`

| Operación | Método | Ruta         |
|-----------|--------|--------------|
| Listar    | GET    | `/tareas`    |
| Crear     | POST   | `/tareas`    |
| Editar    | PUT    | `/tareas/:id`|
| Eliminar  | DELETE | `/tareas/:id`|

El formato JSON de cada tarea es:
```json
{ "id": "1", "task": "Comprar leche" }
```

---

## Base de datos local con SQLite

La base de datos se llama `tareas.db` y se guarda en el dispositivo. La tabla:

```sql
CREATE TABLE IF NOT EXISTS tareas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task TEXT NOT NULL,
  completada INTEGER NOT NULL DEFAULT 0
);
```

Los datos **no se pierden** al cerrar la app. Son independientes del backend.

---

## Tests

Se escribieron 17 tests en 3 archivos:

### `__tests__/utils.test.ts` — Jest puro
Testea funciones puras sin UI:
- `filtrarTareas()`: devuelve correctamente pendientes, completadas y lista vacía
- `formatearFecha()`: formatea fecha con ceros, año completo

### `__tests__/home-screen.test.tsx` — RTL
Testea el menú principal:
- Renderiza el título "Gestor de Tareas"
- Muestra los tres botones
- Al presionar cada botón navega a la pantalla correcta

### `__tests__/TareaItem.test.tsx` — RTL
Testea el componente `TareaItem`:
- Muestra el texto de la tarea
- Muestra `[ ]` cuando está pendiente y `[X]` cuando está completada
- Al presionar el check llama `onCompletar` con la tarea correcta
- Al presionar X llama `onEliminar` con el id correcto
- Al presionar Editar llama `onEditar` con la tarea correcta

Para correr los tests: `npm test`

---

## Módulo Nativo Android (Presentación Final)

### ¿Qué es un Native Module?

Un **Native Module** es un componente escrito en código nativo (Kotlin/Java en Android, Swift/Obj-C en iOS) que se expone a JavaScript a través de un puente. Permite acceder a APIs del sistema operativo que React Native no cubre de forma nativa.

**Equivalencia conceptual:**
| Concepto | Android/Kotlin | React Native |
|----------|----------------|--------------|
| Módulo nativo | Clase Kotlin | `requireNativeModule()` |
| Función expuesta | `Function("nombre")` | Método llamable desde JS |
| Retorno | Cualquier tipo primitivo | String, Number, Boolean, etc. |

### Cómo probar el módulo nativo

El módulo nativo **requiere compilar la app nativa**. No funciona con Expo Go (que es un entorno precompilado). Para probarlo:

```bash
# Requisito: tener Android Studio y un emulador configurado
cd iteracion2
npx expo run:android
```

Esto compila la app completa con el código Kotlin y la instala en el emulador o dispositivo conectado. Después aparece el botón "Módulo Nativo Android" en el menú.

> Si no tienen Android Studio configurado, pueden mostrar el código Kotlin durante la presentación y explicar el concepto del bridge.

### Archivos involucrados

| Archivo | Descripción |
|---------|-------------|
| `modules/dispositivo/android/src/main/java/expo/modules/dispositivo/DispositivoModule.kt` | Código Kotlin — implementación nativa |
| `modules/dispositivo/src/DispositivoModule.ts` | Interfaz TypeScript — cómo se ve desde JS |
| `screens/DispositivoScreen.tsx` | Pantalla que consume el módulo |

### El código Kotlin (`DispositivoModule.kt`)

```kotlin
class DispositivoModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("Dispositivo")

    Function("getModelo") {
      Build.MODEL                           // Samsung Galaxy S21, Pixel 7, etc.
    }

    Function("getFabricante") {
      Build.MANUFACTURER                    // Samsung, Google, etc.
    }

    Function("getVersionAndroid") {
      "Android ${Build.VERSION.RELEASE} (API ${Build.VERSION.SDK_INT})"
    }

    Function("saludar") { nombre: String ->
      "¡Hola, $nombre! Este mensaje viene de código Kotlin nativo en Android."
    }
  }
}
```

Cada `Function` define un método que puede ser llamado desde JavaScript.

### Cómo se usa desde JavaScript

```typescript
import DispositivoModule from '../modules/dispositivo/src/DispositivoModule';

// Llamadas síncronas al código Kotlin
const modelo = DispositivoModule.getModelo();       // "Pixel 7"
const version = DispositivoModule.getVersionAndroid(); // "Android 14 (API 34)"
const saludo = DispositivoModule.saludar("Martina"); // "¡Hola, Martina! ..."
```

### Tecnología usada: Expo Modules API

Se usó la **Expo Modules API** (en lugar del puente clásico de React Native) porque:
- Es compatible con la nueva arquitectura de React Native (usada en RN 0.81+)
- La definición del módulo es más limpia y declarativa
- Es el estándar recomendado para proyectos Expo desde SDK 50+

El módulo se registra automáticamente mediante **autolinking** de Expo — no hace falta modificar `MainApplication.kt` manualmente.
