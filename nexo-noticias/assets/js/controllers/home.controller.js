/**
 * ==================================================
 * NEXO NOTICIAS
 * Archivo: home.controller.js
 * ==================================================
 *
 * RESPONSABILIDAD:
 *
 * Controlar el contenido dinámico
 * de la página Home.
 *
 * Actualmente:
 *
 * - Obtiene las noticias destacadas.
 * - Genera sus tarjetas.
 * - Las inserta en el Home.
 *
 * ==================================================
 */


/**
 * ==================================================
 * CREAR TARJETA DE NOTICIA DESTACADA
 * ==================================================
 *
 * Recibe una noticia y devuelve
 * el HTML correspondiente a una tarjeta.
 */
function crearTarjetaDestacada(noticia) {

    const esFavorita =
    FavoritosService.esFavorita(
        noticia.id
    );

    const claseFavorito =
    esFavorita
        ? "is-favorite"
        : "";


    return `

        <article
            class="featured-card"
            data-noticia-id="${noticia.id}"
        >


            <!-- ==============================
                 IMAGEN
            =============================== -->

            <div class="featured-card__image-container">


                <img
                    class="featured-card__image"
                    src="${noticia.imagen}"
                    alt="${noticia.titulo}"
                >


                <span class="featured-card__category">

                    ${noticia.categoria}

                </span>

            </div>


            <!-- ==============================
                 CONTENIDO
            =============================== -->

            <div class="featured-card__content">


                <!-- TÍTULO -->

                <h3 class="featured-card__title">

                    ${noticia.titulo}

                </h3>


                <!-- DESCRIPCIÓN -->

                <p class="featured-card__description">

                    ${noticia.resumen}

                </p>


                <!-- ==========================
                     ACCIONES
                =========================== -->

                <div class="featured-card__actions">


                    <!-- VER MÁS -->

                    <a
                        href="pages/detalle-noticia.html?id=${noticia.id}"
                        class="featured-card__more"
                        data-noticia-id="${noticia.id}"
                    >

                        Ver más


                        <span aria-hidden="true">

                            <svg viewBox="0 0 24 24">

                                <path
                                    d="
                                    M5 12H19
                                    M14 7L19 12L14 17
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


                    <!-- FAVORITO -->

                    <button
                        type="button"
                        class="featured-card__favorite ${claseFavorito}"
                        data-noticia-id="${noticia.id}"
                        aria-label="${
                            esFavorita
                                ? "Quitar noticia de favoritos"
                                : "Agregar noticia a favoritos"
                        }"
                    >

                        <svg viewBox="0 0 24 24">

                            <path
                                d="
                                M12 20.5
                                C12 20.5 4 16 4 9.5
                                C4 6.5 6 4.5 8.7 4.5
                                C10.3 4.5 11.4 5.3 12 6.3
                                C12.6 5.3 13.7 4.5 15.3 4.5
                                C18 4.5 20 6.5 20 9.5
                                C20 16 12 20.5 12 20.5Z
                                "
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.8"
                                stroke-linejoin="round"
                            />

                        </svg>

                    </button>

                </div>

            </div>

        </article>

    `;

}

/**
 * ==================================================
 * ACTUALIZAR ESTADO VISUAL DE UN FAVORITO
 * ==================================================
 */
function actualizarCorazonHome(
    $boton,
    esFavorita
) {


    /*
    Si la noticia está guardada.
    */
    if (esFavorita) {


        $boton.addClass(
            "is-favorite"
        );


        $boton.attr(
            "aria-label",
            "Quitar noticia de favoritos"
        );


        return;

    }


    /*
    Si la noticia NO está guardada.
    */
    $boton.removeClass(
        "is-favorite"
    );


    $boton.attr(
        "aria-label",
        "Agregar noticia a favoritos"
    );

}

/**
 * ==================================================
 * RESTAURAR FAVORITOS DEL HOME
 * ==================================================
 *
 * Revisa todos los corazones después
 * de generar las tarjetas.
 */
