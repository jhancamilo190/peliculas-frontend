import { Link } from 'react-router-dom';

const modulos = [
  { to: '/generos', titulo: 'Género', icono: 'bi-tags', texto: 'Acción, drama, comedia y más.' },
  { to: '/directores', titulo: 'Director', icono: 'bi-person-video3', texto: 'Directores de películas y series.' },
  { to: '/productoras', titulo: 'Productora', icono: 'bi-building', texto: 'Estudios y casas productoras.' },
  { to: '/tipos', titulo: 'Tipo', icono: 'bi-collection-play', texto: 'Película, serie u otros formatos.' },
  { to: '/medias', titulo: 'Media', icono: 'bi-film', texto: 'Catálogo de películas y series.' },
];

export default function Home() {
  return (
    <div className="container py-4">
      <div className="hero p-5 mb-4">
        <h1 className="display-5 fw-bold">Gestión de Películas y Series</h1>
        <p className="lead mb-0">
          Aplicación web en React que consume la API REST de Node.js y MongoDB Atlas. Elige un módulo para
          crear, consultar, actualizar o eliminar registros.
        </p>
      </div>
      <div className="row g-3">
        {modulos.map((m) => (
          <div className="col-12 col-md-6 col-lg-4" key={m.to}>
            <Link to={m.to} className="text-decoration-none">
              <div className="card card-modulo h-100 shadow-sm">
                <div className="card-body text-center py-4">
                  <i className={`bi ${m.icono} display-4 text-primary`}></i>
                  <h4 className="mt-2 text-dark">{m.titulo}</h4>
                  <p className="text-muted mb-0">{m.texto}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
