/**
 * ==================================================
 * NEXO NOTICIAS
 * Archivo: footer.js
 * ==================================================
 *
 * RESPONSABILIDAD:
 *
 * Construir el Footer global de Nexo Noticias.
 *
 * Este componente podrá reutilizarse
 * en todas las páginas del sitio.
 *
 * ==================================================
 */


/**
 * Construye el Footer.
 *
 * @param {boolean} sesionActiva
 * @returns {string}
 */
function crearFooterGlobal(sesionActiva) {


    /*
    Año actual.
    */
    const anioActual =
        new Date().getFullYear();


    /*
    El último enlace cambia dependiendo
    del estado del usuario.
    */
    const enlaceCuenta =
        sesionActiva

        ? `
            <a
                href="#app-header"
                id="footer-account-link"
            >
                Mi cuenta
            </a>
        `

        : `
            <a
                href="#app-header"
                id="footer-login-link"
            >
                Iniciar sesión
            </a>
        `;


    return `

        <div class="site-footer__container">


            <!-- =====================================
                 CONTENIDO PRINCIPAL
            ====================================== -->

            <div class="site-footer__grid">


                <!-- =================================
                     MARCA
                ================================== -->

                <div class="site-footer__brand">


                    <a
                        href="index.html"
                        class="site-footer__logo"
                    >

                        <img
                            src="assets/images/logo/logo-nexo-noticias.png"
                            alt="Nexo Noticias"
                        >

                    </a>


                    <p class="site-footer__description">
                        Información verificada que te conecta
                        con un mundo mejor informado.
                    </p>


                    <!-- REDES SOCIALES -->

                    <div class="site-footer__socials">


                        <!-- Facebook -->

                        <a
                            href="#"
                            class="site-footer__social"
                            aria-label="Facebook"
                        >

                            <svg viewBox="0 0 24 24">

                                <path
                                    d="
                                    M14 8h3V4h-3
                                    c-3 0-5 2-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9
                                    c0-.7.3-1 1-1Z
                                    "
                                    fill="currentColor"
                                />

                            </svg>

                        </a>


                        <!-- X -->

                        <a
                            href="#"
                            class="site-footer__social"
                            aria-label="X"
                        >

                            <svg viewBox="0 0 24 24">

                                <path
                                    d="
                                    M5 4L19 20
                                    M19 4L5 20
                                    "
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                />

                            </svg>

                        </a>


                        <!-- Instagram -->

                        <a
                            href="#"
                            class="site-footer__social"
                            aria-label="Instagram"
                        >

                            <svg viewBox="0 0 24 24">

                                <rect
                                    x="4"
                                    y="4"
                                    width="16"
                                    height="16"
                                    rx="5"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                />

                                <circle
                                    cx="12"
                                    cy="12"
                                    r="4"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                />

                                <circle
                                    cx="17.5"
                                    cy="6.5"
                                    r="1"
                                    fill="currentColor"
                                />

                            </svg>

                        </a>


                        <!-- YouTube -->

                        <a
                            href="#"
                            class="site-footer__social"
                            aria-label="YouTube"
                        >

                            <svg viewBox="0 0 24 24">

                                <rect
                                    x="3"
                                    y="6"
                                    width="18"
                                    height="12"
                                    rx="4"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                />

                                <path
                                    d="M10 9.5L15 12L10 14.5Z"
                                    fill="currentColor"
                                />

                            </svg>

                        </a>


                        <!-- LinkedIn -->

                        <a
                            href="#"
                            class="site-footer__social"
                            aria-label="LinkedIn"
                        >

                            <svg viewBox="0 0 24 24">

                                <circle
                                    cx="6"
                                    cy="6"
                                    r="1.5"
                                    fill="currentColor"
                                />

                                <rect
                                    x="4.5"
                                    y="9"
                                    width="3"
                                    height="11"
                                    fill="currentColor"
                                />

                                <path
                                    d="
                                    M10 9H13V10.5
                                    C14 9.3 15.3 8.7 16.8 8.7
                                    C20 8.7 21 10.7 21 13.5
                                    V20H18V14
                                    C18 12.5 17.5 11.5 16 11.5
                                    C14.2 11.5 13 12.7 13 15
                                    V20H10Z
                                    "
                                    fill="currentColor"
                                />

                            </svg>

                        </a>

                    </div>

                </div>


                <!-- =================================
                     ENLACES
                ================================== -->

                <div class="site-footer__column">

                    <h3 class="site-footer__heading">
                        Enlaces
                    </h3>


                    <nav
                        class="site-footer__links"
                        aria-label="Enlaces del pie de página"
                    >

                        <a href="index.html">
                            Inicio
                        </a>

                        <a href="pages/noticias.html">
                            Noticias
                        </a>

                        <a href="pages/favoritos.html">
                            Favoritos
                        </a>

                        <a href="pages/contacto.html">
                            Contacto
                        </a>

                        ${enlaceCuenta}

                    </nav>

                </div>


                <!-- =================================
                     CONTACTO
                ================================== -->

                <div class="site-footer__column">

                    <h3 class="site-footer__heading">
                        Contacto
                    </h3>


                    <div class="site-footer__contact">


                        <!-- Correo -->

                        <div class="site-footer__contact-item">

                            <span class="site-footer__contact-icon">

                                <svg viewBox="0 0 24 24">

                                    <path
                                        d="
                                        M3 5H21V19H3Z
                                        M3 6L12 13L21 6
                                        "
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linejoin="round"
                                    />

                                </svg>

                            </span>


                            <span>
                                info@nexonoticias.com
                            </span>

                        </div>


                        <!-- Teléfono -->

                        <div class="site-footer__contact-item">

                            <span class="site-footer__contact-icon">

                                <svg viewBox="0 0 24 24">

                                    <path
                                        d="
                                        M6 3L9 8L7 10
                                        C9 14 10 15 14 17
                                        L16 15L21 18
                                        C20 21 18 22 16 21
                                        C9 18 6 15 3 8
                                        C2 6 3 4 6 3Z
                                        "
                                        fill="currentColor"
                                    />

                                </svg>

                            </span>


                            <span>
                                +52 55 1234 5678
                            </span>

                        </div>


                        <!-- Ubicación -->

                        <div class="site-footer__contact-item">

                            <span class="site-footer__contact-icon">

                                <svg viewBox="0 0 24 24">

                                    <path
                                        d="
                                        M12 21
                                        C12 21 18 15 18 9
                                        A6 6 0 1 0 6 9
                                        C6 15 12 21 12 21Z
                                        "
                                        fill="currentColor"
                                    />

                                    <circle
                                        cx="12"
                                        cy="9"
                                        r="2"
                                        fill="#06385d"
                                    />

                                </svg>

                            </span>


                            <span>
                                Ciudad de México, México
                            </span>

                        </div>

                    </div>

                </div>


                <!-- =================================
                     MENSAJE FINAL
                ================================== -->

                <div class="site-footer__message">

                    <p>
                        Un mundo
                        <strong>
                            mejor informado
                        </strong>
                        comienza aquí
                    </p>


                    <span
                        class="site-footer__message-line"
                        aria-hidden="true"
                    >
                    </span>

                </div>

            </div>


            <!-- =====================================
                 PARTE INFERIOR
            ====================================== -->

            <div class="site-footer__bottom">


                <p>
                    © ${anioActual} Nexo Noticias.
                    Todos los derechos reservados.
                </p>


                <div class="site-footer__legal">

                    <a href="#">
                        Términos de uso
                    </a>

                    <span>
                        |
                    </span>

                    <a href="#">
                        Privacidad
                    </a>

                    <span>
                        |
                    </span>

                    <a href="#">
                        Cookies
                    </a>

                </div>

            </div>

        </div>

    `;

}