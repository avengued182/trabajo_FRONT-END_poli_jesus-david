/**
 * ==================================================
 * NEXO NOTICIAS
 * Archivo: register.controller.js
 * ==================================================
 *
 * RESPONSABILIDAD:
 *
 * Controlar las interacciones del formulario
 * de registro.
 *
 * ==================================================
 */

function inicializarRegister() {

    /*
    ==========================================
    REFERENCIAS PRINCIPALES
    ==========================================
    */

    const $registerModal =
        $("#register-modal");

    const $loginModal =
        $("#login-modal");


    /*
    ==========================================
    CERRAR REGISTRO
    ==========================================
    */

    $("#btn-cerrar-registro")
        .on("click", function () {

            $registerModal.hide();

        });


    /*
    ==========================================
    EVITAR CIERRE AL HACER CLIC DENTRO
    ==========================================
    */

    $registerModal.on("click", function (evento) {

        evento.stopPropagation();

    });


    /*
    ==========================================
    VOLVER A INICIAR SESIÓN
    ==========================================
    */

    $("#btn-volver-login")
        .on("click", function () {

            /*
            Ocultamos Registro.
            */
            $registerModal.hide();


            /*
            Mostramos Login.
            */
            $loginModal.show();


            /*
            Actualizamos el atributo accesible
            del botón principal.
            */
            $("#btn-login").attr(
                "aria-expanded",
                "true"
            );

        });


    /*
    ==========================================
    ENVÍO DEL FORMULARIO
    ==========================================
    */

    $("#form-register")
        .on("submit", function (evento) {

            /*
            Evitamos la recarga automática.
            */
            evento.preventDefault();


            /*
            Recuperamos los valores.
            */
            const email =
                $("#register-email")
                    .val()
                    .trim();


            const password =
                $("#register-password")
                    .val();


            const passwordConfirm =
                $("#register-password-confirm")
                    .val();


            /*
            ======================================
            VALIDACIÓN 1
            CAMPOS VACÍOS
            ======================================
            */

            if (
                email === "" ||
                password === "" ||
                passwordConfirm === ""
            ) {

                mostrarMensajeRegistro(
                    "Completa todos los campos."
                );

                return;
            }


            /*
            ======================================
            VALIDACIÓN 2
            CORREO
            ======================================
            */

            const emailValido =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailValido.test(email)) {

                mostrarMensajeRegistro(
                    "Ingresa un correo electrónico válido."
                );

                return;
            }


            /*
            ======================================
            VALIDACIÓN 3
            CONTRASEÑAS IGUALES
            ======================================
            */

            if (password !== passwordConfirm) {

                mostrarMensajeRegistro(
                    "Las contraseñas no coinciden."
                );

                return;
            }


            /*
            ======================================
            VALIDACIÓN 4
            LONGITUD MÍNIMA
            ======================================
            */

            if (password.length < 6) {

                mostrarMensajeRegistro(
                    "La contraseña debe tener mínimo 6 caracteres."
                );

                return;
            }


            /*
            Si todo es correcto,
            ocultamos el mensaje.
            */

            $("#register-mensaje").hide();


            /*
            Por ahora NO guardaremos realmente
            el usuario.

            Esa funcionalidad se implementará
            después mediante almacenamiento local.
            */
            ///////
                        /*
            ==========================================
            INICIAR SESIÓN DESPUÉS DEL REGISTRO
            ==========================================

            En este prototipo no almacenamos
            la contraseña ni creamos una cuenta
            real en un servidor.
            */

            SessionService.iniciarSesion(
                email
            );


            /*
            Actualizamos la interfaz.
            */
            renderizarAplicacion();

            //////

        });

}


/**
 * Muestra mensajes de error dentro
 * del formulario de registro.
 *
 * @param {string} mensaje
 */
function mostrarMensajeRegistro(mensaje) {

    $("#register-mensaje")
        .text(mensaje)
        .show();

}