/**
 * ==================================================
 * NEXO NOTICIAS
 * Archivo: notificaciones.service.js
 * ==================================================
 *
 * RESPONSABILIDAD:
 *
 * Gestionar las notificaciones del usuario
 * utilizando localStorage.
 *
 * ==================================================
 */

const NotificacionesService = {


    /*
    Clave utilizada en localStorage.
    */
    claveStorage:
        "nexo_notificaciones",


    /**
     * ==================================================
     * OBTENER TODAS
     * ==================================================
     */
    obtenerTodas: function () {


        const notificacionesGuardadas =
            localStorage.getItem(
                NotificacionesService.claveStorage
            );


        /*
        Si todavía no hay notificaciones,
        devolvemos un arreglo vacío.
        */
        if (!notificacionesGuardadas) {

            return [];

        }


        return JSON.parse(
            notificacionesGuardadas
        );

    },


    /**
     * ==================================================
     * GUARDAR TODAS
     * ==================================================
     */
    guardarTodas: function (
        notificaciones
    ) {


        localStorage.setItem(

            NotificacionesService.claveStorage,

            JSON.stringify(
                notificaciones
            )

        );

    },


    /**
     * ==================================================
     * AGREGAR NOTIFICACIÓN
     * ==================================================
     *
     * Recibe:
     *
     * tipo
     * titulo
     * descripcion
     */
    agregar: function (
        tipo,
        titulo,
        descripcion
    ) {


        const notificaciones =
            NotificacionesService.obtenerTodas();


        /*
        Creamos una nueva notificación.
        */
        const nuevaNotificacion = {


            /*
            Utilizamos Date.now()
            para crear un ID sencillo y único.
            */
            id:
                Date.now(),


            tipo:
                tipo,


            titulo:
                titulo,


            descripcion:
                descripcion,


            /*
            Guardamos la fecha exacta
            en que se creó.
            */
            fecha:
                new Date().toISOString()

        };


        /*
        unshift() agrega el elemento
        al INICIO del arreglo.

        Así la notificación más nueva
        aparecerá primero.
        */
        notificaciones.unshift(
            nuevaNotificacion
        );


        /*
        Guardamos nuevamente.
        */
        NotificacionesService.guardarTodas(
            notificaciones
        );


        return nuevaNotificacion;

    },


    /**
     * ==================================================
     * ELIMINAR NOTIFICACIÓN
     * ==================================================
     */
    eliminar: function (
        idNotificacion
    ) {


        const notificaciones =
            NotificacionesService.obtenerTodas();


        const id =
            Number(
                idNotificacion
            );


        /*
        Conservamos todas excepto
        la seleccionada.
        */
        const nuevasNotificaciones =
            notificaciones.filter(

                function (notificacion) {

                    return (
                        notificacion.id !== id
                    );

                }

            );


        /*
        Si no cambió la cantidad,
        significa que no se encontró.
        */
        if (
            nuevasNotificaciones.length
            ===
            notificaciones.length
        ) {

            return false;

        }


        NotificacionesService.guardarTodas(
            nuevasNotificaciones
        );


        return true;

    },


    /**
     * ==================================================
     * CONTAR NOTIFICACIONES
     * ==================================================
     */
    contar: function () {


        return NotificacionesService
            .obtenerTodas()
            .length;

    },


    /**
     * ==================================================
     * VACIAR NOTIFICACIONES
     * ==================================================
     *
     * La utilizaremos principalmente
     * durante las pruebas.
     */
    vaciar: function () {


        localStorage.removeItem(
            NotificacionesService.claveStorage
        );

    }

};