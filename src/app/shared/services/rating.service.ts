import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RatedEntityType } from '../../shared/enum/rated-entity-type';
import { Rating } from '../../shared/interfaces/rating';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private apiUrl = 'http://localhost:8081/api/ratings';

  constructor(private http: HttpClient) {}

  /**
   * Aggiunge una nuova valutazione per un'entità specificata.
   *
   * @param clientId - ID del cliente
   * @param entityId - ID dell'entità da valutare
   * @param type - Tipo di entità (CITTA, TEATRO, SPETTACOLO)
   * @param valoreRating - Valore della valutazione (es: da 1 a 5)
   * @returns Un observable della valutazione appena creata
   */

  addRating$(
    clientId: number,
    entityId: string,
    type: RatedEntityType,
    valoreRating: number
  ): Observable<Rating> {
    const params = {
      clientId: clientId.toString(),
      entityId,
      type,
      valoreRating: valoreRating.toString(),
    };

    return this.http.post<Rating>(`${this.apiUrl}`, {}, { params });
  }

  /**
   * Ottiene la media delle valutazioni per una specifica entità utilizzando solo l'ID dell'entità.
   *
   * @param entityId - ID dell'entità (es. teatroId)
   * @returns Un observable contenente la media delle valutazioni
   */
  getAverageRating$(entityId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/media/${entityId}`);
  }
}
