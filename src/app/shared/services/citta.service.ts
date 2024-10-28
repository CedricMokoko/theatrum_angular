import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Citta } from '../interfaces/citta';

@Injectable({
  providedIn: 'root',
})
export class CittaService {
  // Ici come valeur de default on passe un tableau vite BehaviorSubject
  public citta$: BehaviorSubject<Citta[]> = new BehaviorSubject<Citta[]>([]);

  private apiBaseUrl: string = 'http://localhost:8081/api/citta';

  constructor(private http: HttpClient) {}

  // Metodo per caricare tutte le citta salvate nel database.
  public fetchTeatri$(): Observable<Citta[]> {
    return this.http.get<Citta[]>(this.apiBaseUrl).pipe(
      tap((citta: Citta[]) => {
        this.citta$.next(citta);
      })
    );
  }

  // Metodo per caricare una citta specifica per ID.
  public getCittaById(cittaId: string): Observable<Citta> {
    return this.http.get<Citta>(`${this.apiBaseUrl}/id/${cittaId}`);
  }
}
