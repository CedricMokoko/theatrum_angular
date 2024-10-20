import { Injectable } from '@angular/core';
import { Biglietto } from '../interfaces/biglietto';
import { BehaviorSubject, Observable } from 'rxjs';
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

  // Metodo per salvare il biglietto
  public createBiglietto(biglietto: Biglietto): Observable<Biglietto> {
    return this.http.post<Biglietto>(`${this.apiBaseUrl}`, biglietto);
  }
}
