import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';

const mockNavigate = jest.fn();
const mockNavigation = { navigate: mockNavigate } as any;

beforeEach(() => jest.clearAllMocks());

describe('<HomeScreen />', () => {
  it('renderiza correctamente', () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    expect(getByText('Gestor de Tareas')).toBeTruthy();
  });

  it('muestra los tres botones del menú', () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    expect(getByText('Ver Tareas (CRUD)')).toBeTruthy();
    expect(getByText('Tareas Locales (SQLite)')).toBeTruthy();
    expect(getByText('Acerca De')).toBeTruthy();
  });

  it('navega a Tareas al presionar el botón CRUD', () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    fireEvent.press(getByText('Ver Tareas (CRUD)'));
    expect(mockNavigate).toHaveBeenCalledWith('Tareas');
  });

  it('navega a TareasLocal al presionar el botón SQLite', () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    fireEvent.press(getByText('Tareas Locales (SQLite)'));
    expect(mockNavigate).toHaveBeenCalledWith('TareasLocal');
  });

  it('navega a AcercaDe al presionar el botón correspondiente', () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    fireEvent.press(getByText('Acerca De'));
    expect(mockNavigate).toHaveBeenCalledWith('AcercaDe');
  });
});
