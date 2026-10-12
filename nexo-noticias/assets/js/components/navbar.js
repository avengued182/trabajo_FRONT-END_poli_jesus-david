/**
 * ==================================================
 * NEXO NOTICIAS
 * Archivo: navbar.js
 * ==================================================
 * Crea el navbar público de la aplicación.
 * ==================================================
 */

function crearNavbarPublico() {
    return `
        <nav class="navbar">

            <!-- ======================================
                 LOGO
            ======================================= -->
            <a href="index.html" class="navbar__logo">
                <img
                    src="assets/images/logo/logo-nexo-noticias.png"
                    alt="Logo de Nexo Noticias"
                    class="navbar__logo-image"
                >
            </a>

            <!-- ======================================
                 MENÚ PRINCIPAL
            ======================================= -->
            <ul class="navbar__menu">

                <li class="navbar__item">
                    <a href="index.html" class="navbar__link navbar__link--active">
                        Inicio
                    </a>
                </li>

                <li class="navbar__item navbar__item--dropdown">
                    <button
                        id="btn-noticias"
                        class="navbar__link navbar__button"
                        type="button"
                        aria-expanded="false"
                    >
                        <span>Noticias</span>
                        <span class="navbar__caret" aria-hidden="true">
                            <svg
                                viewBox="0 0 24 24"
                                class="navbar__caret-icon"
                            >
                                <path
                                    d="M6 9L12 15L18 9"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </span>
                    </button>

                    <ul
                        id="menu-categorias"
                        class="navbar__dropdown"
                    >
                        <li class="navbar__dropdown-item">
                            <a href="pages/noticias.html">
                                Todas las noticias
                            </a>
                        </li>

                        <li class="navbar__dropdown-item">
                            <a href="pages/categorias.html">
                                Categorías
                            </a>
                        </li>

                        <li class="navbar__dropdown-item">
                            <a href="pages/categorias.html?categoria=educacion">
                                Educación
                            </a>
                        </li>

                        <li class="navbar__dropdown-item">
                            <a href="pages/categorias.html?categoria=tecnologia">
                                Tecnología
                            </a>
                        </li>

                        <li class="navbar__dropdown-item">
                            <a href="pages/categorias.html?categoria=turismo">
                                Turismo
                            </a>
                        </li>

                        <li class="navbar__dropdown-item navbar__dropdown-item--destacado">
                            <a href="pages/categorias.html?categoria=comercio">
                                Comercio
                            </a>
                        </li>
                    </ul>
                </li>

                <li class="navbar__item">
                    <a href="pages/contacto.html" class="navbar__link">
                        Contacto
                    </a>
                </li>

            </ul>

            <!-- ======================================
                 BOTÓN DE INICIO DE SESIÓN
            ======================================= -->
            <!-- ======================================
                 CUENTA / INICIO DE SESIÓN
            ======================================= -->

            <div class="navbar__account">

                <button
                    id="btn-login"
                    class="navbar__login"
                    type="button"
                    aria-expanded="false"
                >

                    <span class="navbar__login-icon">

                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            class="navbar__login-svg"
                        >
                            <path
                                d="M12 12c2.76 0 5-2.24 5-5
                                   s-2.24-5-5-5-5 2.24-5 5
                                   2.24 5 5 5zm0 2c-3.33 0-10
                                   1.67-10 5v3h20v-3c0-3.33
                                   -6.67-5-10-5z">
                            </path>
                        </svg>

                    </span>

                    <span>Iniciar sesión</span>

                </button>


                <!--
                    Aquí JavaScript insertará
                    el componente de inicio de sesión.
                -->
                <!-- Contenedor del formulario de inicio de sesión -->
                <div id="login-modal-container"></div>

                <!-- Contenedor del formulario de registro -->
                <div id="register-modal-container"></div>

            </div>

        </nav>
    `;
}

/**
 * ==================================================
 * NAVBAR DE USUARIO AUTENTICADO
 * ==================================================
 *
 * Se muestra cuando existe una sesión activa.
 *
 * @param {Object} usuario
 * @returns {string}
 */
