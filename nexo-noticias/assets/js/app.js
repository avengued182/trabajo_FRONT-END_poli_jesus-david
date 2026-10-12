/**
 * ==================================================
 * NEXO NOTICIAS - INICIALIZACIÓN GLOBAL
 * ==================================================
 */

function marcarNavegacionActiva() {
    const pagina = document.body.dataset.page || "home";

    $(".navbar__link").removeClass("navbar__link--active");

    if (pagina === "home") {
        $('.navbar__link[href="index.html"]').addClass("navbar__link--active");
    }
    else if (pagina === "contacto") {
        $('.navbar__link[href="pages/contacto.html"]').addClass("navbar__link--active");
    }
    else if (pagina === "favoritos") {
        $('.navbar__link[href="pages/favoritos.html"]').addClass("navbar__link--active");
    }
    else if (pagina === "noticias" || pagina === "categorias" || pagina === "detalle") {
        $("#btn-noticias").addClass("navbar__link--active");
    }
    else if (pagina === "admin") {
        $("#btn-gestion").addClass("navbar__link--active");
    }
}

function inicializarControladorSiExiste(nombreFuncion) {
    if (typeof window[nombreFuncion] === "function") {
        window[nombreFuncion]();
    }
}

function renderizarAplicacion() {
    const sesionActiva = SessionService.haySesionActiva();
    const sesion = sesionActiva ? SessionService.obtenerSesion() : null;
    const esAdmin =
        document.body.dataset.navbar === "admin"
        ||
        (sesion && sesion.rol === "admin");

    /* ==================================================
       NAVBAR Y FOOTER
    ================================================== */
    if (esAdmin && typeof crearNavbarAdmin === "function") {
        $("#app-header").html(crearNavbarAdmin());
        $("#app-footer").html(crearFooterGlobal(true));
    }
    else if (sesionActiva) {
        $("#app-header").html(
            crearNavbarAutenticado(sesion)
        );
        $("#app-footer").html(crearFooterGlobal(true));
    }
    else {
        $("#app-header").html(crearNavbarPublico());
        $("#app-footer").html(crearFooterGlobal(false));

        /* Los contenedores viven dentro del navbar público. */
        $("#login-modal-container").html(crearLoginModal());
        $("#register-modal-container").html(crearRegisterModal());
    }

    /* ==================================================
       CONTROLADORES GLOBALES
    ================================================== */
    if (typeof inicializarNavbar === "function") inicializarNavbar();
    if (!sesionActiva && !esAdmin) {
        if (typeof inicializarLogin === "function") inicializarLogin();
        if (typeof inicializarRegister === "function") inicializarRegister();
    }
    if (typeof inicializarFooter === "function") inicializarFooter();

    marcarNavegacionActiva();

    /* ==================================================
       CONTROLADORES DE PÁGINA
    ================================================== */
    [
        "inicializarHome",
        "inicializarDetalleNoticia",
        "inicializarNoticias",
        "inicializarCategorias",
        "inicializarContacto",
        "inicializarFavoritos",
        "inicializarAdminNoticias",
        "inicializarFormularioAdmin",
        "inicializarNewsletter"
    ].forEach(inicializarControladorSiExiste);
}

$(() => {
    renderizarAplicacion();
});
