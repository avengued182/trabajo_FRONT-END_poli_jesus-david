/**
 * ==================================================
 * NEXO NOTICIAS
 * Archivo: noticias.service.js
 * ==================================================
 * Lee el catálogo base desde JSON y combina los cambios
 * locales del mini CRUD. El JSON nunca se modifica; las
 * altas, ediciones y eliminaciones del prototipo se guardan
 * en localStorage.
 * ==================================================
 */

const NoticiasService = {

    CLAVE_PERSONALIZADAS: "nexo_noticias_personalizadas",
    CLAVE_ELIMINADAS: "nexo_noticias_eliminadas",

    obtenerPersonalizadas: function () {
        try {
            return JSON.parse(
                localStorage.getItem(this.CLAVE_PERSONALIZADAS) || "[]"
            );
        }
        catch (error) {
            return [];
        }
    },

    guardarPersonalizadas: function (noticias) {
        localStorage.setItem(
            this.CLAVE_PERSONALIZADAS,
            JSON.stringify(noticias)
        );
    },

    obtenerEliminadas: function () {
        try {
            return JSON.parse(
                localStorage.getItem(this.CLAVE_ELIMINADAS) || "[]"
            ).map(Number);
        }
        catch (error) {
            return [];
        }
    },

    guardarEliminadas: function (ids) {
        localStorage.setItem(
            this.CLAVE_ELIMINADAS,
            JSON.stringify(ids.map(Number))
        );
    },

    /**
     * Devuelve el catálogo efectivo de la aplicación.
     */
    obtenerTodas: function (ruta = "data/noticias.json") {
        return $.getJSON(ruta).then(function (datosBase) {

            const eliminadas = NoticiasService.obtenerEliminadas();
            const personalizadas = NoticiasService.obtenerPersonalizadas();

            const mapa = new Map();

            datosBase.forEach(function (noticia) {
                if (!eliminadas.includes(Number(noticia.id))) {
                    mapa.set(Number(noticia.id), noticia);
                }
            });

            /*
             * Las noticias guardadas localmente reemplazan una noticia base
             * con el mismo ID o agregan una nueva.
             */
            personalizadas.forEach(function (noticia) {
                if (!eliminadas.includes(Number(noticia.id))) {
                    mapa.set(Number(noticia.id), noticia);
                }
            });

            return Array.from(mapa.values())
                .map(function (datosNoticia) {
                    return new Noticia(datosNoticia);
                })
                .sort(function (a, b) {
                    return new Date(b.fecha) - new Date(a.fecha);
                });
        });
    },

    obtenerDestacadas: function (ruta = "data/noticias.json") {
        return this.obtenerTodas(ruta).then(function (noticias) {
            return noticias.filter(function (noticia) {
                return noticia.destacada === true && noticia.estado === "publicada";
            });
        });
    },

    obtenerPorId: function (id, ruta = "data/noticias.json") {
        return this.obtenerTodas(ruta).then(function (noticias) {
            return noticias.find(function (noticia) {
                return Number(noticia.id) === Number(id);
            });
        });
    },

    obtenerPorCategoria: function (categoria, ruta = "data/noticias.json") {
        const categoriaNormalizada = String(categoria || "").toLowerCase();

        return this.obtenerTodas(ruta).then(function (noticias) {
            return noticias.filter(function (noticia) {
                return (
                    noticia.estado === "publicada"
                    &&
                    String(noticia.categoria).toLowerCase() === categoriaNormalizada
                );
            });
        });
    },

    /**
     * Crea o actualiza una noticia en el almacenamiento local.
     */
    guardar: function (datos) {
        const personalizadas = this.obtenerPersonalizadas();
        const eliminadas = this.obtenerEliminadas();

        const noticia = {
            id: Number(datos.id),
            titulo: String(datos.titulo || "").trim(),
            categoria: String(datos.categoria || "Tecnología"),
            resumen: String(datos.resumen || "").trim(),
            contenido: String(datos.contenido || "").trim(),
            cita: String(datos.cita || "La información de calidad conecta a las personas con su entorno."),
            autorCita: String(datos.autorCita || "Equipo editorial de Nexo Noticias"),
            imagen: String(datos.imagen || "assets/images/home/noticia-1.png"),
            autor: String(datos.autor || "Nexo Noticias"),
            fecha: String(datos.fecha || new Date().toISOString().slice(0, 10)),
            tiempoLectura: String(datos.tiempoLectura || "4 min"),
            destacada: Boolean(datos.destacada),
            estado: String(datos.estado || "publicada").toLowerCase()
        };

        const indice = personalizadas.findIndex(function (item) {
            return Number(item.id) === Number(noticia.id);
        });

        if (indice >= 0) {
            personalizadas[indice] = noticia;
        }
        else {
            personalizadas.push(noticia);
        }

        this.guardarPersonalizadas(personalizadas);

        /* Si una noticia fue eliminada y luego se guarda otra vez, la restauramos. */
        this.guardarEliminadas(
            eliminadas.filter(function (id) {
                return Number(id) !== Number(noticia.id);
            })
        );

        return noticia;
    },

    obtenerSiguienteId: function (ruta = "data/noticias.json") {
        return this.obtenerTodas(ruta).then(function (noticias) {
            const maximo = noticias.reduce(function (max, noticia) {
                return Math.max(max, Number(noticia.id) || 0);
            }, 0);
            return maximo + 1;
        });
    },

    eliminar: function (idNoticia) {
        const id = Number(idNoticia);
        const personalizadas = this.obtenerPersonalizadas();
        const eliminadas = this.obtenerEliminadas();

        this.guardarPersonalizadas(
            personalizadas.filter(function (item) {
                return Number(item.id) !== id;
            })
        );

        if (!eliminadas.includes(id)) {
            eliminadas.push(id);
            this.guardarEliminadas(eliminadas);
        }

        /* Quitamos también el ID de favoritos para no dejar referencias huérfanas. */
        if (typeof FavoritosService !== "undefined") {
            FavoritosService.quitar(id);
        }

        return true;
    },

    restablecerCambiosLocales: function () {
        localStorage.removeItem(this.CLAVE_PERSONALIZADAS);
        localStorage.removeItem(this.CLAVE_ELIMINADAS);
    }
};