function crearNavbarAutenticado(usuario) {

    const enlaceAdmin =
        usuario && usuario.rol === "admin"
            ? `<li class="navbar__item"><a href="pages/admin-noticias.html" class="navbar__link">Gestión</a></li>`
            : "";

    return `

        <nav class="navbar">

            <!-- ======================================
                 LOGO
            ======================================= -->

            <a
                href="index.html"
                class="navbar__logo"
            >

                <img
                    src="assets/images/logo/logo-nexo-noticias.png"
                    alt="Logo de Nexo Noticias"
                    class="navbar__logo-image"
                >

            </a>


            <!-- ======================================
                 MENÚ PRINCIPAL
            ======================================= -->

            <ul class="navbar__menu">


                <!-- Inicio -->

                <li class="navbar__item">

                    <a
                        href="index.html"
                        class="navbar__link navbar__link--active"
                    >
                        Inicio
                    </a>

                </li>


                <!-- Noticias -->

                <li
                    class="navbar__item
                           navbar__item--dropdown"
                >

                    <button
                        id="btn-noticias"
                        class="navbar__link navbar__button"
                        type="button"
                        aria-expanded="false"
                    >

                        <span>
                            Noticias
                        </span>


                        <span
                            class="navbar__caret"
                            aria-hidden="true"
                        >

                            <svg
                                viewBox="0 0 24 24"
                                class="navbar__caret-icon"
                            >

                                <path
                                    d="M6 9L12 15L18 9"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />

                            </svg>

                        </span>

                    </button>


                    <!-- Categorías -->

                    <ul
                        id="menu-categorias"
                        class="navbar__dropdown"
                    >

                        <li class="navbar__dropdown-item">
                            <a href="pages/noticias.html">
                                Todas las noticias
                            </a>
                        </li>

                        <li class="navbar__dropdown-item">
                            <a href="pages/categorias.html">
                                Categorías
                            </a>
                        </li>


                        <li class="navbar__dropdown-item">

                            <a
                                href="pages/categorias.html?categoria=educacion"
                            >
                                Educación
                            </a>

                        </li>


                        <li class="navbar__dropdown-item">

                            <a
                                href="pages/categorias.html?categoria=tecnologia"
                            >
                                Tecnología
                            </a>

                        </li>


                        <li class="navbar__dropdown-item">

                            <a
                                href="pages/categorias.html?categoria=turismo"
                            >
                                Turismo
                            </a>

                        </li>


                        <li
                            class="
                                navbar__dropdown-item
                                navbar__dropdown-item--destacado
                            "
                        >

                            <a
                                href="pages/categorias.html?categoria=comercio"
                            >
                                Comercio
                            </a>

                        </li>

                    </ul>

                </li>


                <!-- ==================================
                     FAVORITOS
                =================================== -->

                <li class="navbar__item">

                    <a
                        href="pages/favoritos.html"
                        class="navbar__link"
                    >
                        Favoritos
                    </a>

                </li>


                ${enlaceAdmin}

                <!-- Contacto -->

                <li class="navbar__item">

                    <a
                        href="pages/contacto.html"
                        class="navbar__link"
                    >
                        Contacto
                    </a>

                </li>

            </ul>


            <!-- ======================================
                 MI CUENTA
            ======================================= -->

            <div
                class="
                    navbar__account
                    navbar__account--authenticated
                "
            >

                <button
                    id="btn-cuenta"
                    class="navbar__account-button"
                    type="button"
                    aria-expanded="false"
                >


                    <!-- Icono usuario -->

                    <span class="navbar__account-icon">

                        <svg viewBox="0 0 24 24">

                            <path
                                d="
                                M12 12
                                c2.76 0 5-2.24 5-5
                                s-2.24-5-5-5
                                -5 2.24-5 5
                                2.24 5 5 5

                                m0 2
                                c-3.33 0-10 1.67-10 5
                                v3h20v-3
                                c0-3.33-6.67-5-10-5
                                "
                            >
                            </path>

                        </svg>

                    </span>


                    <span>
                        Mi cuenta
                    </span>


                    <!-- Flecha -->

                    <span
                        class="navbar__account-caret"
                    >

                        <svg viewBox="0 0 24 24">

                            <path
                                d="M6 9L12 15L18 9"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2.5"
                                stroke-linecap="round"
                            >
                            </path>

                        </svg>

                    </span>

                </button>


                <!-- ==================================
                     MENÚ DE CUENTA
                =================================== -->

                <ul
                id="menu-cuenta"
                class="navbar__account-menu"
            >

                <!-- MI PERFIL -->
                <li>

                    <button
                        id="btn-perfil"
                        type="button"
                    >

                        <span class="navbar__account-menu-icon">

                            <svg viewBox="0 0 24 24">
                                <path
                                    d="
                                    M12 12
                                    c2.76 0 5-2.24 5-5
                                    s-2.24-5-5-5
                                    -5 2.24-5 5
                                    2.24 5 5 5

                                    m0 2
                                    c-3.33 0-10 1.67-10 5
                                    v3h20v-3
                                    c0-3.33-6.67-5-10-5
                                    "
                                />
                            </svg>

                        </span>

                        <span>
                            Mi perfil
                        </span>

                    </button>

                </li>


               <!-- ==================================
                     NOTIFICACIONES
                =================================== -->

                <li class="navbar__notifications-section">


                    <!-- Botón principal -->

                    <button
                        id="btn-notificaciones"
                        type="button"
                        aria-expanded="false"
                    >


                        <!-- Icono campana -->

                        <span class="navbar__account-menu-icon">

                            <svg viewBox="0 0 24 24">

                                <path
                                    d="
                                    M18 8
                                    a6 6 0 0 0-12 0
                                    c0 7-3 7-3 9
                                    h18
                                    c0-2-3-2-3-9

                                    M9.5 20
                                    a2.5 2.5 0 0 0 5 0
                                    "
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />

                            </svg>

                        </span>


                        <span class="navbar__notifications-title">

                            Notificaciones

                        </span>


                        <!-- Flecha -->

                        <span
                            class="navbar__notifications-caret"
                            aria-hidden="true"
                        >

                            <svg viewBox="0 0 24 24">

                                <path
                                    d="M6 9L12 15L18 9"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2.2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />

                            </svg>

                        </span>

                    </button>


                    <!-- ==================================
                         PANEL DE NOTIFICACIONES
                    =================================== -->

                    <div
                        id="panel-notificaciones"
                        class="navbar__notifications-panel"
                    >


                        <!--
                        Las notificaciones reales serán
                        insertadas aquí mediante JavaScript.
                        -->

                        <div
                            id="lista-notificaciones"
                            class="navbar__notifications-list"
                        >
                        </div>


                        <!--
                        Aparece solamente cuando
                        no existen notificaciones.
                        -->

                        <p
                            id="notificaciones-vacias"
                            class="navbar__notifications-empty"
                        >
                            No tienes notificaciones.
                        </p>


                    </div>

                </li>




                <!-- SEPARADOR -->
                <li
                    class="navbar__account-menu-separator"
                >
                </li>


                <!-- CERRAR SESIÓN -->
                <li>

                    <button
                        id="btn-cerrar-sesion"
                        class="navbar__account-logout"
                        type="button"
                    >

                        <span class="navbar__account-menu-icon">

                            <svg viewBox="0 0 24 24">

                                <path
                                    d="
                                    M10 17
                                    l5-5
                                    -5-5

                                    M15 12
                                    H3

                                    M14 3
                                    h5
                                    a2 2 0 0 1 2 2
                                    v14
                                    a2 2 0 0 1-2 2
                                    h-5
                                    "
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />

                            </svg>

                        </span>

                        <span>
                            Cerrar sesión
                        </span>

                    </button>

                </li>

            </ul>

            </div>

        </nav>

    `;

}
/**
 * ==================================================
 * NAVBAR ADMINISTRATIVO
 * ==================================================
 * Se utiliza únicamente en las vistas del mini CRUD.
 */
