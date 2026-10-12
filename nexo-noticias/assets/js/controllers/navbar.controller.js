/**
 * ==================================================
 * NEXO NOTICIAS - CONTROLADOR DEL NAVBAR
 * ==================================================
 */

function cerrarPanelNotificaciones() {
    $("#panel-notificaciones")
        .removeClass("navbar__notifications-panel--visible");

    $("#btn-notificaciones")
        .attr("aria-expanded", "false");

    $(".navbar__notifications-caret")
        .removeClass("navbar__notifications-caret--open");
}

function inicializarNavbar() {
    const $menuNoticias = $("#menu-categorias");
    const $botonNoticias = $("#btn-noticias");
    const $menuGestion = $("#menu-gestion");
    const $botonGestion = $("#btn-gestion");
    const $menuCuenta = $("#menu-cuenta");
    const $botonCuenta = $("#btn-cuenta");

    /* Evita acumular eventos globales cuando se vuelve a renderizar. */
    $(document).off("click.navbar");

    $botonNoticias.off("click.navbar").on("click.navbar", function (evento) {
        evento.stopPropagation();

        $menuGestion.removeClass("navbar__dropdown--visible");
        $botonGestion.attr("aria-expanded", "false");
        $menuCuenta.removeClass("navbar__account-menu--visible");
        $botonCuenta.attr("aria-expanded", "false");
        cerrarPanelNotificaciones();

        $menuNoticias.toggleClass("navbar__dropdown--visible");
        $botonNoticias.attr(
            "aria-expanded",
            $menuNoticias.hasClass("navbar__dropdown--visible")
        );
    });

    $botonGestion.off("click.navbar").on("click.navbar", function (evento) {
        evento.stopPropagation();

        $menuNoticias.removeClass("navbar__dropdown--visible");
        $botonNoticias.attr("aria-expanded", "false");
        $menuCuenta.removeClass("navbar__account-menu--visible");
        $botonCuenta.attr("aria-expanded", "false");
        cerrarPanelNotificaciones();

        $menuGestion.toggleClass("navbar__dropdown--visible");
        $botonGestion.attr(
            "aria-expanded",
            $menuGestion.hasClass("navbar__dropdown--visible")
        );
    });

    $botonCuenta.off("click.navbar").on("click.navbar", function (evento) {
        evento.stopPropagation();

        $menuNoticias.removeClass("navbar__dropdown--visible");
        $botonNoticias.attr("aria-expanded", "false");
        $menuGestion.removeClass("navbar__dropdown--visible");
        $botonGestion.attr("aria-expanded", "false");

        $menuCuenta.toggleClass("navbar__account-menu--visible");
        const abierto = $menuCuenta.hasClass("navbar__account-menu--visible");
        $botonCuenta.attr("aria-expanded", abierto);

        if (!abierto) cerrarPanelNotificaciones();
    });

    $(document).on("click.navbar", function (evento) {
        const $objetivo = $(evento.target);

        if (!$objetivo.closest("#btn-noticias, #menu-categorias").length) {
            $menuNoticias.removeClass("navbar__dropdown--visible");
            $botonNoticias.attr("aria-expanded", "false");
        }

        if (!$objetivo.closest("#btn-gestion, #menu-gestion").length) {
            $menuGestion.removeClass("navbar__dropdown--visible");
            $botonGestion.attr("aria-expanded", "false");
        }

        if (!$objetivo.closest(".navbar__account--authenticated").length) {
            $menuCuenta.removeClass("navbar__account-menu--visible");
            $botonCuenta.attr("aria-expanded", "false");
            cerrarPanelNotificaciones();
        }
    });

    $("#btn-cerrar-sesion")
        .off("click.navbar")
        .on("click.navbar", function () {
            SessionService.cerrarSesion();
            renderizarAplicacion();
        });

    $("#btn-perfil")
        .off("click.navbar")
        .on("click.navbar", function () {
            window.alert("La vista de perfil no forma parte de esta entrega del prototipo.");
        });

    $("#btn-notificaciones")
        .off("click.navbar")
        .on("click.navbar", function (evento) {
            evento.stopPropagation();
            renderizarNotificacionesNavbar();

            const $panel = $("#panel-notificaciones");
            const abiertoAntes = $panel.hasClass("navbar__notifications-panel--visible");

            if (abiertoAntes) {
                cerrarPanelNotificaciones();
                return;
            }

            $panel.addClass("navbar__notifications-panel--visible");
            $(this).attr("aria-expanded", "true");
            $(".navbar__notifications-caret")
                .addClass("navbar__notifications-caret--open");
        });

    $("#panel-notificaciones")
        .off("click.navbar", ".navbar__notification-delete")
        .on("click.navbar", ".navbar__notification-delete", function (evento) {
            evento.stopPropagation();
            const idNotificacion = Number($(this).data("notificacion-id"));
            NotificacionesService.eliminar(idNotificacion);
            renderizarNotificacionesNavbar();
        });
}

