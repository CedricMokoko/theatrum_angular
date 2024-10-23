import { Injectable } from '@angular/core';
import { Biglietto } from '../interfaces/biglietto';
import {
  BehaviorSubject,
  catchError,
  Observable,
  shareReplay,
  tap,
  throwError,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BigliettoService {
  public biglietti$: BehaviorSubject<Biglietto[]> = new BehaviorSubject<
    Biglietto[]
  >([]);

  private apiBaseUrl: string = 'http://localhost:8081/api/biglietti';

  constructor(private http: HttpClient) {}

  // Metodo per creare il biglietto
  public createBiglietto(biglietto: Biglietto): Observable<Biglietto> {
    return this.http.post<Biglietto>(`${this.apiBaseUrl}`, biglietto);
  }

  public getBigliettiByClienteId$(cliente_id: number): Observable<Biglietto[]> {
    return this.http
      .get<Biglietto[]>(`${this.apiBaseUrl}/cliente/${cliente_id}`)
      .pipe(
        tap((biglietti: Biglietto[]) => {
          this.biglietti$.next(biglietti);
        }),
        shareReplay(1), // Cache l'ultimo valore per i successivi subscribers
        catchError((error) => {
          return throwError(
            () => new Error('Errore durante la richiesta HTTP')
          );
        })
      );
  }
}
