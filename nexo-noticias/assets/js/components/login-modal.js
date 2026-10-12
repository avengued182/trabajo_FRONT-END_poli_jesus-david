/**
 * ==================================================
 * NEXO NOTICIAS
 * Archivo: login-modal.js
 * ==================================================
 *
 * RESPONSABILIDAD:
 *
 * Construir visualmente el formulario flotante
 * de inicio de sesión.
 *
 * La apariencia sigue el mockup aprobado
 * en la Entrega 1.
 *
 * ==================================================
 */

function crearLoginModal() {

    return `

        <div
            id="login-modal"
            class="login-modal"
        >

            <!-- =====================================
                 BOTÓN CERRAR
            ====================================== -->

            <button
                id="btn-cerrar-login"
                class="login-modal__close"
                type="button"
                aria-label="Cerrar formulario de inicio de sesión"
            >
                ×
            </button>


            <!-- =====================================
                 ENCABEZADO
            ====================================== -->

            <div class="login-modal__header">

                <h2 class="login-modal__title">
                    Iniciar sesión
                </h2>

                <p class="login-modal__subtitle">
                    Accede para guardar favoritos y gestionar tu cuenta.
                </p>

            </div>


            <!-- =====================================
                 FORMULARIO
            ====================================== -->

            <form
                id="form-login"
                class="login-modal__form"
                novalidate
            >


                <!-- =================================
                     CORREO ELECTRÓNICO
                ================================== -->

                <div class="login-modal__input-container">

                    <span
                        class="login-modal__input-icon"
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


                    <!--
                        No mostramos un label visual porque
                        el mockup utiliza el placeholder.

                        aria-label mantiene accesibilidad.
                    -->

                    <input
                        id="login-email"
                        class="login-modal__input"
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

                <div class="login-modal__input-container">

                    <span
                        class="login-modal__input-icon"
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

                                M12 17
                                a2 2 0 1 0 0-4
                                2 2 0 0 0 0 4
                                "
                            >
                            </path>

                        </svg>

                    </span>


                    <input
                        id="login-password"
                        class="login-modal__input"
                        type="password"
                        placeholder="Contraseña"
                        aria-label="Contraseña"
                        autocomplete="current-password"
                        required
                    >


                    <!-- Mostrar / ocultar contraseña -->

                    <button
                        id="btn-ver-password"
                        class="login-modal__show-password"
                        type="button"
                        aria-label="Mostrar contraseña"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            class="login-modal__eye-icon"
                            aria-hidden="true"
                        >
                            <path
                                d="
                                M2.5 12
                                C4.2 8.8 7.7 6.5 12 6.5
                                C16.3 6.5 19.8 8.8 21.5 12
                                C19.8 15.2 16.3 17.5 12 17.5
                                C7.7 17.5 4.2 15.2 2.5 12
                                Z
                                "
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.8"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />

                            <circle
                                cx="12"
                                cy="12"
                                r="2.4"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.8"
                            />
                        </svg>
                    </button>

                </div>


                <!-- =================================
                     MENSAJE DE VALIDACIÓN
                ================================== -->

                <p
                    id="login-mensaje"
                    class="login-modal__message"
                >
                </p>


                <!-- =================================
                     BOTÓN INGRESAR
                ================================== -->

                <button
                    class="login-modal__submit"
                    type="submit"
                >
                    Ingresar
                </button>


                <!-- =================================
                     REGISTRO
                ================================== -->

                <p class="login-modal__register">

                    ¿No tienes cuenta?

                    <button
                        id="btn-ir-registro"
                        class="login-modal__register-link"
                        type="button"
                    >
                        Regístrate
                    </button>

                </p>

            </form>

        </div>

    `;

}   