/**
 * ==================================================
 * CALCULAR TIEMPO DE NOTIFICACIÓN
 * ==================================================
 */
function obtenerTiempoNotificacion(
    fechaNotificacion
) {


    const fecha =
        new Date(
            fechaNotificacion
        );


    const ahora =
        new Date();


    /*
    Diferencia en milisegundos.
    */
    const diferencia =
        ahora - fecha;


    /*
    Convertimos a segundos.
    */
    const segundos =
        Math.floor(
            diferencia / 1000
        );


    if (segundos < 60) {

        return "Hace unos segundos";

    }


    /*
    Minutos.
    */
    const minutos =
        Math.floor(
            segundos / 60
        );


    if (minutos < 60) {

        return `Hace ${minutos} min`;

    }


    /*
    Horas.
    */
    const horas =
        Math.floor(
            minutos / 60
        );


    if (horas < 24) {

        return `Hace ${horas} h`;

    }


    /*
    Días.
    */
    const dias =
        Math.floor(
            horas / 24
        );


    return `Hace ${dias} d`;

}  

/**
 * ==================================================
 * CREAR NOTIFICACIÓN DEL NAVBAR
 * ==================================================
 */
function crearNotificacionNavbar(
    notificacion
) {


    const tiempo =
        obtenerTiempoNotificacion(
            notificacion.fecha
        );


    return `

        <div
            class="navbar__notification"
            data-notificacion-id="${notificacion.id}"
        >


            <!-- ICONO -->

            <div class="navbar__notification-icon">

                <svg viewBox="0 0 24 24">

                    <path
                        d="
                        M12 21
                        C12 21
                        4 16
                        4 9.5
                        C4 6.5
                        6 4.5
                        8.7 4.5
                        C10.3 4.5
                        11.4 5.3
                        12 6.3
                        C12.6 5.3
                        13.7 4.5
                        15.3 4.5
                        C18 4.5
                        20 6.5
                        20 9.5
                        C20 16
                        12 21
                        12 21
                        "
                        fill="currentColor"
                    />

                </svg>

            </div>


            <!-- CONTENIDO -->

            <div class="navbar__notification-content">

                <p class="navbar__notification-text">

                    <strong>
                        ${notificacion.titulo}
                    </strong>

                    <br>

                    ${notificacion.descripcion}

                </p>


                <span class="navbar__notification-time">

                    ${tiempo}

                </span>

            </div>


            <!-- ELIMINAR -->

            <button
                type="button"
                class="navbar__notification-delete"
                data-notificacion-id="${notificacion.id}"
                aria-label="Eliminar notificación"
            >

                ×

            </button>


        </div>

    `;

}

/**
 * ==================================================
 * MOSTRAR NOTIFICACIONES
 * ==================================================
 */
function renderizarNotificacionesNavbar() {


    const $lista =
        $("#lista-notificaciones");


    const $mensajeVacio =
        $("#notificaciones-vacias");


    /*
    Si no existe el panel,
    no hacemos nada.
    */
    if ($lista.length === 0) {

        return;

    }


    const notificaciones =
        NotificacionesService
            .obtenerTodas();


    /*
    Si no hay notificaciones.
    */
    if (
        notificaciones.length === 0
    ) {


        $lista.empty();


        $mensajeVacio.show();


        return;

    }


    /*
    Sí hay notificaciones.
    */
    $mensajeVacio.hide();


    let html = "";


    notificaciones.forEach(

        function (notificacion) {


            html +=
                crearNotificacionNavbar(
                    notificacion
                );

        }

    );


    $lista.html(
        html
    );

}