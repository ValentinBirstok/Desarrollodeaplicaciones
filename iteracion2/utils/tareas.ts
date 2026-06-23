import { TareaLocal } from '../screens/tipos';

export function filtrarTareas(tareas: TareaLocal[], completada: boolean): TareaLocal[] {
  return tareas.filter(t => (completada ? t.completada === 1 : t.completada === 0));
}

export function formatearFecha(fecha: Date): string {
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const anio = fecha.getFullYear();
  return `${dia}/${mes}/${anio}`;
}
