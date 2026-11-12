import axios from 'axios';

// URL base de la API REST (EA1). Se puede cambiar con la variable VITE_API_URL.
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api`,
  headers: { 'Content-Type': 'application/json' },
});

// Extrae un mensaje legible de los errores que devuelve la API ({ error: "..." }).
export function mensajeError(err) {
  if (err.response) {
    const d = err.response.data;
    const base = d?.error || d?.message || `Error ${err.response.status}`;
    // Errores de validación: la API devuelve la lista en "detalles".
    return Array.isArray(d?.detalles) && d.detalles.length ? `${base}: ${d.detalles.join('. ')}` : base;
  }
  return 'No se pudo conectar con la API. Verifica que el servidor esté corriendo en el puerto 3000.';
}

// Devuelve el _id aunque la relación venga poblada (objeto) o como texto.
export const idDe = (valor) => (valor && typeof valor === 'object' ? valor._id : valor || '');

export default api;
