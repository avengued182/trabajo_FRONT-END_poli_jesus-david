/**
 * ==================================================
 * NEXO NOTICIAS
 * Archivo: detalle-noticia.controller.js
 * ==================================================
 *
 * RESPONSABILIDAD:
 *
 * - Obtener el ID recibido por URL.
 * - Buscar la noticia.
 * - Mostrar el detalle.
 * - Mostrar noticias relacionadas.
 *
 * ==================================================
 */


/**
 * ==================================================
 * OBTENER ID DESDE LA URL
 * ==================================================
 *
 * Ejemplo:
 *
 * detalle-noticia.html?id=2
 */
function obtenerIdNoticiaDesdeURL() {


    const parametros =
        new URLSearchParams(
            window.location.search
        );


    return parametros.get("id");

}


/**
 * ==================================================
 * FORMATEAR FECHA
 * ==================================================
 */
function formatearFechaNoticia(fechaOriginal) {


    const fecha =
        new Date(
            fechaOriginal + "T00:00:00"
        );


    return fecha.toLocaleDateString(
        "es-MX",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}


/**
 * ==================================================
 * CREAR NOTICIA RELACIONADA
 * ==================================================
 */
function crearNoticiaRelacionada(noticia) {


    return `

        <a
            href="pages/detalle-noticia.html?id=${noticia.id}"
            class="related-news__item"
        >

            <img
                src="${noticia.imagen}"
                alt="${noticia.titulo}"
                class="related-news__image"
            >


            <div class="related-news__info">

                <h4 class="related-news__title">
                    ${noticia.titulo}
                </h4>

                <span class="related-news__date">

                    ${formatearFechaNoticia(
                        noticia.fecha
                    )}

                </span>

            </div>


            <span
                class="related-news__arrow"
                aria-hidden="true"
            >

                <svg viewBox="0 0 24 24">

                    <path
                        d="
                        M9 6
                        L15 12
                        L9 18
                        "
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />

                </svg>

            </span>

        </a>

    `;

}


/**
 * ==================================================
 * CREAR DETALLE DE NOTICIA
 * ==================================================
 */
function crearDetalleNoticia(
    noticia,
    relacionadas
) {


    const fechaFormateada =
        formatearFechaNoticia(
            noticia.fecha
        );


    /*
    Creamos las noticias relacionadas.
    */
    let relacionadasHTML = "";


    relacionadas.forEach(
        function (relacionada) {

            relacionadasHTML +=
                crearNoticiaRelacionada(
                    relacionada
                );

        }
    );


    /*
    Si todavía no tenemos suficientes noticias
    de la misma categoría, mostramos un mensaje.
    */
    if (relacionadas.length === 0) {

        relacionadasHTML = `

            <p class="related-news__empty">
                Por ahora no hay más noticias
                relacionadas con esta categoría.
            </p>

        `;

    }


    return `

        <!-- =====================================
             BREADCRUMB
        ====================================== -->

        <nav
            class="news-detail__breadcrumb"
            aria-label="Ruta de navegación"
        >

            <a href="index.html">
                Inicio
            </a>

            <span>
                ›
            </span>

            <a href="pages/noticias.html">
                Noticias
            </a>

            <span>
                ›
            </span>

            <a href="pages/categorias.html?categoria=${encodeURIComponent(noticia.categoria)}">
                ${noticia.categoria}
            </a>

            <span>
                ›
            </span>

            <span class="news-detail__breadcrumb-current">
                ${noticia.titulo}
            </span>

        </nav>


        <!-- =====================================
             LAYOUT PRINCIPAL
        ====================================== -->

        <div class="news-detail__layout">


            <!-- =================================
                 COLUMNA PRINCIPAL
            ================================== -->

            <article class="news-detail__main">


                <!-- IMAGEN -->

                <div class="news-detail__image-container">

                    <img
                        class="news-detail__image"
                        src="${noticia.imagen}"
                        alt="${noticia.titulo}"
                    >

                </div>


                <!-- CATEGORÍA -->

                <span class="news-detail__category">

                    ${noticia.categoria}

                </span>


                <!-- TÍTULO -->

                <h1 class="news-detail__title">

                    ${noticia.titulo}

                </h1>


                <!-- INTRODUCCIÓN -->

                <p class="news-detail__summary">

                    ${noticia.resumen}

                </p>


                <!-- =================================
                     METADATOS
                ================================== -->

                <div class="news-detail__meta">


                    <!-- AUTOR -->

                    <div class="news-detail__meta-item">

                        <span class="news-detail__meta-icon">

                            <svg viewBox="0 0 24 24">

                                <circle
                                    cx="12"
                                    cy="8"
                                    r="4"
                                    fill="currentColor"
                                />

                                <path
                                    d="
                                    M5 21
                                    C5 16
                                    8 14
                                    12 14
                                    C16 14
                                    19 16
                                    19 21
                                    "
                                    fill="currentColor"
                                />

                            </svg>

                        </span>


                        <span>

                            Por:
                            <strong>
                                ${noticia.autor}
                            </strong>

                        </span>

                    </div>


                    <!-- FECHA -->

                    <div class="news-detail__meta-item">

                        <span class="news-detail__meta-icon">

                            <svg viewBox="0 0 24 24">

                                <rect
                                    x="4"
                                    y="6"
                                    width="16"
                                    height="14"
                                    rx="2"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                />

                                <path
                                    d="
                                    M8 3V8
                                    M16 3V8
                                    M4 10H20
                                    "
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                />

                            </svg>

                        </span>

                        <span>
                            ${fechaFormateada}
                        </span>

                    </div>


                    <!-- TIEMPO -->

                    <div class="news-detail__meta-item">

                        <span class="news-detail__meta-icon">

                            <svg viewBox="0 0 24 24">

                                <circle
                                    cx="12"
                                    cy="12"
                                    r="9"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                />

                                <path
                                    d="
                                    M12 7V12L16 14
                                    "
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                />

                            </svg>

                        </span>

                        <span>
                            ${noticia.tiempoLectura}
                            de lectura
                        </span>

                    </div>

                </div>


                <div class="news-detail__separator">
                </div>


                <!-- =================================
                     CONTENIDO COMPLETO
                ================================== -->

                <div class="news-detail__content">

                    <p>
                        ${noticia.contenido}
                    </p>

                </div>


                <!-- =================================
                     CITA DESTACADA
                ================================== -->

                <blockquote class="news-detail__quote">

                    <span
                        class="news-detail__quote-symbol"
                        aria-hidden="true"
                    >
                        “
                    </span>


                    <div>

                        <p>
                            ${noticia.cita || noticia.resumen}
                        </p>

                        <cite>

                            — ${noticia.autorCita || noticia.autor}

                        </cite>

                    </div>

                </blockquote>


            </article>


            <!-- =================================
                 COLUMNA DERECHA
            ================================== -->

            <aside class="news-detail__sidebar">


                <!-- =============================
                     ACCIONES
                ============================== -->

                <div class="news-detail__actions">


                    <button id="btn-favorito-detalle"
                        type="button"
                        class="
                            news-detail__action
                            news-detail__action--favorite
                        "
                        data-noticia-id="${noticia.id}"
                    >

                        <span aria-hidden="true">
                            ♥
                        </span>

                        <span id="texto-favorito-detalle">
                            Agregar a favoritos
                        </span>

                    </button>


                    <button id="btn-compartir-detalle"
                        type="button"
                        class="
                            news-detail__action
                            news-detail__action--share
                        "
                    >

                        <span aria-hidden="true">

                            <svg viewBox="0 0 24 24">

                                <circle
                                    cx="18"
                                    cy="5"
                                    r="2.5"
                                    fill="currentColor"
                                />

                                <circle
                                    cx="6"
                                    cy="12"
                                    r="2.5"
                                    fill="currentColor"
                                />

                                <circle
                                    cx="18"
                                    cy="19"
                                    r="2.5"
                                    fill="currentColor"
                                />

                                <path
                                    d="
                                    M8.3 10.8
                                    L15.7 6.3
                                    M8.3 13.2
                                    L15.7 17.7
                                    "
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                />

                            </svg>

                        </span>

                        Compartir

                    </button>

                </div>


                <!-- =============================
                     NOTICIAS RELACIONADAS
                ============================== -->

                <section class="related-news">


                    <h2 class="related-news__heading">
                        Noticias relacionadas
                    </h2>


                    <div class="related-news__list">

                        ${relacionadasHTML}

                    </div>


                    <a
                        href="pages/categorias.html?categoria=${encodeURIComponent(noticia.categoria)}"
                        class="related-news__more"
                    >

                        Ver más noticias de
                        ${noticia.categoria}

                        <span>
                            →
                        </span>

                    </a>

                </section>


                <!-- =============================
                     NEWSLETTER
                ============================== -->

                <section class="detail-newsletter">


                    <div class="detail-newsletter__header">


                        <div class="detail-newsletter__icon">

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

                        </div>


                        <div>

                            <h2 class="detail-newsletter__title">

                                Recibe las noticias
                                más importantes

                            </h2>


                            <p class="detail-newsletter__description">

                                Suscríbete a nuestro boletín
                                y mantente siempre informado.

                            </p>

                        </div>

                    </div>


                    <form class="detail-newsletter__form">


                        <input
                            type="email"
                            class="detail-newsletter__input"
                            placeholder="Tu correo electrónico"
                            required
                        >


                        <button
                            type="submit"
                            class="detail-newsletter__button"
                        >

                            Suscribirme

                            <span>
                                →
                            </span>

                        </button>


                    </form>


                </section>


            </aside>


        </div>

    `;

}


/**
 * ==================================================
 * MOSTRAR ERROR
 * ==================================================
 */
function mostrarErrorDetalle() {


    $("#news-detail-container")
        .html(
            `

                <div class="news-detail__error">

                    <h1>
                        Noticia no encontrada
                    </h1>

                    <p>
                        La noticia solicitada
                        no está disponible.
                    </p>

                    <a href="index.html">
                        Volver al inicio
                    </a>

                </div>

            `
        );

}

/**
 * ==================================================
 * COMPARTIR NOTICIA
 * ==================================================
 */
function inicializarCompartirDetalle(
    noticia
) {


    $("#btn-compartir-detalle")
        .off("click")
        .on(
            "click",
            async function () {


                /*
                URL actual de la noticia.
                */
                const urlActual =
                    window.location.href;


                /*
                Si el navegador permite
                compartir de forma nativa.
                */
                if (
                    navigator.share
                ) {


                    try {


                        await navigator.share({

                            title:
                                noticia.titulo,

                            text:
                                noticia.resumen,

                            url:
                                urlActual

                        });


                    }
                    catch (error) {


                        /*
                        Si el usuario cancela,
                        no hacemos nada.
                        */
                        console.log(
                            "Compartir cancelado"
                        );

                    }


                    return;

                }


                /*
                Si navigator.share no existe,
                copiamos el enlace.
                */
                try {


                    await navigator.clipboard
                        .writeText(
                            urlActual
                        );


                    alert(
                        "Enlace copiado al portapapeles."
                    );


                }
                catch (error) {


                    alert(
                        "No fue posible copiar el enlace."
                    );

                }

            }
        );

}

/**
 * ==================================================
 * INICIALIZAR PÁGINA
 * ==================================================
 */
function inicializarDetalleNoticia() {



    const $contenedor =
        $("#news-detail-container");


    /*
    Si esta página no tiene el contenedor
    de detalle, no ejecutamos nada.
    */
    if ($contenedor.length === 0) {

        return;

    }


    const id =
        obtenerIdNoticiaDesdeURL();


    if (!id) {

        mostrarErrorDetalle();

        return;

    }


    /*
    Necesitamos:

    1. La noticia seleccionada.
    2. Todas las noticias para encontrar
       relacionadas.
    */
    $.when(

        NoticiasService.obtenerPorId(id),

        NoticiasService.obtenerTodas()

    ).then(

        function (
            noticia,
            noticias
        ) {


            if (!noticia) {

                mostrarErrorDetalle();

                return;

            }


            /*
            ==================================================
            RELACIONADAS
            ==================================================

            Deben pertenecer a la misma categoría
            y no ser la noticia actual.
            */
            const relacionadas =
                noticias
                    .filter(
                        function (otraNoticia) {

                            return (

                                otraNoticia.id
                                    !==
                                noticia.id

                                &&

                                otraNoticia.categoria
                                    ===
                                noticia.categoria

                                &&

                                otraNoticia.estado
                                    ===
                                "publicada"

                            );

                        }
                    )

                    /*
                    Máximo cuatro,
                    como en el mockup.
                    */
                    .slice(
                        0,
                        4
                    );


            /*
            Generamos toda la vista.
            */
            $contenedor.html(

                crearDetalleNoticia(
                    noticia,
                    relacionadas
                )

            );

            inicializarFavoritoDetalle(
                noticia
            );

            inicializarCompartirDetalle(
                noticia
            );


            /*
            Título de pestaña.
            */
            document.title =
                noticia.titulo
                +
                " | Nexo Noticias";


            /*
            Evitamos que el formulario
            de newsletter recargue la página.

            Su funcionalidad real la
            implementaremos después.
            */
            $(".detail-newsletter__form")
                .on(
                    "submit",
                    function (evento) {

                        evento.preventDefault();

                    }
                );

        },


        function (error) {


            console.error(
                "Error al cargar el detalle.",
                error
            );


            mostrarErrorDetalle();

        }

    );

}

/**
 * ==================================================
 * ACTUALIZAR BOTÓN FAVORITO DEL DETALLE
 * ==================================================
 */
function actualizarFavoritoDetalle(
    idNoticia
) {


    const esFavorita =
        FavoritosService.esFavorita(
            idNoticia
        );


    const $boton =
        $("#btn-favorito-detalle");


    const $texto =
        $("#texto-favorito-detalle");


    if (esFavorita) {


        $boton.addClass(
            "is-favorite"
        );


        $boton.attr(
            "aria-label",
            "Quitar noticia de favoritos"
        );


        $texto.text(
            "Quitar de favoritos"
        );


        return;

    }


    $boton.removeClass(
        "is-favorite"
    );


    $boton.attr(
        "aria-label",
        "Agregar noticia a favoritos"
    );


    $texto.text(
        "Agregar a favoritos"
    );

}

/**
 * ==================================================
 * FAVORITO EN DETALLE
 * ==================================================
 */
function inicializarFavoritoDetalle(
    noticia
) {


    /*
    Mostramos el estado correcto
    cuando carga la noticia.
    */
    actualizarFavoritoDetalle(
        noticia.id
    );


    $("#btn-favorito-detalle")
        .off("click")
        .on(
            "click",
            function () {


                /*
                Si no existe sesión,
                abrimos el Login.
                */
                if (
                    !SessionService
                        .haySesionActiva()
                ) {


                    $("#btn-login")
                        .trigger(
                            "click"
                        );


                    return;

                }


                /*
                Agregamos o quitamos
                de favoritos.
                */
                const resultado =
                    FavoritosService
                        .alternar(
                            noticia.id
                        );


                /*
                Actualizamos visualmente
                el botón.
                */
                actualizarFavoritoDetalle(
                    noticia.id
                );


                /*
                Creamos la notificación.
                */
                if (
                    resultado.favorita
                ) {


                    NotificacionesService
                        .agregar(

                            "favorito",

                            "Noticia agregada a favoritos",

                            noticia.titulo

                        );

                }
                else {


                    NotificacionesService
                        .agregar(

                            "favorito",

                            "Noticia eliminada de favoritos",

                            noticia.titulo

                        );

                }


                /*
                Si el Navbar está disponible,
                actualizamos también
                sus notificaciones.
                */
                if (
                    typeof renderizarNotificacionesNavbar
                    === "function"
                ) {


                    renderizarNotificacionesNavbar();

                }

            }
        );

}