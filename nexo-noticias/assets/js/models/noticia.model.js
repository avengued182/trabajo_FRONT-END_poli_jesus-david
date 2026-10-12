/**
 * ==================================================
 * NEXO NOTICIAS
 * Archivo: noticia.model.js
 * ==================================================
 *
 * RESPONSABILIDAD:
 *
 * Representar la estructura de una noticia
 * dentro de la aplicación.
 *
 * ==================================================
 */

class Noticia {


    /**
     * Constructor de una noticia.
     *
     * Recibe un objeto proveniente
     * del archivo noticias.json.
     */
    constructor(datos) {


        /*
        ==========================================
        IDENTIFICACIÓN
        ==========================================
        */

        this.id =
            datos.id;


        /*
        ==========================================
        INFORMACIÓN PRINCIPAL
        ==========================================
        */

        this.titulo =
            datos.titulo;


        this.categoria =
            datos.categoria;


        this.resumen =
            datos.resumen;


        this.contenido =
            datos.contenido;

        /*
        ==========================================
        CITA DESTACADA
        ==========================================
        */

        this.cita =
            datos.cita;


        this.autorCita =
            datos.autorCita;


        /*
        ==========================================
        RECURSOS
        ==========================================
        */

        this.imagen =
            datos.imagen;


        /*
        ==========================================
        INFORMACIÓN DE PUBLICACIÓN
        ==========================================
        */

        this.autor =
            datos.autor;


        this.fecha =
            datos.fecha;


        this.tiempoLectura =
            datos.tiempoLectura;


        /*
        ==========================================
        ESTADO
        ==========================================
        */

        this.destacada =
            datos.destacada;


        this.estado =
            datos.estado;

    }

}