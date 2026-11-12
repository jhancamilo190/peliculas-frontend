import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import api, { mensajeError, idDe } from '../api/client.js';

const vacio = {
  serial: '',
  titulo: '',
  sinopsis: '',
  url: '',
  imagen: '',
  anioEstreno: '',
  genero: '',
  director: '',
  productora: '',
  tipo: '',
};

export default function Medias() {
  const [medias, setMedias] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [form, setForm] = useState(vacio);
  const [editandoId, setEditandoId] = useState(null);
  const [abierto, setAbierto] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const cargar = async () => {
    setCargando(true);
    try {
      const [m, g, d, p, t] = await Promise.all([
        api.get('/medias'),
        api.get('/generos'),
        api.get('/directores'),
        api.get('/productoras'),
        api.get('/tipos'),
      ]);
      setMedias(m.data);
      setGeneros(g.data);
      setDirectores(d.data);
      setProductoras(p.data);
      setTipos(t.data);
    } catch (err) {
      Swal.fire('Error', mensajeError(err), 'error');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const abrirNuevo = () => {
    setForm(vacio);
    setEditandoId(null);
    setAbierto(true);
  };

  const abrirEditar = (m) => {
    setForm({
      serial: m.serial ?? '',
      titulo: m.titulo ?? '',
      sinopsis: m.sinopsis ?? '',
      url: m.url ?? '',
      imagen: m.imagen ?? '',
      anioEstreno: m.anioEstreno ?? '',
      genero: idDe(m.genero),
      director: idDe(m.director),
      productora: idDe(m.productora),
      tipo: idDe(m.tipo),
    });
    setEditandoId(m._id);
    setAbierto(true);
  };

  const cerrar = () => setAbierto(false);
  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const guardar = async (e) => {
    e.preventDefault();
    setGuardando(true);
    const cuerpo = { ...form, anioEstreno: Number(form.anioEstreno) };
    try {
      if (editandoId) {
        await api.put(`/medias/${editandoId}`, cuerpo);
        Swal.fire({ icon: 'success', title: 'Media actualizada', timer: 1500, showConfirmButton: false });
      } else {
        await api.post('/medias', cuerpo);
        Swal.fire({ icon: 'success', title: 'Media creada', timer: 1500, showConfirmButton: false });
      }
      cerrar();
      cargar();
    } catch (err) {
      Swal.fire('No se pudo guardar', mensajeError(err), 'error');
    } finally {
      setGuardando(false);
    }
  };

  const eliminar = async (m) => {
    const r = await Swal.fire({
      title: `¿Eliminar «${m.titulo}»?`,
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
    if (!r.isConfirmed) return;
    try {
      await api.delete(`/medias/${m._id}`);
      Swal.fire({ icon: 'success', title: 'Eliminada', timer: 1200, showConfirmButton: false });
      cargar();
    } catch (err) {
      Swal.fire('No se pudo eliminar', mensajeError(err), 'error');
    }
  };

  const nombreDe = (valor, lista, campo) => {
    if (valor && typeof valor === 'object') return valor[campo];
    return lista.find((x) => x._id === valor)?.[campo] || '—';
  };

  const select = (name, label, lista, campo) => (
    <div className="col-md-6">
      <label className="form-label">
        {label} <span className="text-danger">*</span>
      </label>
      <select className="form-select" name={name} value={form[name]} onChange={cambiar} required>
        <option value="">Selecciona...</option>
        {/* La API solo acepta géneros, directores y productoras en estado Activo */}
        {lista
          .filter((x) => x.estado !== 'Inactivo' || x._id === form[name])
          .map((x) => (
          <option key={x._id} value={x._id}>
            {x[campo]}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">
          <i className="bi bi-film me-2"></i>Media (Películas y Series)
        </h2>
        <button className="btn btn-primary" onClick={abrirNuevo}>
          <i className="bi bi-plus-lg me-1"></i>Nueva
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th></th>
                <th>Serial</th>
                <th>Título</th>
                <th>Año</th>
                <th>Género</th>
                <th>Director</th>
                <th>Productora</th>
                <th>Tipo</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargando && (
                <tr>
                  <td colSpan="9" className="text-center py-4">
                    <div className="spinner-border spinner-border-sm me-2"></div>Cargando...
                  </td>
                </tr>
              )}
              {!cargando && medias.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center text-muted py-4">
                    No hay registros. Crea el primero con el botón «Nueva».
                  </td>
                </tr>
              )}
              {medias.map((m) => (
                <tr key={m._id}>
                  <td>
                    {m.imagen ? (
                      <img className="poster" src={m.imagen} alt={m.titulo} onError={(e) => (e.currentTarget.style.visibility = 'hidden')} />
                    ) : (
                      <div className="poster"></div>
                    )}
                  </td>
                  <td>{m.serial}</td>
                  <td>
                    <strong>{m.titulo}</strong>
                    {m.url && (
                      <div>
                        <a href={m.url} target="_blank" rel="noreferrer" className="small">
                          Ver enlace
                        </a>
                      </div>
                    )}
                  </td>
                  <td>{m.anioEstreno}</td>
                  <td>{nombreDe(m.genero, generos, 'nombre')}</td>
                  <td>{nombreDe(m.director, directores, 'nombres')}</td>
                  <td>{nombreDe(m.productora, productoras, 'nombre')}</td>
                  <td>
                    <span className="badge text-bg-info">{nombreDe(m.tipo, tipos, 'nombre')}</span>
                  </td>
                  <td className="text-end text-nowrap">
                    <button className="btn btn-sm btn-outline-primary me-1" onClick={() => abrirEditar(m)}>
                      <i className="bi bi-pencil-square"></i> Editar
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(m)}>
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
          <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
            <form className="modal-content" onSubmit={guardar}>
              <div className="modal-header">
                <h5 className="modal-title">{editandoId ? 'Editar Media' : 'Nueva Media'}</h5>
                <button type="button" className="btn-close" onClick={cerrar}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">
                      Serial <span className="text-danger">*</span>
                    </label>
                    <input className="form-control" name="serial" value={form.serial} onChange={cambiar} required />
                  </div>
                  <div className="col-md-5">
                    <label className="form-label">
                      Título <span className="text-danger">*</span>
                    </label>
                    <input className="form-control" name="titulo" value={form.titulo} onChange={cambiar} required />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">
                      Año de estreno <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      min="1888"
                      max="2100"
                      name="anioEstreno"
                      value={form.anioEstreno}
                      onChange={cambiar}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Sinopsis</label>
                    <textarea className="form-control" rows="3" name="sinopsis" value={form.sinopsis} onChange={cambiar} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      URL <span className="text-danger">*</span>
                    </label>
                    <input className="form-control" name="url" value={form.url} onChange={cambiar} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Imagen (URL de la portada)</label>
                    <input className="form-control" name="imagen" value={form.imagen} onChange={cambiar} />
                  </div>
                  {select('genero', 'Género', generos, 'nombre')}
                  {select('director', 'Director', directores, 'nombres')}
                  {select('productora', 'Productora', productoras, 'nombre')}
                  {select('tipo', 'Tipo', tipos, 'nombre')}
                </div>
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
