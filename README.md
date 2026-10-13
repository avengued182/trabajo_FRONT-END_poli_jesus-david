# Nexo Noticias

Proyecto académico desarrollado para la asignatura **Front End** del programa de Ingeniería de Software.

Nexo Noticias es una aplicación web de noticias que reúne diferentes funcionalidades de navegación, consulta de contenido, favoritos, autenticación simulada, notificaciones, formularios, administración de noticias e integración de un módulo desarrollado con Angular.

## Estructura del repositorio

El repositorio contiene dos carpetas principales:

```text
trabajo\_FRONT-END\_poli\_jesus-david/
│
├── nexo-noticias/
│   └── Aplicación principal final
│
└── nexo-promo-angular/
    └── Código fuente del módulo desarrollado con Angular
```

### `nexo-noticias`

Contiene la aplicación final integrada y funcional.

Entre sus principales elementos se encuentran:

* Página de inicio.
* Navegación principal.
* Listado y detalle de noticias.
* Categorías.
* Favoritos.
* Inicio de sesión y registro simulados.
* Notificaciones.
* Formulario de contacto.
* Gestión de noticias para administrador.
* Newsletter.
* Integración del módulo promocional desarrollado con Angular.

La versión compilada del módulo Angular utilizada por la aplicación principal se encuentra en:

```text
nexo-noticias/assets/angular-promo/
```

### `nexo-promo-angular`

Contiene el **código fuente Angular** utilizado para desarrollar el módulo promocional integrado posteriormente en la aplicación principal.

La implementación principal se encuentra en:

```text
nexo-promo-angular/src/app/promo/
```

Dentro de esta carpeta se encuentran:

```text
promo.ts
promo.html
promo.css
promo.spec.ts
```

## Evidencia de implementación de Angular

La implementación de Angular se realizó como un módulo independiente que posteriormente fue compilado e integrado en la aplicación principal.

En el componente `Promo` se evidencian conceptos trabajados durante el curso:

### Componente Angular

El módulo promocional se desarrolló mediante un componente Angular independiente.

### Interpolación

Se utiliza interpolación para mostrar datos definidos en TypeScript dentro de la plantilla HTML:

```html
{{ titulo }}
{{ descripcion }}
{{ botonTexto }}
```

### Property Binding

Se utiliza `Property Binding` para asignar dinámicamente propiedades del componente:

```html
<img
    \[src]="imagen"
    \[alt]="titulo"
>
```

### Event Binding

Se utiliza `Event Binding` para responder a las acciones del usuario:

```html
<button
    type="button"
    (click)="mostrarInformacion()"
>
    {{ botonTexto }}
</button>
```

También se implementó un evento para cerrar el contenido promocional:

```html
(click)="cerrarPromocion()"
```

### Directiva `\*ngIf`

Se utiliza `\*ngIf` para controlar dinámicamente la visualización de elementos:

```html
<section \*ngIf="visible">
```

y para mostrar el mensaje únicamente cuando existe contenido:

```html
<p \*ngIf="mensaje">
    {{ mensaje }}
</p>
```

## Integración de Angular con la aplicación principal

La aplicación Nexo Noticias ya se encontraba desarrollada principalmente con HTML, CSS, JavaScript y jQuery.

Por este motivo, en lugar de realizar una migración completa del proyecto a Angular, se implementó una **integración incremental**.

El proceso realizado fue:

```text
Desarrollo del módulo Angular
        ↓
Componente Promo
        ↓
Compilación con Angular CLI
        ↓
Archivos compilados
        ↓
nexo-noticias/assets/angular-promo/
        ↓
Integración dentro del Home
```

El módulo Angular se carga dentro de la aplicación principal mediante:

```html
<app-root></app-root>
```

y su archivo JavaScript compilado:

```html
<script
    type="module"
    src="assets/angular-promo/main.js"
></script>
```

Esta estrategia permitió incorporar Angular sin reconstruir las funcionalidades que ya habían sido desarrolladas y probadas en la aplicación principal.

## Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript
* JSON
* jQuery
* Angular
* TypeScript
* Node.js
* npm
* Angular CLI
* LocalStorage
* SessionStorage
* Git
* GitHub

## Ejecución de la aplicación principal

La aplicación principal se encuentra en:

```text
nexo-noticias/
```

Puede ejecutarse utilizando un servidor local como XAMPP.

Ejemplo de ubicación:

```text
D:\\xampp\\htdocs\\nexo-noticias
```

Luego puede abrirse desde el navegador mediante una dirección similar a:

```text
http://localhost/nexo-noticias/
```

## Ejecución del código fuente Angular

Para ejecutar el proyecto Angular de forma independiente:

1. Abrir una terminal dentro de:

```text
nexo-promo-angular
```

2. Instalar las dependencias:

```bash
npm install
```

3. Ejecutar el servidor de desarrollo:

```bash
ng serve
```

4. Abrir:

```text
http://localhost:4200/
```

> La carpeta `node\_modules` no se incluye en el repositorio porque las dependencias pueden reconstruirse mediante `npm install`.

## Repositorio

Repositorio oficial del proyecto:

https://github.com/avengued182/trabajo\_FRONT-END\_poli\_jesus-david

## Despliegue

La URL pública de la aplicación será agregada cuando finalice el proceso de despliegue.

```text
Pendiente de despliegue
```

## Estado del proyecto

Actualmente se encuentran completados:

* Aplicación principal.
* Funcionalidades dinámicas.
* Integración del módulo Angular.
* Código fuente Angular.
* Control de versiones con Git.
* Repositorio en GitHub.

Pendiente:

* Despliegue público.
* Documentación final.
* Video de presentación.

\---

**Nexo Noticias — Proyecto académico de Front End**

