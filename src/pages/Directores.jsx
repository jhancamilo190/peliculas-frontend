import CatalogoCrud from '../components/CatalogoCrud.jsx';

export default function Directores() {
  return (
    <CatalogoCrud
      titulo="Director"
      ruta="/directores"
      icono="bi-person-video3"
      campos={[
        { name: 'nombres', label: 'Nombres', required: true },
        { name: 'estado', label: 'Estado', type: 'select', options: ['Activo', 'Inactivo'], defecto: 'Activo', required: true },
      ]}
      columnas={[
        { name: 'nombres', label: 'Nombres' },
        { name: 'estado', label: 'Estado' },
      ]}
    />
  );
}
