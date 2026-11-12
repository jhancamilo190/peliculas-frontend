# Películas y Series – Front End (ReactJs)

Aplicación web en **React** que consume la API REST de la actividad EA1 (Node.js, Express y MongoDB Atlas) para gestionar el catálogo de películas y series.

## Módulos

| Módulo     | Ruta en el front | Endpoint de la API |
|------------|------------------|--------------------|
| Género     | `/generos`       | `/api/generos`     |
| Director   | `/directores`    | `/api/directores`  |
| Productora | `/productoras`   | `/api/productoras` |
| Tipo       | `/tipos`         | `/api/tipos`       |
| Media      | `/medias`        | `/api/medias`      |

Cada pantalla permite **listar, crear, editar y eliminar** registros. En Media, género, director, productora y tipo se eligen desde listas desplegables cargadas desde la API.

## Tecnologías

React 18, Vite, React Router, Axios, SweetAlert2, Bootstrap 5 y Bootstrap Icons.

## Cómo ejecutarlo

1. Tener corriendo la API de la EA1 (`npm start` en el proyecto `Proyecto_peliculas`, puerto 3000).
2. Clonar este repositorio e instalar dependencias:
   ```bash
   npm install
   ```
3. (Opcional) copiar `.env.example` como `.env` si la API usa otra URL:
   ```
   VITE_API_URL=http://localhost:3000
   ```
4. Iniciar la aplicación:
   ```bash
   npm run dev
   ```
5. Abrir http://localhost:5173

## Estructura

```
src/
  api/client.js            Instancia de Axios y manejo de errores
  components/Navbar.jsx    Menú de navegación
  components/CatalogoCrud.jsx  Pantalla CRUD reutilizable (Género, Director, Productora, Tipo)
  pages/                   Una pantalla por módulo + Home
  App.jsx                  Rutas
  main.jsx                 Punto de entrada
```

## Orden recomendado de uso

Primero crear Género, Director, Productora y Tipo; después Media, que los referencia.
