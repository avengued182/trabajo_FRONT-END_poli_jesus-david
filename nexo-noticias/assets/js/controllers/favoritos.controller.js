/** NEXO NOTICIAS - FAVORITOS */
function crearTarjetaFavorito(noticia) {
    return `
        <article class="favorite-card" data-noticia-id="${noticia.id}">
            <img class="favorite-card__image" src="${noticia.imagen}" alt="${noticia.titulo}">
            <div class="favorite-card__content">
                <span class="favorite-card__category">${noticia.categoria}</span>
                <h3 class="favorite-card__title">${noticia.titulo}</h3>
                <p class="favorite-card__summary">${noticia.resumen}</p>
                <div class="favorite-card__actions">
                    <a href="pages/detalle-noticia.html?id=${noticia.id}" class="favorite-card__more">
                        Ver más <span>→</span>
                    </a>
                    <button type="button" class="favorite-card__remove" data-noticia-id="${noticia.id}" aria-label="Quitar de favoritos">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 20.5C12 20.5 4 16 4 9.5C4 6.5 6 4.5 8.7 4.5C10.3 4.5 11.4 5.3 12 6.3C12.6 5.3 13.7 4.5 15.3 4.5C18 4.5 20 6.5 20 9.5C20 16 12 20.5 12 20.5Z" fill="currentColor"/>
                        </svg>
                    </button>
                </div>
            </div>
        </article>
    `;
}

function inicializarFavoritos() {
    const $pagina = $("#favorites-page");
    if ($pagina.length === 0) return;

    if (!SessionService.haySesionActiva()) {
        $("#favorites-count").text("Inicia sesión para usar tu lista personal");
        $("#favorites-grid").html(`
            <div class="favorites-empty">
                <div class="favorites-empty__icon">♡</div>
                <h2>Inicia sesión para ver tus favoritos</h2>
                <p>La lista de favoritos forma parte de las funciones del usuario autenticado.</p>
                <button id="favorites-login-button" class="page-primary-button" type="button">Iniciar sesión</button>
            </div>
        `);

        $("#favorites-login-button").off("click").on("click", function () {
            $("#btn-login").trigger("click");
        });
        return;
    }

    let catalogo = [];

    function renderizar() {
        const ids = FavoritosService.obtenerTodos().map(Number);
        const favoritas = catalogo.filter(function (noticia) {
            return ids.includes(Number(noticia.id)) && noticia.estado === "publicada";
        });

        $("#favorites-count").text(
            `${favoritas.length} ${favoritas.length === 1 ? "noticia guardada" : "noticias guardadas"}`
        );

        if (favoritas.length === 0) {
            $("#favorites-grid").html(`
                <div class="favorites-empty">
                    <div class="favorites-empty__icon">♡</div>
                    <h2>Aún no tienes noticias favoritas</h2>
                    <p>Guarda contenido desde el Home, el listado o el detalle para consultarlo después.</p>
                    <a href="pages/noticias.html" class="page-primary-button">Explorar noticias →</a>
                </div>
            `);
            return;
        }

        $("#favorites-grid").html(
            favoritas.map(crearTarjetaFavorito).join("")
        );
    }

    NoticiasService.obtenerTodas().then(function (noticias) {
        catalogo = noticias;
        renderizar();
    });

    $("#favorites-grid")
        .off("click", ".favorite-card__remove")
        .on("click", ".favorite-card__remove", function () {
            const id = Number($(this).data("noticia-id"));
            const noticia = catalogo.find(function (item) {
                return Number(item.id) === id;
            });

            FavoritosService.quitar(id);

            if (noticia) {
                NotificacionesService.agregar(
                    "favorito",
                    "Noticia eliminada de favoritos",
                    noticia.titulo
                );
            }

            renderizar();

            if (typeof renderizarNotificacionesNavbar === "function") {
                renderizarNotificacionesNavbar();
            }
        });
}
