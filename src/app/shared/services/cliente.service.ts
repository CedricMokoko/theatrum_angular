import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiBaseUrl: string = 'http://localhost:8081/api/clienti';

  constructor(private http: HttpClient) {}

  // Metodo per il login
  public login$(email: string, password: string): Observable<Cliente> {
    // Oggetto per la richiesta di login che mandiamo poi al server. Constituisce il body della richiesta.
    const loginRequest = {
      email: email,
      password: password,
    };
    return this.http
      .post<Cliente>(`${this.apiBaseUrl}/login`, loginRequest)
      .pipe(catchError(this.handleError('login')));
  }

  // Metodo per registrare un nuovo utente
  public register$(
    cognome: string,
    nome: string,
    email: string,
    password: string
  ): Observable<Cliente> {
    // Oggetto per la richiesta di registrazione che mandiamo poi al server. Constituisce il body della richiesta.
    const registerRequest = {
      cognome: cognome,
      nome: nome,
      email: email,
      password: password,
    };
    return this.http
      .post<Cliente>(`${this.apiBaseUrl}/register`, registerRequest)
      .pipe(catchError(this.handleError('register')));
  }

  // Metodo per la gestione di errori sia per il form di login che per quello di registrazione.
  private handleError(operation: string) {
    return (error: HttpErrorResponse) => {
      let errorMessage = `Si è verificato un errore durante la fase di ${operation}.`;
      if (error.status === 0) {
        errorMessage = 'Problema di connessione al server.';
      } else if (error.status === 401) {
        errorMessage =
          operation === 'login'
            ? 'Credenziali non valide.'
            : "L'email inserita è già collegata ad un account.";
      }
      return throwError(() => new Error(errorMessage));
    };
  }
}
