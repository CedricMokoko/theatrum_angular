import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  shareReplay,
  tap,
  throwError,
} from 'rxjs';
import { Spettacolo } from '../interfaces/spettacolo';

@Injectable({
  providedIn: 'root',
})
export class SpettacoloService {
  // Ici come valeur de default on passe un tableau vite BehaviorSubject
  public spettacoli$: BehaviorSubject<Spettacolo[]> = new BehaviorSubject<
    Spettacolo[]
  >([]);

  private apiBaseUrl: string = 'http://localhost:8081/api/spettacoli';

  constructor(private http: HttpClient) {}

  // Metodo per ottenere tutti gli spettacoli associati ad un determinato teatro
  public getSpettacolibyTeatriId$(teatro_id: string): Observable<Spettacolo[]> {
    return this.http
      .get<Spettacolo[]>(`${this.apiBaseUrl}/teatro/${teatro_id}`)
      .pipe(
        tap((spettacoli: Spettacolo[]) => {
          this.spettacoli$.next(spettacoli);
        }),
        shareReplay(1), // Cache l'ultimo valore per i successivi subscribers
        catchError((error) => {
          return throwError(
            () => new Error('Errore durante la richiesta HTTP')
          );
        })
      );
  }

  /*
   * Metodo per resettare lo stato degli spettacoli.
   * Utilizzabile, ad esempio, quando si cambia il teatro.
   */
  public resetSpettacoli(): void {
    this.spettacoli$.next([]); // Resetta lo stato degli spettacoli
  }
}
