/**
 * ==================================================
 * NEXO NOTICIAS - LISTADO GENERAL DE NOTICIAS
 * ==================================================
 * Renderiza el catálogo completo, permite filtrar por
 * categoría y reutiliza la funcionalidad de favoritos.
 * ==================================================
 */

function slugCategoria(categoria) {
    return String(categoria || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

function normalizarCategoriaSlug(valor) {
    const mapa = {
        educacion: "Educación",
        tecnologia: "Tecnología",
        turismo: "Turismo",
        comercio: "Comercio"
    };

    if (!valor || String(valor).toLowerCase() === "todas") {
        return "Todas";
    }

    return mapa[slugCategoria(valor)] || "Todas";
}

function crearTarjetaListado(noticia) {
    const esFavorita = FavoritosService.esFavorita(noticia.id);

    return `
        <article class="news-list-card" data-noticia-id="${noticia.id}">
            <div class="news-list-card__image-wrap">
                <img
                    class="news-list-card__image"
                    src="${noticia.imagen}"
                    alt="${noticia.titulo}"
                >
                <span class="news-list-card__category">${noticia.categoria}</span>
            </div>

            <div class="news-list-card__body">
                <h3 class="news-list-card__title">${noticia.titulo}</h3>
                <p class="news-list-card__summary">${noticia.resumen}</p>

                <div class="news-list-card__actions">
                    <a
                        class="news-list-card__more"
                        href="pages/detalle-noticia.html?id=${noticia.id}"
                    >
                        Ver más <span aria-hidden="true">→</span>
                    </a>

                    <button
                        type="button"
                        class="news-list-card__favorite ${esFavorita ? "is-favorite" : ""}"
                        data-noticia-id="${noticia.id}"
                        aria-label="${esFavorita ? "Quitar de favoritos" : "Agregar a favoritos"}"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                d="M12 20.5C12 20.5 4 16 4 9.5C4 6.5 6 4.5 8.7 4.5C10.3 4.5 11.4 5.3 12 6.3C12.6 5.3 13.7 4.5 15.3 4.5C18 4.5 20 6.5 20 9.5C20 16 12 20.5 12 20.5Z"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.8"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </article>
    `;
}

function actualizarBotonFavoritoListado($boton, activa) {
    $boton.toggleClass("is-favorite", activa);
    $boton.attr(
        "aria-label",
        activa ? "Quitar de favoritos" : "Agregar a favoritos"
    );
}

function registrarFavoritosEnGrid($grid, catalogoActual) {
    $grid
        .off("click.nexoFavorite", ".news-list-card__favorite")
        .on("click.nexoFavorite", ".news-list-card__favorite", function () {
            if (!SessionService.haySesionActiva()) {
                $("#btn-login").trigger("click");
                return;
            }

            const $boton = $(this);
            const id = Number($boton.data("noticia-id"));
            const noticia = catalogoActual.find(function (item) {
                return Number(item.id) === id;
            });

            const resultado = FavoritosService.alternar(id);
            actualizarBotonFavoritoListado($boton, resultado.favorita);

            if (noticia) {
                NotificacionesService.agregar(
                    "favorito",
                    resultado.favorita
                        ? "Noticia agregada a favoritos"
                        : "Noticia eliminada de favoritos",
                    noticia.titulo
                );
            }

            if (typeof renderizarNotificacionesNavbar === "function") {
                renderizarNotificacionesNavbar();
            }
        });
}

function inicializarNoticias() {
    const $pagina = $("#news-list-page");
    if ($pagina.length === 0) return;

    const parametros = new URLSearchParams(window.location.search);
    let categoriaActual = normalizarCategoriaSlug(parametros.get("categoria"));
    let catalogoCompleto = [];
    let resultados = [];
    let cantidadVisible = 6;

    const $grid = $("#news-list-grid");

    function filtrarCatalogo() {
        resultados = catalogoCompleto.filter(function (noticia) {
            if (noticia.estado !== "publicada") return false;
            if (categoriaActual === "Todas") return true;
            return noticia.categoria === categoriaActual;
        });
    }

    function actualizarEncabezado() {
        const esTodas = categoriaActual === "Todas";

        $("#news-list-title").text(
            esTodas ? "Todas las noticias" : `Noticias de ${categoriaActual}`
        );

        $("#news-list-subtitle").text(
            esTodas
                ? "Explora las publicaciones más recientes de Nexo Noticias y filtra por la temática que te interese."
                : `Mantente al día con las últimas publicaciones de ${categoriaActual.toLowerCase()}.`
        );

        $("#news-list-breadcrumb-category").text(
            esTodas ? "Todas" : categoriaActual
        );

        document.title = esTodas
            ? "Noticias | Nexo Noticias"
            : `${categoriaActual} | Nexo Noticias`;

        $(".category-tab").removeClass("is-active");
        $(`.category-tab[data-categoria="${esTodas ? "todas" : slugCategoria(categoriaActual)}"]`)
            .addClass("is-active");
    }

    function renderizar() {
        const visibles = resultados.slice(0, cantidadVisible);

        if (visibles.length === 0) {
            $grid.html(`
                <div class="page-empty-state">
                    <h2>No hay noticias disponibles</h2>
                    <p>Prueba con otra categoría.</p>
                </div>
            `);
        }
        else {
            $grid.html(visibles.map(crearTarjetaListado).join(""));
        }

        $("#news-list-count").text(
            `${resultados.length} ${resultados.length === 1 ? "noticia" : "noticias"}`
        );

        $("#btn-load-more").toggle(cantidadVisible < resultados.length);
        registrarFavoritosEnGrid($grid, resultados);
    }

    function cambiarCategoria(categoria, actualizarUrl = true) {
        categoriaActual = categoria;
        cantidadVisible = 6;
        filtrarCatalogo();
        actualizarEncabezado();
        renderizar();

        if (actualizarUrl) {
            const url = new URL(window.location.href);
            if (categoriaActual === "Todas") {
                url.searchParams.delete("categoria");
            }
            else {
                url.searchParams.set("categoria", slugCategoria(categoriaActual));
            }
            history.replaceState({}, "", url);
        }
    }

    $(".category-tab")
        .off("click.nexoNews")
        .on("click.nexoNews", function () {
            cambiarCategoria(normalizarCategoriaSlug($(this).data("categoria")));
        });

    $("#btn-load-more")
        .off("click.nexoNews")
        .on("click.nexoNews", function () {
            cantidadVisible += 3;
            renderizar();
        });

    NoticiasService.obtenerTodas()
        .then(function (noticias) {
            catalogoCompleto = noticias;
            cambiarCategoria(categoriaActual, false);
        })
        .catch(function () {
            $grid.html(`
                <div class="page-empty-state">
                    <h2>No fue posible cargar las noticias</h2>
                    <p>Abre el proyecto desde un servidor local, por ejemplo Live Server.</p>
                </div>
            `);
        });
}
