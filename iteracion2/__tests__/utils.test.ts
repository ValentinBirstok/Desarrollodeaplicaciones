import { filtrarTareas, formatearFecha } from '../utils/tareas';
import { TareaLocal } from '../screens/tipos';

const tareas: TareaLocal[] = [
  { id: 1, task: 'Estudiar React', completada: 0 },
  { id: 2, task: 'Hacer ejercicio', completada: 1 },
  { id: 3, task: 'Leer libro', completada: 0 },
  { id: 4, task: 'Llamar médico', completada: 1 },
];

describe('filtrarTareas', () => {
  it('devuelve solo las tareas pendientes', () => {
    const resultado = filtrarTareas(tareas, false);
    expect(resultado).toHaveLength(2);
    expect(resultado).toContainEqual({ id: 1, task: 'Estudiar React', completada: 0 });
  });

  it('devuelve solo las tareas completadas', () => {
    const resultado = filtrarTareas(tareas, true);
    expect(resultado).toHaveLength(2);
    expect(resultado).toContainEqual({ id: 2, task: 'Hacer ejercicio', completada: 1 });
  });

  it('devuelve lista vacía si no hay coincidencias', () => {
    const resultado = filtrarTareas([], false);
    expect(resultado).toHaveLength(0);
  });
});

describe('formatearFecha', () => {
  it('formatea una fecha correctamente', () => {
    const fecha = new Date(2026, 5, 23); // 23/06/2026
    expect(formatearFecha(fecha)).toBe('23/06/2026');
  });

  it('rellena con ceros días y meses de un dígito', () => {
    const fecha = new Date(2026, 0, 5); // 05/01/2026
    expect(formatearFecha(fecha)).toBe('05/01/2026');
  });

  it('incluye el año completo', () => {
    const fecha = new Date(2026, 11, 31);
    expect(formatearFecha(fecha)).toContain('2026');
  });
});
