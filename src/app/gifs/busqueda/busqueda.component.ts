import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  /**
   * 
   * Se inicializa el constructor
   * 
   * @param gifsService
   */
  constructor(private gifsService: GifsService) {}

  /**
   * ! non null assertion operator
   * 
   * Se usa para asegurar que el valor no es nulo
   * 
   * Se hace referencia a un objeto del HTML #txtBuscar
   */
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  buscar() {

    /**
     * Se obtiene el valor del input
     */
    const txt = this.txtBuscar.nativeElement.value;

    /**
     * Validación de formato de texto
     */
    if (txt.trim().length === 0) {
      return;
    }

    /**
     * Se llama el servicio encargado de realizar la búsqueda
     */
    this.gifsService.buscarGifs(txt);

    /**
     * Se limpia el valor del input
     */
    this.txtBuscar.nativeElement.value = '';
  }

}
