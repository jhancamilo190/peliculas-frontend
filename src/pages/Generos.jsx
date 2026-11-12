import CatalogoCrud from '../components/CatalogoCrud.jsx';

export default function Generos() {
  return (
    <CatalogoCrud
      titulo="Género"
      ruta="/generos"
      icono="bi-tags"
      campos={[
        { name: 'nombre', label: 'Nombre', required: true },
        { name: 'estado', label: 'Estado', type: 'select', options: ['Activo', 'Inactivo'], defecto: 'Activo', required: true },
        { name: 'descripcion', label: 'Descripción', type: 'textarea' },
      ]}
      columnas={[
        { name: 'nombre', label: 'Nombre' },
        { name: 'estado', label: 'Estado' },
        { name: 'descripcion', label: 'Descripción' },
      ]}
    />
  );
}
