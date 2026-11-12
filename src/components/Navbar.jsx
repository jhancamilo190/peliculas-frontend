import { NavLink, Link } from 'react-router-dom';

const enlaces = [
  { to: '/generos', texto: 'Género' },
  { to: '/directores', texto: 'Director' },
  { to: '/productoras', texto: 'Productora' },
  { to: '/tipos', texto: 'Tipo' },
  { to: '/medias', texto: 'Media' },
];

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-film me-2"></i>Películas y Series
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
          aria-controls="menu"
          aria-expanded="false"
          aria-label="Menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto">
            {enlaces.map((e) => (
              <li className="nav-item" key={e.to}>
                <NavLink className="nav-link" to={e.to}>
                  {e.texto}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