function restaurarFavoritosHome() {


    $(".featured-card__favorite")
        .each(
            function () {


                const $boton =
                    $(this);


                const idNoticia =
                    Number(
                        $boton.data(
                            "noticia-id"
                        )
                    );


                const esFavorita =
                    FavoritosService
                        .esFavorita(
                            idNoticia
                        );


                actualizarCorazonHome(
                    $boton,
                    esFavorita
                );

            }
        );

}  

/**
 * ==================================================
 * EVENTOS DE FAVORITOS DEL HOME
 * ==================================================
 */
function inicializarFavoritosHome() {


    /*
    Utilizamos delegación de eventos porque
    las tarjetas se crean dinámicamente.
    */
    $("#featured-news-grid")

        .off(
            "click",
            ".featured-card__favorite"
        )

        .on(
            "click",
            ".featured-card__favorite",

            function () {


                const $boton =
                    $(this);


                /*
                ==================================================
                COMPROBAR SESIÓN
                ==================================================

                Favoritos pertenece a las funciones
                del usuario autenticado.
                */
                if (
                    !SessionService.haySesionActiva()
                ) {


                    /*
                    Abrimos el mismo Login
                    que ya utiliza el Navbar.
                    */
                    $("#btn-login")
                        .trigger(
                            "click"
                        );


                    return;

                }


                /*
                ==================================================
                OBTENER ID
                ==================================================
                */

                const idNoticia =
                    Number(
                        $boton.data(
                            "noticia-id"
                        )
                    );


                /*
                Obtenemos el título directamente
                desde la tarjeta.
                */
                const tituloNoticia =
                    $boton
                        .closest(
                            ".featured-card"
                        )
                        .find(
                            ".featured-card__title"
                        )
                        .text()
                        .trim();


                /*
                ==================================================
                ALTERNAR FAVORITO
                ==================================================
                */

                const resultado =
                    FavoritosService
                        .alternar(
                            idNoticia
                        );


                /*
                Actualizamos inmediatamente
                el corazón.
                */
                actualizarCorazonHome(
                    $boton,
                    resultado.favorita
                );


                /*
                ==================================================
                CREAR NOTIFICACIÓN
                ==================================================
                */

                if (
                    resultado.favorita
                ) {


                    NotificacionesService
                        .agregar(

                            "favorito",

                            "Noticia agregada a favoritos",

                            tituloNoticia

                        );

                }
                else {

                    NotificacionesService
                        .agregar(

                            "favorito",

                            "Noticia eliminada de favoritos",

                            tituloNoticia

                        );

                }


                if (
                    typeof renderizarNotificacionesNavbar
                    === "function"
                ) {

                    renderizarNotificacionesNavbar();

                }

            }
        );

} 


/**
 * ==================================================
 * MOSTRAR NOTICIAS DESTACADAS
 * ==================================================
 */
function cargarNoticiasDestacadas() {


    /*
    Buscamos el contenedor donde
    deben aparecer las tarjetas.
    */
    const $contenedor =
        $("#featured-news-grid");


    /*
    Si este elemento no existe,
    significa que no estamos en el Home.

    En ese caso terminamos la función.
    */
    if ($contenedor.length === 0) {

        return;

    }


    /*
    Pedimos al servicio solamente
    las noticias destacadas.
    */
    NoticiasService
        .obtenerDestacadas()

        .then(

            function (noticias) {


                /*
                Aquí iremos acumulando
                el HTML de las tarjetas.
                */
                let tarjetasHTML = "";


                /*
                Recorremos las noticias
                destacadas.
                */
                noticias.forEach(

                    function (noticia) {


                        /*
                        Creamos una tarjeta
                        para cada noticia.
                        */
                        tarjetasHTML +=
                            crearTarjetaDestacada(
                                noticia
                            );

                    }

                );


                /*
                Insertamos todas las tarjetas
                dentro del grid.
                */
                $contenedor.html(
                    tarjetasHTML
                );

                /*
                ==================================================
                INICIALIZAR FAVORITOS
                ==================================================
                */

                restaurarFavoritosHome();

                inicializarFavoritosHome();

                

            },


            function (error) {


                console.error(
                    "No fue posible cargar las noticias destacadas.",
                    error
                );

            }

        );

}


/**
 * ==================================================
 * INICIALIZAR HOME
 * ==================================================
 */
function inicializarHome() {


    cargarNoticiasDestacadas();

}