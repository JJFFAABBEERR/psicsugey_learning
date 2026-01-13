<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1SDgHtHLJT-_NyGEmY8TYVlsO3u5Bzcwt

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Aquí residen las piezas pequeñas y modulares de la interfaz que se usan en múltiples lugares.

Navbar.tsx: La barra de navegación superior. Controla el acceso a las rutas y muestra el estado del usuario (si está logueado o no).
CourseCard.tsx: La tarjeta visual que representa un curso. Se usa tanto en la página de inicio como en el catálogo y el dashboard.
PaymentModal.tsx: El módulo de pago que acabamos de implementar. Es un componente "flotante" que maneja la lógica de transacción simulada. 2. Carpeta pages/ (Vistas de Ruta)
Cada archivo aquí representa una "pantalla" completa de la aplicación.
Home.tsx: La "Landing Page" principal. Su objetivo es el marketing y atraer nuevos estudiantes.
Explore.tsx: El catálogo completo donde los usuarios pueden filtrar y buscar cursos.
ExploreDetail.tsx: La ficha técnica de un curso antes de comprarlo (temario, precio, beneficios).
Login.tsx: Pantalla de acceso. Maneja la creación del perfil de usuario en la sesión actual.
Dashboard.tsx: El panel de control del estudiante. Muestra sus cursos inscritos y su progreso general.
CourseDetail.tsx: El aula virtual. Aquí es donde ocurre el aprendizaje, con el reproductor de video y las funciones de IA. 3. Carpeta services/ (Lógica de Negocio y APIs)
Aquí se separa la lógica que se comunica con el mundo exterior.
geminiService.ts: Es el "cerebro" de la inteligencia artificial. Contiene la lógica para conectarse con la API de Google Gemini y generar los resúmenes automáticos de las lecciones. 4. Archivos en la Raíz (Configuración y Datos)
App.tsx: Es el componente raíz. Aquí se define el Router (navegación) y el Estado Global (quién es el usuario y qué progreso lleva).
types.ts: El archivo de definiciones de TypeScript. Define cómo luce un "Curso", un "Usuario" o una "Lección". Esto evita errores de programación.
constants.tsx: Contiene los datos de ejemplo (Mock Data). Es donde están escritos los títulos y descripciones de los cursos actuales.
index.html e index.tsx: Los puntos de entrada técnicos. El HTML carga las fuentes y estilos, mientras que el index.tsx "monta" la aplicación de React en el navegador.
Resumen de Flujo:
Si quieres cambiar un color del menú, vas a components/. Si quieres agregar una nueva sección a la pantalla de inicio, vas a pages/Home.tsx. Si quieres cambiar los nombres de los cursos, vas a constants.tsx.
