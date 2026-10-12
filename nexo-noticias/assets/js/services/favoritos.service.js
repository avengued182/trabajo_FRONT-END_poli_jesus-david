/**
 * ==================================================
 * NEXO NOTICIAS
 * Archivo: favoritos.service.js
 * ==================================================
 *
 * RESPONSABILIDAD:
 *
 * Gestionar las noticias favoritas utilizando
 * localStorage.
 *
 * Por ahora guardaremos únicamente los ID
 * de las noticias.
 *
 * Ejemplo:
 *
 * [1, 3, 5]
 *
 * ==================================================
 */

const FavoritosService = {


    /*
    Nombre de la clave utilizada
    dentro de localStorage.
    */
    claveStorage:
        "nexo_favoritos",


    /**
     * ==================================================
     * OBTENER TODOS LOS FAVORITOS
     * ==================================================
     */
    obtenerTodos: function () {


        /*
        Buscamos la información almacenada.
        */
        const favoritosGuardados =
            localStorage.getItem(
                FavoritosService.claveStorage
            );


        /*
        Si todavía no existe información,
        devolvemos un arreglo vacío.
        */
        if (!favoritosGuardados) {

            return [];

        }


        /*
        localStorage almacena texto.

        JSON.parse convierte ese texto
        nuevamente en un arreglo.
        */
        return JSON.parse(
            favoritosGuardados
        );

    },


    /**
     * ==================================================
     * GUARDAR ARREGLO
     * ==================================================
     *
     * Esta función interna guarda
     * el arreglo completo de favoritos.
     */
    guardarTodos: function (favoritos) {


        localStorage.setItem(

            FavoritosService.claveStorage,

            JSON.stringify(
                favoritos
            )

        );

    },


    /**
     * ==================================================
     * COMPROBAR SI UNA NOTICIA ES FAVORITA
     * ==================================================
     */
    esFavorita: function (idNoticia) {


        const favoritos =
            FavoritosService.obtenerTodos();


        /*
        Algunos ID podrían llegar como texto,
        por eso utilizamos Number().
        */
        const id =
            Number(idNoticia);


        return favoritos.includes(
            id
        );

    },


    /**
     * ==================================================
     * AGREGAR FAVORITO
     * ==================================================
     */
    agregar: function (idNoticia) {


        const favoritos =
            FavoritosService.obtenerTodos();


        const id =
            Number(idNoticia);


        /*
        Evitamos guardar el mismo ID
        dos veces.
        */
        if (
            favoritos.includes(id)
        ) {

            return false;

        }


        /*
        Agregamos el ID.
        */
        favoritos.push(
            id
        );


        /*
        Guardamos nuevamente el arreglo.
        */
        FavoritosService.guardarTodos(
            favoritos
        );


        return true;

    },


    /**
     * ==================================================
     * QUITAR FAVORITO
     * ==================================================
     */
    quitar: function (idNoticia) {


        const favoritos =
            FavoritosService.obtenerTodos();


        const id =
            Number(idNoticia);


        /*
        Conservamos todos excepto
        la noticia que queremos quitar.
        */
        const nuevosFavoritos =
            favoritos.filter(

                function (idFavorito) {

                    return (
                        idFavorito !== id
                    );

                }

            );


        /*
        Si ambos arreglos tienen el mismo
        tamaño significa que el ID no existía.
        */
        if (
            nuevosFavoritos.length
            ===
            favoritos.length
        ) {

            return false;

        }


        FavoritosService.guardarTodos(
            nuevosFavoritos
        );


        return true;

    },


    /**
     * ==================================================
     * ALTERNAR FAVORITO
     * ==================================================
     *
     * Esta será muy útil para el corazón.
     *
     * Si ya está guardado:
     *     lo elimina.
     *
     * Si no está guardado:
     *     lo agrega.
     */
    alternar: function (idNoticia) {


        const id =
            Number(idNoticia);


        if (
            FavoritosService.esFavorita(id)
        ) {


            FavoritosService.quitar(
                id
            );


            return {
                favorita: false,
                accion: "eliminada"
            };

        }


        FavoritosService.agregar(
            id
        );


        return {
            favorita: true,
            accion: "agregada"
        };

    },


    /**
     * ==================================================
     * VACIAR FAVORITOS
     * ==================================================
     *
     * Por ahora será útil para pruebas.
     */
    vaciar: function () {


        localStorage.removeItem(
            FavoritosService.claveStorage
        );

    }

};