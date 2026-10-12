/**
 * ==================================================
 * NEXO NOTICIAS - MINI CRUD ADMINISTRATIVO
 * ==================================================
 */

function formatearFechaAdmin(fecha) {
    if (!fecha) return "—";
    return new Date(fecha + "T00:00:00").toLocaleDateString("es-CO", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

function etiquetaEstadoAdmin(estado) {
    return String(estado).toLowerCase() === "publicada" ? "Publicada" : "Borrador";
}

function claseEstadoAdmin(estado) {
    return String(estado).toLowerCase() === "publicada" ? "is-published" : "is-draft";
}

function crearFilaAdmin(noticia) {
    return `
        <tr data-noticia-id="${noticia.id}">
            <td class="admin-table__check"><input class="admin-row-check" type="checkbox" data-noticia-id="${noticia.id}" aria-label="Seleccionar ${noticia.titulo}"></td>
            <td><img class="admin-table__thumb" src="${noticia.imagen}" alt=""></td>
            <td>
                <strong class="admin-table__title">${noticia.titulo}</strong>
                <span class="admin-table__summary">${noticia.resumen}</span>
            </td>
            <td><span class="admin-table__category">${noticia.categoria}</span></td>
            <td>${formatearFechaAdmin(noticia.fecha)}</td>
            <td><span class="admin-status ${claseEstadoAdmin(noticia.estado)}">${etiquetaEstadoAdmin(noticia.estado)}</span></td>
            <td>
                <div class="admin-table__actions">
                    <a class="admin-icon-button is-edit" href="pages/editar-noticia.html?id=${noticia.id}" aria-label="Editar noticia">✎</a>
                    <button class="admin-icon-button is-delete btn-admin-delete" type="button" data-noticia-id="${noticia.id}" aria-label="Eliminar noticia">🗑</button>
                </div>
            </td>
        </tr>
    `;
}

function inicializarAdminNoticias() {
    const $pagina = $("#admin-news-page");
    if ($pagina.length === 0) return;

    let catalogo = [];
    let resultadosActuales = [];
    let paginaActual = 1;
    const porPagina = 6;

    function renderizarPaginacion() {
        const totalPaginas = Math.max(1, Math.ceil(resultadosActuales.length / porPagina));
        if (paginaActual > totalPaginas) paginaActual = totalPaginas;

        let html = `
            <button type="button" class="admin-page-button" data-page="${Math.max(1, paginaActual - 1)}" ${paginaActual === 1 ? "disabled" : ""}>‹</button>
        `;

        for (let pagina = 1; pagina <= totalPaginas; pagina += 1) {
            html += `
                <button
                    type="button"
                    class="admin-page-button ${pagina === paginaActual ? "is-active" : ""}"
                    data-page="${pagina}"
                >${pagina}</button>
            `;
        }

        html += `
            <button type="button" class="admin-page-button" data-page="${Math.min(totalPaginas, paginaActual + 1)}" ${paginaActual === totalPaginas ? "disabled" : ""}>›</button>
        `;

        $("#admin-pagination-pages").html(html);
    }

    function renderizarResultados() {
        const inicio = (paginaActual - 1) * porPagina;
        const visibles = resultadosActuales.slice(inicio, inicio + porPagina);

        $("#admin-results-count").text(
            `Resultados (${resultadosActuales.length} noticias)`
        );

        $("#admin-news-body").html(
            visibles.length
                ? visibles.map(crearFilaAdmin).join("")
                : `<tr><td colspan="7"><div class="admin-empty">No se encontraron noticias con los filtros seleccionados.</div></td></tr>`
        );

        $("#admin-select-all").prop("checked", false);
        renderizarPaginacion();
    }

    function aplicarFiltros() {
        const texto = $.trim($("#admin-search-text").val()).toLowerCase();
        const categoria = $("#admin-search-category").val();
        const desde = $("#admin-search-from").val();
        const hasta = $("#admin-search-to").val();
        const orden = $("#admin-sort").val();

        resultadosActuales = catalogo.filter(function (noticia) {
            const coincideTexto = !texto ||
                noticia.titulo.toLowerCase().includes(texto) ||
                noticia.resumen.toLowerCase().includes(texto);
            const coincideCategoria = !categoria || noticia.categoria === categoria;
            const coincideDesde = !desde || noticia.fecha >= desde;
            const coincideHasta = !hasta || noticia.fecha <= hasta;
            return coincideTexto && coincideCategoria && coincideDesde && coincideHasta;
        });

        resultadosActuales.sort(function (a, b) {
            if (orden === "antiguas") return new Date(a.fecha) - new Date(b.fecha);
            if (orden === "titulo") return a.titulo.localeCompare(b.titulo, "es");
            return new Date(b.fecha) - new Date(a.fecha);
        });

        paginaActual = 1;
        renderizarResultados();
    }

    function cargar() {
        NoticiasService.obtenerTodas().then(function (noticias) {
            catalogo = noticias;
            aplicarFiltros();
        });
    }

    $("#btn-admin-search").off("click").on("click", aplicarFiltros);
    $("#admin-sort").off("change").on("change", aplicarFiltros);

    $("#btn-admin-clear").off("click").on("click", function () {
        $("#admin-search-text").val("");
        $("#admin-search-category").val("");
        $("#admin-search-from").val("");
        $("#admin-search-to").val("");
        $("#admin-sort").val("recientes");
        aplicarFiltros();
    });

    $("#admin-news-body")
        .off("click", ".btn-admin-delete")
        .on("click", ".btn-admin-delete", function () {
            const id = Number($(this).data("noticia-id"));
            const noticia = catalogo.find(function (item) {
                return Number(item.id) === id;
            });
            if (!noticia) return;

            if (!window.confirm(`¿Eliminar la noticia "${noticia.titulo}"?`)) return;

            NoticiasService.eliminar(id);
            cargar();
        });

    $("#admin-select-all").off("change").on("change", function () {
        $("#admin-news-body .admin-row-check").prop("checked", this.checked);
    });

    $("#admin-bulk-apply").off("click").on("click", function () {
        const accion = $("#admin-bulk-action").val();
        if (accion !== "eliminar") return;

        const ids = $("#admin-news-body .admin-row-check:checked")
            .map(function () {
                return Number($(this).data("noticia-id"));
            })
            .get();

        if (ids.length === 0) {
            window.alert("Selecciona al menos una noticia.");
            return;
        }

        if (!window.confirm(`¿Eliminar ${ids.length} noticia(s) seleccionada(s)?`)) return;

        ids.forEach(function (id) {
            NoticiasService.eliminar(id);
        });

        $("#admin-bulk-action").val("");
        cargar();
    });

    $("#admin-pagination-pages")
        .off("click", ".admin-page-button")
        .on("click", ".admin-page-button", function () {
            if ($(this).prop("disabled")) return;
            paginaActual = Number($(this).data("page")) || 1;
            renderizarResultados();
        });

    $("#admin-search-text").off("keydown.admin").on("keydown.admin", function (evento) {
        if (evento.key === "Enter") {
            evento.preventDefault();
            aplicarFiltros();
        }
    });

    cargar();
}

function inicializarFormularioAdmin() {
    const $form = $("#admin-news-form");
    if ($form.length === 0) return;

    const modo = $form.data("mode");
    const parametros = new URLSearchParams(window.location.search);
    const idEditar = Number(parametros.get("id"));
    let imagenActual = "assets/images/home/noticia-1.png";
    let noticiaActual = null;

    function actualizarPreview(ruta) {
        imagenActual = ruta || "assets/images/home/noticia-1.png";
        $("#admin-image-preview").attr("src", imagenActual);
    }

    function cargarDatosEdicion() {
        if (modo !== "edit" || !idEditar) return;

        NoticiasService.obtenerPorId(idEditar).then(function (noticia) {
            if (!noticia) {
                window.location.href = "pages/admin-noticias.html";
                return;
            }

            noticiaActual = noticia;
            $("#admin-news-title").val(noticia.titulo);
            $("#admin-news-category").val(noticia.categoria);
            $("#admin-news-date").val(noticia.fecha);
            $("#admin-news-status").val(noticia.estado);
            $("#admin-news-summary").val(noticia.resumen);
            $("#admin-news-content").val(noticia.contenido);
            $("#admin-news-featured").prop("checked", noticia.destacada);
            actualizarPreview(noticia.imagen);
            $("#admin-delete-news").show();
        });
    }

    $("#admin-news-image").off("change").on("change", function () {
        const archivo = this.files && this.files[0];
        if (!archivo) return;

        if (!archivo.type.startsWith("image/")) {
            alert("Selecciona un archivo de imagen válido.");
            this.value = "";
            return;
        }

        const lector = new FileReader();
        lector.onload = function (evento) {
            actualizarPreview(evento.target.result);
        };
        lector.readAsDataURL(archivo);
    });

    $form.off("submit").on("submit", function (evento) {
        evento.preventDefault();

        const titulo = $.trim($("#admin-news-title").val());
        const resumen = $.trim($("#admin-news-summary").val());
        const contenido = $.trim($("#admin-news-content").val());

        if (!titulo || !resumen || !contenido) {
            $("#admin-form-message")
                .removeClass("is-success")
                .addClass("is-error")
                .text("Completa el título, el resumen y el contenido.");
            return;
        }

        const guardarConId = function (id) {
            NoticiasService.guardar({
                id: id,
                titulo: titulo,
                categoria: $("#admin-news-category").val(),
                fecha: $("#admin-news-date").val(),
                estado: $("#admin-news-status").val(),
                resumen: resumen,
                contenido: contenido,
                imagen: imagenActual,
                destacada: $("#admin-news-featured").is(":checked"),
                autor: noticiaActual ? noticiaActual.autor : "Nexo Noticias",
                tiempoLectura: noticiaActual ? noticiaActual.tiempoLectura : "4 min",
                cita: noticiaActual ? noticiaActual.cita : "La información verificada ayuda a tomar mejores decisiones.",
                autorCita: noticiaActual ? noticiaActual.autorCita : "Equipo editorial de Nexo Noticias"
            });

            $("#admin-form-message")
                .removeClass("is-error")
                .addClass("is-success")
                .text(modo === "edit" ? "Los cambios se guardaron correctamente." : "La noticia se creó correctamente.");

            setTimeout(function () {
                window.location.href = "pages/admin-noticias.html";
            }, 700);
        };

        if (modo === "edit") {
            guardarConId(idEditar);
        }
        else {
            NoticiasService.obtenerSiguienteId().then(guardarConId);
        }
    });

    $("#btn-admin-preview").off("click").on("click", function () {
        const titulo = $.trim($("#admin-news-title").val()) || "Título de la noticia";
        const resumen = $.trim($("#admin-news-summary").val()) || "Escribe un resumen para visualizarlo aquí.";
        $("#admin-preview-title").text(titulo);
        $("#admin-preview-summary").text(resumen);
        $("#admin-preview-image").attr("src", imagenActual);
        $("#admin-preview-modal").addClass("is-visible");
    });

    $("#btn-close-admin-preview").off("click").on("click", function () {
        $("#admin-preview-modal").removeClass("is-visible");
    });

    $("#admin-delete-news").off("click").on("click", function () {
        if (!idEditar || !noticiaActual) return;
        if (!window.confirm(`¿Eliminar la noticia "${noticiaActual.titulo}"?`)) return;
        NoticiasService.eliminar(idEditar);
        window.location.href = "pages/admin-noticias.html";
    });

    cargarDatosEdicion();
}
