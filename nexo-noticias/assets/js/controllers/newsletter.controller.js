/** NEXO NOTICIAS - NEWSLETTER */
function inicializarNewsletter() {
    $("#newsletter-form, .detail-newsletter__form")
        .off("submit.newsletter")
        .on("submit.newsletter", function (evento) {
            evento.preventDefault();
            const $form = $(this);
            const $input = $form.find("input[type='email']");
            const email = $.trim($input.val());
            const valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            $form.find(".newsletter-feedback, .detail-newsletter__feedback").remove();

            if (!valido) {
                $form.append('<p class="newsletter-feedback is-error">Ingresa un correo electrónico válido.</p>');
                return;
            }

            $form.append('<p class="newsletter-feedback is-success">¡Gracias! Tu correo quedó registrado para este prototipo.</p>');
            $input.val("");
        });
}
