import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  public cliente$: BehaviorSubject<Cliente | null> =
    new BehaviorSubject<Cliente | null>(null);

  private apiBaseUrl: string = 'http://localhost:8081/api/clienti';

  constructor(private http: HttpClient) {}
}
