import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SQLiteProvider } from 'expo-sqlite';
import HomeScreen from './screens/HomeScreen';
import TareasScreen from './screens/TareasScreen';
import TareasLocalScreen from './screens/TareasLocalScreen';
import AcercaDeScreen from './screens/AcercaDeScreen';
import { initDB } from './database/initDB';

export type RootStackParamList = {
  Home: undefined;
  Tareas: undefined;
  TareasLocal: undefined;
  AcercaDe: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SQLiteProvider databaseName="tareas.db" onInit={initDB}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: '#1B3A6B' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Gestor de Tareas' }}
          />
          <Stack.Screen
            name="Tareas"
            component={TareasScreen}
            options={{ title: 'Mis Tareas' }}
          />
          <Stack.Screen
            name="TareasLocal"
            component={TareasLocalScreen}
            options={{ title: 'Tareas Locales (SQLite)' }}
          />
          <Stack.Screen
            name="AcercaDe"
            component={AcercaDeScreen}
            options={{ title: 'Acerca De' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}
