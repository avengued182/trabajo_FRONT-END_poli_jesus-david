import { Component } from '@angular/core';

@Component({
  selector: 'app-promo',
  standalone: false,
  templateUrl: './promo.html',
  styleUrl: './promo.css'
})
export class Promo {

  titulo = 'Potencia tu futuro profesional';

  descripcion =
    'Descubre herramientas y contenidos para fortalecer tus habilidades digitales.';

  botonTexto = 'Conocer más';
  imagen = 'assets/angular-promo/promo-tecnologia.png';
  mensaje = '';
  visible = true;
  mostrarInformacion() {

      this.mensaje =
          'Muy pronto encontrarás más información sobre esta oportunidad.';


  }

  cerrarPromocion() {

    this.visible = false;

  }

}