/**
 * ==================================================
 * NEXO NOTICIAS
 * Archivo: login.controller.js
 * ==================================================
 *
 * RESPONSABILIDAD:
 *
 * Controlar las interacciones relacionadas
 * con el formulario de inicio de sesión.
 *
 * ==================================================
 */


/**
 * Inicializa el comportamiento del formulario.
 */
function inicializarLogin() {

    /*
    Guardamos referencias a los elementos
    que vamos a utilizar varias veces.
    */

    const $modal =
        $("#login-modal");

    const $botonLogin =
        $("#btn-login");

    const $password =
        $("#login-password");


    /*
    ==================================================
    ABRIR FORMULARIO
    ==================================================
    */

    $botonLogin.on("click", function (evento) {

        /*
        Evita que el clic se propague al documento.
        */
        evento.stopPropagation();


        /*
        Si actualmente está visible,
        lo ocultamos.

        Si está oculto,
        lo mostramos.
        */

        if ($modal.is(":visible")) {

            $modal.hide();

            $botonLogin.attr(
                "aria-expanded",
                "false"
            );

        } else {

            $modal.show();

            $botonLogin.attr(
                "aria-expanded",
                "true"
            );

        }

    });


    /*
    ==================================================
    BOTÓN CERRAR
    ==================================================
    */

    $("#btn-cerrar-login")
        .on("click", function () {

            $modal.hide();

            $botonLogin.attr(
                "aria-expanded",
                "false"
            );

        });


    /*
    ==================================================
    EVITAR CIERRE AL HACER CLIC DENTRO
    ==================================================
    */

    $modal.on("click", function (evento) {

        evento.stopPropagation();

    });


    /*
    ==================================================
    CERRAR AL HACER CLIC FUERA
    ==================================================
    */

    /*
==================================================
CERRAR PANELES AL HACER CLIC FUERA
==================================================
*/

$(document).off("click.login").on("click.login", function () {

    /*
    Ocultamos Login.
    */
    $modal.hide();


    /*
    Ocultamos Registro.
    */
    $("#register-modal").hide();


    /*
    Actualizamos el estado accesible
    del botón principal.
    */
    $botonLogin.attr(
        "aria-expanded",
        "false"
    );

});


    /*
    ==================================================
    MOSTRAR / OCULTAR CONTRASEÑA
    ==================================================
    */

    $("#btn-ver-password")
        .on("click", function () {

            const tipoActual =
                $password.attr("type");


            /*
            Alternamos entre password y text.
            */

            if (tipoActual === "password") {

                $password.attr(
                    "type",
                    "text"
                );

            } else {

                $password.attr(
                    "type",
                    "password"
                );

            }

        });


    /*
    ==================================================
    ENVÍO DEL FORMULARIO
    ==================================================

    Por ahora NO autenticamos realmente contra
    una base de datos.

    Únicamente comprobamos los campos.
    */

    $("#form-login")
        .on("submit", function (evento) {

            /*
            Evita que el navegador recargue
            la página al enviar el formulario.
            */

            evento.preventDefault();


            const email =
                $("#login-email")
                    .val()
                    .trim();


            const password =
                $("#login-password")
                    .val()
                    .trim();


            /*
            Validación sencilla.
            */

            if (
                email === "" ||
                password === ""
            ) {

                $("#login-mensaje")
                    .text(
                        "Completa el correo y la contraseña."
                    )
                    .show();

                return;
            }


            /*
            Si ambos campos fueron llenados,
            ocultamos cualquier mensaje anterior.
            */

            $("#login-mensaje").hide();


            /*
            Todavía NO implementamos autenticación.

            Lo comprobamos temporalmente
            desde la consola.
            */
            /////
                        /*
            ==========================================
            CREAR SESIÓN
            ==========================================

            Como estamos construyendo un prototipo
            Front End, cualquier correo y contraseña
            que pasen las validaciones permiten
            simular una sesión.
            */

            SessionService.iniciarSesion(
                email
            );


            /*
            Volvemos a renderizar la interfaz.

            Ahora app.js detectará que hay
            una sesión activa.
            */
            renderizarAplicacion();
            ////////

        });


    /*
    ==================================================
    REGISTRO
    ==================================================

    Este botón se conectará posteriormente
    con el componente de registro.
    */

    /*
==================================================
ABRIR REGISTRO
==================================================
*/

$("#btn-ir-registro")
    .on("click", function () {

        /*
        Ocultamos el formulario de login.
        */
        $modal.hide();


        /*
        Mostramos el formulario de registro.
        */
        $("#register-modal").show();


        /*
        El botón principal continúa indicando
        que hay un panel de cuenta abierto.
        */
        $botonLogin.attr(
            "aria-expanded",
            "true"
        );

    });

}