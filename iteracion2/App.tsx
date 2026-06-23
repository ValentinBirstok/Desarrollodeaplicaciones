import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import TareasScreen from './screens/TareasScreen';
import AcercaDeScreen from './screens/AcercaDeScreen';

export type RootStackParamList = {
  Home: undefined;
  Tareas: undefined;
  AcercaDe: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
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
          name="AcercaDe"
          component={AcercaDeScreen}
          options={{ title: 'Acerca De' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
