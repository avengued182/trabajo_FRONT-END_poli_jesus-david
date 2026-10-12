/**
 * ==================================================
 * NEXO NOTICIAS
 * Archivo: session.service.js
 * ==================================================
 *
 * RESPONSABILIDAD:
 *
 * Administrar el estado de sesión del usuario
 * dentro del navegador.
 *
 * IMPORTANTE:
 *
 * Este proyecto no tiene Back End.
 * Por eso NO realizamos autenticación real.
 *
 * sessionStorage solamente será utilizado
 * para simular el estado de una sesión.
 *
 * NUNCA almacenamos la contraseña.
 * ==================================================
 */


const SessionService = {

    /*
    Nombre de la clave utilizada
    dentro de sessionStorage.
    */
    CLAVE_SESION: "nexoNoticiasSesion",


    /**
     * Crea una sesión simulada.
     *
     * @param {string} email
     */
    iniciarSesion(email) {

        /*
        Creamos un objeto sencillo
        con datos no sensibles.
        */
        const sesion = {

            email: email,

            /*
            Utilizamos temporalmente la parte
            anterior al @ como nombre.
            */
            nombre:
                email.split("@")[0],

            /*
            Para el prototipo, cualquier correo que comience
            por "admin" habilita la navegación administrativa.
            */
            rol:
                email.toLowerCase().startsWith("admin")
                    ? "admin"
                    : "usuario"

        };


        /*
        sessionStorage solamente almacena texto.

        JSON.stringify convierte el objeto
        JavaScript en una cadena JSON.
        */
        sessionStorage.setItem(
            this.CLAVE_SESION,
            JSON.stringify(sesion)
        );

    },


    /**
     * Obtiene los datos de la sesión.
     *
     * @returns {Object|null}
     */
    obtenerSesion() {

        const datos =
            sessionStorage.getItem(
                this.CLAVE_SESION
            );


        /*
        Si no existe información,
        retornamos null.
        */
        if (!datos) {

            return null;

        }


        /*
        Convertimos nuevamente el JSON
        en un objeto JavaScript.
        */
        return JSON.parse(datos);

    },


    /**
     * Determina si existe una sesión activa.
     *
     * @returns {boolean}
     */
    haySesionActiva() {

        return this.obtenerSesion() !== null;

    },


    /**
     * Elimina la sesión actual.
     */
    cerrarSesion() {

        sessionStorage.removeItem(
            this.CLAVE_SESION
        );

    }

};