import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent {

  constructor(private gifsService: GifsService) { }

  /**
   * getter response servicio giphy
   */
  get resultados() {
    return this.gifsService.response;
  }

}
