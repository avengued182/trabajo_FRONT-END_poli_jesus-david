/**
 * ==================================================
 * NEXO NOTICIAS
 * Archivo: register-modal.js
 * ==================================================
 *
 * RESPONSABILIDAD:
 *
 * Construir el formulario flotante de registro.
 *
 * Mantiene la misma identidad visual del
 * formulario de inicio de sesión aprobado.
 *
 * ==================================================
 */

function crearRegisterModal() {

    return `

        <div
            id="register-modal"
            class="register-modal"
        >

            <!-- =====================================
                 BOTÓN CERRAR
            ====================================== -->

            <button
                id="btn-cerrar-registro"
                class="register-modal__close"
                type="button"
                aria-label="Cerrar formulario de registro"
            >
                ×
            </button>


            <!-- =====================================
                 ENCABEZADO
            ====================================== -->

            <div class="register-modal__header">

                <h2 class="register-modal__title">
                    Crear cuenta
                </h2>

                <p class="register-modal__subtitle">
                    Regístrate para guardar tus noticias favoritas.
                </p>

            </div>


            <!-- =====================================
                 FORMULARIO
            ====================================== -->

            <form
                id="form-register"
                class="register-modal__form"
                novalidate
            >


                <!-- =================================
                     CORREO
                ================================== -->

                <div class="register-modal__input-container">

                    <span
                        class="register-modal__input-icon"
                        aria-hidden="true"
                    >

                        <svg viewBox="0 0 24 24">

                            <path
                                d="
                                M20 4H4
                                c-1.1 0-2 .9-2 2
                                v12
                                c0 1.1 .9 2 2 2
                                h16
                                c1.1 0 2-.9 2-2
                                V6
                                c0-1.1-.9-2-2-2

                                zm0 4
                                -8 5
                                -8-5
                                V6
                                l8 5
                                8-5
                                v2z
                                "
                            >
                            </path>

                        </svg>

                    </span>


                    <input
                        id="register-email"
                        class="register-modal__input"
                        type="email"
                        placeholder="Correo electrónico"
                        aria-label="Correo electrónico"
                        autocomplete="email"
                        required
                    >

                </div>


                <!-- =================================
                     CONTRASEÑA
                ================================== -->

                <div class="register-modal__input-container">

                    <span
                        class="register-modal__input-icon"
                        aria-hidden="true"
                    >

                        <svg viewBox="0 0 24 24">

                            <path
                                d="
                                M18 8h-1V6
                                a5 5 0 0 0-10 0
                                v2H6
                                a2 2 0 0 0-2 2
                                v10
                                a2 2 0 0 0 2 2
                                h12
                                a2 2 0 0 0 2-2
                                V10
                                a2 2 0 0 0-2-2

                                M9 6
                                a3 3 0 0 1 6 0
                                v2H9V6

                                m9 14H6V10h12v10
                                "
                            >
                            </path>

                        </svg>

                    </span>


                    <input
                        id="register-password"
                        class="register-modal__input"
                        type="password"
                        placeholder="Contraseña"
                        aria-label="Contraseña"
                        autocomplete="new-password"
                        required
                    >

                </div>


                <!-- =================================
                     CONFIRMAR CONTRASEÑA
                ================================== -->

                <div class="register-modal__input-container">

                    <span
                        class="register-modal__input-icon"
                        aria-hidden="true"
                    >

                        <svg viewBox="0 0 24 24">

                            <path
                                d="
                                M18 8h-1V6
                                a5 5 0 0 0-10 0
                                v2H6
                                a2 2 0 0 0-2 2
                                v10
                                a2 2 0 0 0 2 2
                                h12
                                a2 2 0 0 0 2-2
                                V10
                                a2 2 0 0 0-2-2

                                M9 6
                                a3 3 0 0 1 6 0
                                v2H9V6

                                m9 14H6V10h12v10
                                "
                            >
                            </path>

                        </svg>

                    </span>


                    <input
                        id="register-password-confirm"
                        class="register-modal__input"
                        type="password"
                        placeholder="Confirmar contraseña"
                        aria-label="Confirmar contraseña"
                        autocomplete="new-password"
                        required
                    >

                </div>


                <!-- =================================
                     MENSAJE
                ================================== -->

                <p
                    id="register-mensaje"
                    class="register-modal__message"
                >
                </p>


                <!-- =================================
                     BOTÓN REGISTRARSE
                ================================== -->

                <button
                    class="register-modal__submit"
                    type="submit"
                >
                    Registrarse
                </button>


                <!-- =================================
                     VOLVER AL LOGIN
                ================================== -->

                <p class="register-modal__login">

                    ¿Ya tienes una cuenta?

                    <button
                        id="btn-volver-login"
                        class="register-modal__login-link"
                        type="button"
                    >
                        Iniciar sesión
                    </button>

                </p>

            </form>

        </div>

    `;

}