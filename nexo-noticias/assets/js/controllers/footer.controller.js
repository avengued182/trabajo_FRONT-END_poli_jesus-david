/**
 * ==================================================
 * NEXO NOTICIAS
 * Archivo: footer.controller.js
 * ==================================================
 *
 * Controla las interacciones del Footer global.
 *
 * ==================================================
 */

function inicializarFooter() {


    /*
    ==================================================
    INICIAR SESIÓN DESDE EL FOOTER
    ==================================================
    */

    $("#footer-login-link")
        .on(
            "click",
            function (evento) {


                evento.preventDefault();


                /*
                Subimos al Navbar.
                */
                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });


                /*
                Después abrimos el mismo
                formulario de Login.
                */
                setTimeout(
                    function () {

                        $("#btn-login")
                            .trigger("click");

                    },
                    300
                );

            }
        );


    /*
    ==================================================
    MI CUENTA DESDE EL FOOTER
    ==================================================
    */

    $("#footer-account-link")
        .on(
            "click",
            function (evento) {


                evento.preventDefault();


                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });


                setTimeout(
                    function () {

                        $("#btn-cuenta")
                            .trigger("click");

                    },
                    300
                );

            }
        );

}