/**
 * ==================================================
 * NEXO NOTICIAS - CATEGORÍAS
 * ==================================================
 * Muestra las cuatro categorías del proyecto y, al
 * seleccionar una, renderiza el listado correspondiente.
 * ==================================================
 */

function inicializarCategorias() {
    const $pagina = $("#categories-page");
    if ($pagina.length === 0) return;

    const parametros = new URLSearchParams(window.location.search);
    let categoriaActual = normalizarCategoriaSlug(parametros.get("categoria"));
    if (categoriaActual === "Todas") categoriaActual = "Tecnología";

    let catalogoCompleto = [];
    let resultados = [];
    let cantidadVisible = 6;

    const $grid = $("#category-news-grid");

    function conteoPorCategoria(categoria) {
        return catalogoCompleto.filter(function (noticia) {
            return noticia.estado === "publicada" && noticia.categoria === categoria;
        }).length;
    }

    function actualizarConteos() {
        $("[data-category-count]").each(function () {
            const categoria = normalizarCategoriaSlug($(this).data("category-count"));
            const cantidad = conteoPorCategoria(categoria);
            $(this).text(`${cantidad} ${cantidad === 1 ? "noticia" : "noticias"}`);
        });
    }

    function renderizarCategoria() {
        resultados = catalogoCompleto.filter(function (noticia) {
            return noticia.estado === "publicada" && noticia.categoria === categoriaActual;
        });

        const visibles = resultados.slice(0, cantidadVisible);

        $("#category-results-title").text(`Noticias de ${categoriaActual}`);
        $("#category-results-text").text(
            `Consulta las publicaciones más recientes de ${categoriaActual.toLowerCase()}.`
        );

        $(".category-tab").removeClass("is-active");
        $(`.category-tab[data-categoria="${slugCategoria(categoriaActual)}"]`)
            .addClass("is-active");

        $(".category-overview-card").removeClass("is-active");
        $(`.category-overview-card[data-categoria="${slugCategoria(categoriaActual)}"]`)
            .addClass("is-active");

        if (visibles.length) {
            $grid.html(visibles.map(crearTarjetaListado).join(""));
        }
        else {
            $grid.html(`
                <div class="page-empty-state">
                    <h2>No hay publicaciones en esta categoría</h2>
                </div>
            `);
        }

        $("#category-load-more").toggle(cantidadVisible < resultados.length);
        registrarFavoritosEnGrid($grid, resultados);

        document.title = `${categoriaActual} | Categorías | Nexo Noticias`;
    }

    function seleccionarCategoria(categoria, actualizarUrl = true) {
        categoriaActual = categoria;
        cantidadVisible = 6;
        renderizarCategoria();

        if (actualizarUrl) {
            const url = new URL(window.location.href);
            url.searchParams.set("categoria", slugCategoria(categoriaActual));
            history.replaceState({}, "", url);
        }
    }

    $(".category-tab")
        .off("click.nexoCategory")
        .on("click.nexoCategory", function () {
            seleccionarCategoria(normalizarCategoriaSlug($(this).data("categoria")));
            document.querySelector("#category-results").scrollIntoView({ behavior: "smooth" });
        });

    $(".category-overview-card")
        .off("click.nexoCategory")
        .on("click.nexoCategory", function () {
            seleccionarCategoria(normalizarCategoriaSlug($(this).data("categoria")));
            document.querySelector("#category-results").scrollIntoView({ behavior: "smooth" });
        });

    $("#category-load-more")
        .off("click.nexoCategory")
        .on("click.nexoCategory", function () {
            cantidadVisible += 3;
            renderizarCategoria();
        });

    NoticiasService.obtenerTodas()
        .then(function (noticias) {
            catalogoCompleto = noticias;
            actualizarConteos();
            seleccionarCategoria(categoriaActual, false);
        })
        .catch(function () {
            $grid.html(`
                <div class="page-empty-state">
                    <h2>No fue posible cargar las categorías</h2>
                    <p>Ejecuta el proyecto desde un servidor local.</p>
                </div>
            `);
        });
}
