# Gestor de Tareas — TPO Desarrollo de Aplicaciones 1

Aplicación Android de gestión de tareas desarrollada como Trabajo Práctico Integrador para la materia **Desarrollo de Aplicaciones 1** de la UADE.

## ¿Qué hace?

Permite crear, editar y eliminar tareas en dos modos:

- **CRUD Backend:** las tareas se guardan en un servidor de internet y se pueden ver desde cualquier dispositivo.
- **CRUD Local:** las tareas se guardan directamente en el celular, sin necesidad de conexión a internet.

## Tecnologías utilizadas

- **Kotlin** — lenguaje de programación
- **Jetpack Compose** — interfaz gráfica
- **Room** — base de datos local
- **OkHttp** — comunicación con el servidor
- **MockAPI** — servidor de pruebas en la nube
- **Navigation Compose** — navegación entre pantallas

## Estructura del proyecto

```
app/src/main/java/com/example/myapplication/
├── MainActivity.kt     # Pantallas y lógica principal
├── TaskEntity.kt       # Modelo de tarea para la base de datos local
├── TaskDao.kt          # Operaciones sobre la base de datos local
└── AppDatabase.kt      # Configuración de la base de datos local

app/src/androidTest/java/com/example/myapplication/
├── TaskDaoTest.kt      # Tests de la base de datos
└── ParseResponseTest.kt # Tests del parseo de datos del servidor
```

## Cómo ejecutar

1. Abrir el proyecto en **Android Studio**
2. Iniciar un emulador desde **Device Manager**
3. Presionar el botón ▶ para compilar y ejecutar

## Cómo correr los tests

Con el emulador corriendo, click derecho sobre la carpeta `androidTest` → **Run 'All Tests'**

## Integrantes

| Nombre |
|--------|
| Birstok Valentín |
| Aguirre Juan Ignacio |
| Fiordalisi Faustino |
| Stinga Mateo |
| Vázquez Bautista |
| Martina Hackbartt |
