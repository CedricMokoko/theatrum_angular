import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Teatro } from '../interfaces/teatro';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TeatroService {
  public teatri$: BehaviorSubject<Teatro[]> = new BehaviorSubject<Teatro[]>([]);

  private apiBaseUrl: string = 'http://localhost:8081/api/teatri';

  constructor(private http: HttpClient) {}

  public fetchTeatri$(): Observable<Teatro[]> {
    return this.http.get<Teatro[]>(this.apiBaseUrl).pipe(
      tap((teatri: Teatro[]) => {
        this.teatri$.next(teatri);
      })
    );
  }
}
