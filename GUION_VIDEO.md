# Guion del video (3 a 5 minutos)

**Antes de grabar:** API corriendo (`npm start`), front corriendo (`npm run dev`), navegador en http://localhost:5173. Graba en un lugar sin ruido y con buena resolución.

## 0:00 – 0:20 Presentación
"Hola, mi nombre es Jhan Moreno Delgado. Esta es la Evidencia de Aprendizaje 2 del Proyecto Integrado II: un front end en ReactJs que se comunica con la API REST que construí en la actividad 1." (Si fue en grupo, nombra aquí a tus compañeros.)

## 0:20 – 0:50 Arquitectura
- Mostrar el repositorio en GitHub y la estructura de `src/`.
- Mencionar: React con Vite, React Router para la navegación, Axios para consumir la API, SweetAlert2 para los mensajes y Bootstrap para el diseño.
- Mostrar `api/client.js` (URL base http://localhost:3000).

## 0:50 – 1:20 Inicio y menú
- Mostrar la página de inicio con las cinco tarjetas y el menú superior.

## 1:20 – 2:00 Género
- Clic en «Nuevo», crear el género "Acción" → mensaje de éxito.
- Intentar crearlo otra vez → SweetAlert muestra el error 409 de duplicado.
- Editar su descripción → mensaje de actualización.

## 2:00 – 2:45 Director, Productora y Tipo
- Crear "Christopher Nolan", "Warner Bros" y "Película" (uno por pantalla).
- Editar uno de ellos para mostrar la actualización.

## 2:45 – 3:45 Media
- Abrir Media, clic en «Nueva».
- Mostrar que género, director, productora y tipo aparecen en listas desplegables cargadas desde la API.
- Crear "El caballero de la noche" (serial MED-001, año 2008) y mostrar la tabla con los nombres de las relaciones.
- Editar la media y guardar.

## 3:45 – 4:15 Eliminar y conclusión
- Mostrar la confirmación de eliminar (puedes cancelar).
- Cierre: "La aplicación permite crear y actualizar los cinco módulos y se comunica correctamente con la API. Gracias."

**Subir a YouTube** (puede ser "No listado") y pegar el enlace en la entrega.
