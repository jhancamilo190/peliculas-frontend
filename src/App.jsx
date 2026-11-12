import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Generos from './pages/Generos.jsx';
import Directores from './pages/Directores.jsx';
import Productoras from './pages/Productoras.jsx';
import Tipos from './pages/Tipos.jsx';
import Medias from './pages/Medias.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generos" element={<Generos />} />
        <Route path="/directores" element={<Directores />} />
        <Route path="/productoras" element={<Productoras />} />
        <Route path="/tipos" element={<Tipos />} />
        <Route path="/medias" element={<Medias />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
