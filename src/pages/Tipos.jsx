import CatalogoCrud from '../components/CatalogoCrud.jsx';

export default function Tipos() {
  return (
    <CatalogoCrud
      titulo="Tipo"
      ruta="/tipos"
      icono="bi-collection-play"
      campos={[
        { name: 'nombre', label: 'Nombre', required: true },
        { name: 'descripcion', label: 'Descripción', type: 'textarea' },
      ]}
      columnas={[
        { name: 'nombre', label: 'Nombre' },
        { name: 'descripcion', label: 'Descripción' },
      ]}
    />
  );
}
