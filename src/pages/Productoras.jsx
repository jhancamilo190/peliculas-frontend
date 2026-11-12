import CatalogoCrud from '../components/CatalogoCrud.jsx';

export default function Productoras() {
  return (
    <CatalogoCrud
      titulo="Productora"
      ruta="/productoras"
      icono="bi-building"
      campos={[
        { name: 'nombre', label: 'Nombre', required: true },
        { name: 'estado', label: 'Estado', type: 'select', options: ['Activo', 'Inactivo'], defecto: 'Activo', required: true },
        { name: 'slogan', label: 'Slogan' },
        { name: 'descripcion', label: 'Descripción', type: 'textarea' },
      ]}
      columnas={[
        { name: 'nombre', label: 'Nombre' },
        { name: 'estado', label: 'Estado' },
        { name: 'slogan', label: 'Slogan' },
        { name: 'descripcion', label: 'Descripción' },
      ]}
    />
  );
}
