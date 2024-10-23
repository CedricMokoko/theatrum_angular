import { Injectable } from '@angular/core';
import { Replica } from '../interfaces/replica';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  Observable,
  shareReplay,
  tap,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReplicaService {
  public repliche$: BehaviorSubject<Replica[]> = new BehaviorSubject<Replica[]>(
    []
  );

  private apiBaseUrl: string = 'http://localhost:8081/api/repliche';

  constructor(private http: HttpClient) {}

  public getReplicheBySpettacoliId$(
    spettacolo_id: string
  ): Observable<Replica[]> {
    return this.http
      .get<Replica[]>(`${this.apiBaseUrl}/spettacolo/${spettacolo_id}`)
      .pipe(
        tap((repliche: Replica[]) => {
          this.repliche$.next(repliche);
        }),
        shareReplay(1), // Cache l'ultimo valore per i successivi subscribers
        catchError((error) => {
          return throwError(
            () => new Error('Errore durante la richiesta HTTP')
          );
        })
      );
  }

  // Metodo per ottenere una replica singola tramite replica_id
  public getReplicaByReplicaId$(replica_id: string): Observable<Replica> {
    return this.http
      .get<Replica>(`${this.apiBaseUrl}/id/${replica_id}`) // URL endpoint per ottenere la singola replica
      .pipe(
        shareReplay(1), // Cache l'ultimo valore per i successivi subscribers
        catchError((error) => {
          return throwError(
            () => new Error('Errore durante il recupero della replica')
          );
        })
      );
  }

  /**
   * Metodo per resettare lo stato degli spettacoli.
   * Utilizzabile, ad esempio, quando si cambia il teatro.
   */
  public resetSpettacoli(): void {
    this.repliche$.next([]); // Resetta lo stato degli spettacoli
  }
}