function crearNavbarAdmin() {
    return `
        <nav class="navbar navbar--admin">

            <a href="index.html" class="navbar__logo">
                <img
                    src="assets/images/logo/logo-nexo-noticias.png"
                    alt="Logo de Nexo Noticias"
                    class="navbar__logo-image"
                >
            </a>

            <ul class="navbar__menu">
                <li class="navbar__item">
                    <a href="index.html" class="navbar__link">Inicio</a>
                </li>

                <li class="navbar__item navbar__item--dropdown">
                    <button
                        id="btn-noticias"
                        class="navbar__link navbar__button"
                        type="button"
                        aria-expanded="false"
                    >
                        <span>Noticias</span>
                        <span class="navbar__caret" aria-hidden="true">
                            <svg viewBox="0 0 24 24" class="navbar__caret-icon">
                                <path d="M6 9L12 15L18 9" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </button>

                    <ul id="menu-categorias" class="navbar__dropdown">
                        <li class="navbar__dropdown-item"><a href="pages/noticias.html">Todas las noticias</a></li>
                        <li class="navbar__dropdown-item"><a href="pages/categorias.html">Categorías</a></li>
                        <li class="navbar__dropdown-item"><a href="pages/categorias.html?categoria=educacion">Educación</a></li>
                        <li class="navbar__dropdown-item"><a href="pages/categorias.html?categoria=tecnologia">Tecnología</a></li>
                        <li class="navbar__dropdown-item"><a href="pages/categorias.html?categoria=turismo">Turismo</a></li>
                        <li class="navbar__dropdown-item navbar__dropdown-item--destacado"><a href="pages/categorias.html?categoria=comercio">Comercio</a></li>
                    </ul>
                </li>

                <li class="navbar__item navbar__item--dropdown navbar__item--management">
                    <button
                        id="btn-gestion"
                        class="navbar__link navbar__button"
                        type="button"
                        aria-expanded="false"
                    >
                        <span>Gestión de noticias</span>
                        <span class="navbar__caret" aria-hidden="true">
                            <svg viewBox="0 0 24 24" class="navbar__caret-icon">
                                <path d="M6 9L12 15L18 9" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </button>

                    <ul id="menu-gestion" class="navbar__dropdown navbar__dropdown--management">
                        <li class="navbar__dropdown-item">
                            <a href="pages/admin-noticias.html">Buscar / gestionar</a>
                        </li>
                        <li class="navbar__dropdown-item navbar__dropdown-item--destacado">
                            <a href="pages/crear-noticia.html">Crear noticia</a>
                        </li>
                    </ul>
                </li>

                <li class="navbar__item">
                    <a href="pages/contacto.html" class="navbar__link">Contacto</a>
                </li>
            </ul>

            <div class="navbar__account navbar__account--authenticated">
                <button id="btn-cuenta" class="navbar__account-button" type="button" aria-expanded="false">
                    <span class="navbar__account-icon">
                        <svg viewBox="0 0 24 24"><path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z"/></svg>
                    </span>
                    <span>Admin</span>
                    <span class="navbar__account-caret">
                        <svg viewBox="0 0 24 24"><path d="M6 9L12 15L18 9" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
                    </span>
                </button>

                <ul id="menu-cuenta" class="navbar__account-menu">
                    <li>
                        <a class="navbar__admin-menu-link" href="pages/admin-noticias.html">
                            <span class="navbar__account-menu-icon">☷</span>
                            <span>Gestión de noticias</span>
                        </a>
                    </li>
                    <li>
                        <a class="navbar__admin-menu-link" href="pages/crear-noticia.html">
                            <span class="navbar__account-menu-icon">＋</span>
                            <span>Crear noticia</span>
                        </a>
                    </li>
                    <li class="navbar__account-menu-separator"></li>
                    <li>
                        <a class="navbar__admin-menu-link" href="index.html">
                            <span class="navbar__account-menu-icon">⌂</span>
                            <span>Volver al sitio</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    `;
}
