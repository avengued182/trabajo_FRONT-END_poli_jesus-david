NEXO NOTICIAS — PROTOTIPO FUNCIONAL ENTREGA 2
================================================

REQUISITO PARA EJECUTAR
-----------------------
Este proyecto carga las noticias desde data/noticias.json.
Por eso debe abrirse desde un servidor local y no haciendo doble clic sobre index.html.

Opción recomendada en Visual Studio Code:
1. Abrir la carpeta nexo-noticias.
2. Instalar/usar Live Server.
3. Clic derecho sobre index.html > Open with Live Server.

PÁGINAS IMPLEMENTADAS
---------------------
- index.html
  Home de Nexo Noticias.

- pages/noticias.html
  Listado general de noticias, filtros por categoría, favoritos y Cargar más.

- pages/categorias.html
  Página de categorías. Permite elegir Educación, Tecnología, Turismo o Comercio
  y consultar las noticias de cada categoría.

- pages/detalle-noticia.html?id=1
  Detalle dinámico de una noticia, favoritos, compartir, noticias relacionadas y newsletter.

- pages/contacto.html
  Formulario de contacto con validación de campos y correo.

- pages/favoritos.html
  Lista personalizada de noticias favoritas guardadas en localStorage.

- pages/admin-noticias.html
  Gestión administrativa: búsqueda, filtros, orden, paginación, edición y eliminación.

- pages/crear-noticia.html
  Crear una noticia nueva.

- pages/editar-noticia.html?id=1
  Editar o eliminar una noticia existente.

ACCESO ADMINISTRATIVO
---------------------
La aplicación es un prototipo Front End sin Back End.

Para probar el Navbar administrativo desde el Home:
- Correo: admin@nexo.com
- Contraseña: cualquier texto no vacío

También se puede abrir directamente:
pages/admin-noticias.html

MINI CRUD
---------
La creación, edición y eliminación se guarda en localStorage.
El archivo data/noticias.json permanece como catálogo base.

Esto permite demostrar un CRUD funcional sin necesitar servidor ni base de datos.

Para volver al catálogo original, borrar los datos del sitio/localStorage del navegador.

FUNCIONALIDADES PRINCIPALES
---------------------------
- HTML, CSS y JavaScript.
- jQuery incluido localmente en assets/js/vendor/jquery.min.js.
- Noticias dinámicas desde JSON.
- Home con noticias destacadas.
- Listado general de noticias.
- Página de categorías.
- Detalle dinámico.
- Favoritos con localStorage.
- Sesión simulada con sessionStorage.
- Notificaciones.
- Formulario de contacto validado.
- Newsletter validado.
- Compartir noticia con Web Share API o copia de enlace.
- Mini CRUD administrativo.
- Diseño responsive.

DISEÑO
------
Las vistas conservan la identidad visual definida en los mockups de la Entrega 1:
azul marino, turquesa/cian, fondos claros, navbar y footer reutilizables, tarjetas,
formularios y distribución equivalente a las vistas aprobadas.
