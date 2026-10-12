/** NEXO NOTICIAS - CONTACTO */
function inicializarContacto() {
    const $form = $("#contact-form");
    if ($form.length === 0) return;

    const $success = $("#contact-success");

    function limpiarErrores() {
        $(".contact-form__error").text("");
        $(".contact-form__control").removeClass("has-error");
        $success.removeClass("is-visible");
    }

    function marcarError(nombre, mensaje) {
        $(`[data-error-for="${nombre}"]`).text(mensaje);
        $(`[name="${nombre}"]`).addClass("has-error");
    }

    $form.off("submit").on("submit", function (evento) {
        evento.preventDefault();
        limpiarErrores();

        const nombre = $.trim($("#contact-name").val());
        const email = $.trim($("#contact-email").val());
        const asunto = $.trim($("#contact-subject").val());
        const mensaje = $.trim($("#contact-message").val());
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        let valido = true;

        if (!nombre) {
            marcarError("nombre", "Ingresa tu nombre completo.");
            valido = false;
        }
        if (!email) {
            marcarError("email", "Ingresa tu correo electrónico.");
            valido = false;
        }
        else if (!emailValido) {
            marcarError("email", "Ingresa un correo válido, por ejemplo: nombre@correo.com");
            valido = false;
        }
        if (!asunto) {
            marcarError("asunto", "Escribe el asunto del mensaje.");
            valido = false;
        }
        if (!mensaje) {
            marcarError("mensaje", "Escribe tu mensaje.");
            valido = false;
        }

        if (!valido) return;

        $success.addClass("is-visible");
        $form[0].reset();
        $success[0].scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    $("#btn-contact-clear").off("click").on("click", function () {
        $form[0].reset();
        limpiarErrores();
    });
}
