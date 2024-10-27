import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Teatro } from '../interfaces/teatro';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TeatroService {
  // Ici come valeur de default on passe un tableau vite BehaviorSubject
  public teatri$: BehaviorSubject<Teatro[]> = new BehaviorSubject<Teatro[]>([]);

  private apiBaseUrl: string = 'http://localhost:8081/api/teatri';

  constructor(private http: HttpClient) {}

  // Metodo per caricare tutti i teatri salvati nel database.
  public fetchTeatri$(): Observable<Teatro[]> {
    return this.http.get<Teatro[]>(this.apiBaseUrl).pipe(
      tap((teatri: Teatro[]) => {
        this.teatri$.next(teatri);
      })
    );
  }

  // Metodo per caricare un teatro specifico per ID.
  public getTeatroById(teatroId: string): Observable<Teatro> {
    return this.http.get<Teatro>(`${this.apiBaseUrl}/id/${teatroId}`);
  }
}
