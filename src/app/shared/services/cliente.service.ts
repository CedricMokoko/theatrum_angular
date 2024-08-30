import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl: string = 'http://localhost:8081/api/clienti';
  private loginUrl: string = 'http://localhost:8081/api/clienti/login'; // Aggiungi l'URL per il login

  constructor(private http: HttpClient) {}

  // Metodo per il login
  public login$(email: string, codiceUtente: string): Observable<Cliente> {
    // Converti codiceUtente a numero
    const codiceUtenteLong = Number(codiceUtente);

    // Oggetto per la richiesta di login
    const loginRequest = {
      email: email,
      id: codiceUtenteLong,
    };

    return this.http.post<Cliente>(this.loginUrl, loginRequest).pipe(
      catchError((error) => {
        let errorMessage = 'Si è verificato un errore durante il login.';
        if (error.status === 0) {
          errorMessage = 'Problema di connessione al server.';
        } else if (error.status === 401) {
          errorMessage = 'Credenziali non valide.';
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
