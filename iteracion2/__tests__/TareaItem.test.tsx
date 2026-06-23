import { render, fireEvent } from '@testing-library/react-native';
import TareaItem from '../components/TareaItem';
import { TareaLocal } from '../screens/tipos';

const tarea: TareaLocal = { id: 1, task: 'Estudiar', completada: 0 };
const mockCompletar = jest.fn();
const mockEliminar = jest.fn();
const mockEditar = jest.fn();

beforeEach(() => jest.clearAllMocks());

function renderItem(t: TareaLocal = tarea) {
  return render(
    <TareaItem
      tarea={t}
      onCompletar={mockCompletar}
      onEliminar={mockEliminar}
      onEditar={mockEditar}
    />
  );
}

describe('<TareaItem />', () => {
  it('muestra el texto de la tarea', () => {
    const { getByText } = renderItem();
    expect(getByText('Estudiar')).toBeTruthy();
  });

  it('muestra [ ] cuando la tarea no está completada', () => {
    const { getByText } = renderItem();
    expect(getByText('[ ]')).toBeTruthy();
  });

  it('muestra [X] cuando la tarea está completada', () => {
    const { getByText } = renderItem({ ...tarea, completada: 1 });
    expect(getByText('[X]')).toBeTruthy();
  });

  it('llama onCompletar con la tarea al presionar el check', () => {
    const { getByText } = renderItem();
    fireEvent.press(getByText('[ ]'));
    expect(mockCompletar).toHaveBeenCalledWith(tarea);
  });

  it('llama onEliminar con el id al presionar X', () => {
    const { getByText } = renderItem();
    fireEvent.press(getByText('X'));
    expect(mockEliminar).toHaveBeenCalledWith(1);
  });

  it('llama onEditar con la tarea al presionar Editar', () => {
    const { getByText } = renderItem();
    fireEvent.press(getByText('Editar'));
    expect(mockEditar).toHaveBeenCalledWith(tarea);
  });
});
