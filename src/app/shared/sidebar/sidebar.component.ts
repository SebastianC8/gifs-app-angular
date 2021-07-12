import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  /**
   * Se inicializa constructor
   * 
   * @param gifService 
   */
  constructor(private gifService: GifsService) { }

  /**
   * getter array historial
   */
  get historial() {
    return this.gifService.historial;
  }

  /**
   * Recuperar historial desde el sidebar
   * 
   * @param item
   */
  getHistorial(item: string) {
    this.gifService.buscarGifs(item);
  }

}
