import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  /**
   * Se inicializa constructor
   * 
   * @param http
   */
  constructor(private http: HttpClient) {

    /**
     * Se recupera el historial guardado en localstorage
     */
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

    /**
     * Se recupera la data de la última busqueda guardada en localstorage
     */
    this.response = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  /**
   * Variable para almacenar array de historial
   */
  private _historial: string[] = [];

  /**
   * API key service
   */
  private _apiKey: string = '9xSbPKMYHerVK1AeYCh4FxHPEvo14tMK';

  /**
   * Endpoint service
   */
  private _endpoint = 'https://api.giphy.com/v1/gifs';

  /**
   * Respuesta del servicio
   */
  public response: Gif[] = [];

  /**
   * getter historial
   */
  get historial () {
    return [...this._historial];
  };

  buscarGifs(query: string) {

    /**
     * Se eliminan espacios y se convierte en minúscula el texto de búsqueda
     */
    query = query.trim().toLowerCase();    

    /**
     * Validación para no guardar valores repetidos
     */
    if (!this._historial.includes(query)) {

      /**
       * Se añade el nuevo valor a la primera posición del array
       */
      this._historial.unshift(query);

      /**
       * Se toman los 10 primeros valores del array
       */
      this._historial = this._historial.splice(0, 10);

      /**
       * Se guarda el historial en localstorage
       */
      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    /**
     * Se establecen parámetros para la petición HTTP
     */
    const params = new HttpParams()
                  .set('api_key', this._apiKey)
                  .set('q', query)
                  .set('limit', '10');

    /**
     * Petición HTTP vía GET
     */
    this.http.get<SearchGifsResponse>(`${this._endpoint}/search`, { params }).subscribe((response) => {
      
      /**
       * Se guarda la data en una variable pública
       */
      this.response = response.data;

      /**
       * Se guarda en localstorage la data con el fin de poder recuperarla al recargar la página
       */
      localStorage.setItem('resultados', JSON.stringify(this.response));
    });

  }

}
