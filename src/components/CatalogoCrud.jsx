import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import api, { mensajeError } from '../api/client.js';

/**
 * Pantalla CRUD reutilizable para los catálogos (Género, Director, Productora, Tipo).
 *
 * Props:
 *  - titulo:   nombre del módulo (ej. "Género")
 *  - ruta:     endpoint de la API (ej. "/generos")
 *  - icono:    clase de bootstrap-icons
 *  - campos:   [{ name, label, type, required, options }]
 *  - columnas: [{ name, label }] columnas visibles en la tabla
 */
export default function CatalogoCrud({ titulo, ruta, icono, campos, columnas }) {
  const vacio = Object.fromEntries(campos.map((c) => [c.name, c.defecto ?? '']));

  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [form, setForm] = useState(vacio);
  const [editandoId, setEditandoId] = useState(null);
  const [abierto, setAbierto] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const cargar = async () => {
    setCargando(true);
    try {
      const { data } = await api.get(ruta);
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      Swal.fire('Error', mensajeError(err), 'error');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ruta]);

  const abrirNuevo = () => {
    setForm(vacio);
    setEditandoId(null);
    setAbierto(true);
  };

  const abrirEditar = (item) => {
    const valores = {};
    campos.forEach((c) => {
      valores[c.name] = item[c.name] ?? '';
    });
    setForm(valores);
    setEditandoId(item._id);
    setAbierto(true);
  };

  const cerrar = () => setAbierto(false);

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const guardar = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      if (editandoId) {
        await api.put(`${ruta}/${editandoId}`, form);
        Swal.fire({ icon: 'success', title: `${titulo} actualizado`, timer: 1500, showConfirmButton: false });
      } else {
        await api.post(ruta, form);
        Swal.fire({ icon: 'success', title: `${titulo} creado`, timer: 1500, showConfirmButton: false });
      }
      cerrar();
      cargar();
    } catch (err) {
      Swal.fire('No se pudo guardar', mensajeError(err), 'error');
    } finally {
      setGuardando(false);
    }
  };

  const eliminar = async (item) => {
    const r = await Swal.fire({
      title: '¿Eliminar registro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
    if (!r.isConfirmed) return;
    try {
      await api.delete(`${ruta}/${item._id}`);
      Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1200, showConfirmButton: false });
      cargar();
    } catch (err) {
      Swal.fire('No se pudo eliminar', mensajeError(err), 'error');
    }
  };

  const formatear = (item, col) => {
    const v = item[col.name];
    if (col.name === 'estado') {
      return <span className={`badge ${v === 'Activo' ? 'text-bg-success' : 'text-bg-secondary'}`}>{v}</span>;
    }
    return v || <span className="text-muted">—</span>;
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">
          <i className={`bi ${icono} me-2`}></i>
          {titulo}
        </h2>
        <button className="btn btn-primary" onClick={abrirNuevo}>
          <i className="bi bi-plus-lg me-1"></i>Nuevo
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                {columnas.map((c) => (
                  <th key={c.name}>{c.label}</th>
                ))}
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargando && (
                <tr>
                  <td colSpan={columnas.length + 1} className="text-center py-4">
                    <div className="spinner-border spinner-border-sm me-2"></div>Cargando...
                  </td>
                </tr>
              )}
              {!cargando && items.length === 0 && (
                <tr>
                  <td colSpan={columnas.length + 1} className="text-center text-muted py-4">
                    No hay registros. Crea el primero con el botón «Nuevo».
                  </td>
                </tr>
              )}
              {items.map((item) => (
                <tr key={item._id}>
                  {columnas.map((c) => (
                    <td key={c.name}>{formatear(item, c)}</td>
                  ))}
                  <td className="text-end text-nowrap">
                    <button className="btn btn-sm btn-outline-primary me-1" onClick={() => abrirEditar(item)}>
                      <i className="bi bi-pencil-square"></i> Editar
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(item)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {abierto && (
        <div className="modal-fondo" onClick={cerrar}>
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <form className="modal-content" onSubmit={guardar}>
              <div className="modal-header">
                <h5 className="modal-title">
                  {editandoId ? `Editar ${titulo}` : `Nuevo ${titulo}`}
                </h5>
                <button type="button" className="btn-close" onClick={cerrar}></button>
              </div>
              <div className="modal-body">
                {campos.map((c) => (
                  <div className="mb-3" key={c.name}>
                    <label className="form-label">
                      {c.label}
                      {c.required && <span className="text-danger"> *</span>}
                    </label>
                    {c.type === 'select' ? (
                      <select
                        className="form-select"
                        name={c.name}
                        value={form[c.name]}
                        onChange={cambiar}
                        required={c.required}
                      >
                        {c.options.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    ) : c.type === 'textarea' ? (
                      <textarea
                        className="form-control"
                        rows="3"
                        name={c.name}
                        value={form[c.name]}
                        onChange={cambiar}
                        required={c.required}
                      />
                    ) : (
                      <input
                        className="form-control"
                        type="text"
                        name={c.name}
                        value={form[c.name]}
                        onChange={cambiar}
                        required={c.required}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={cerrar}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={guardando}>
                  {guardando ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
