import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Cliente } from '../interfaces/cliente';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiBaseUrl: string = 'http://localhost:8081/api/clienti';

  // Ici "null" est la valeur par defaut que je passe à mon "BehaviorSubject" car c'est obbligé de lui passer une valeur par defaut.
  private clienteToken$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  public cliente$: BehaviorSubject<Cliente | null> =
    new BehaviorSubject<Cliente | null>(null);

  constructor(private http: HttpClient) {
    // Recupera il token dell'utente se sono presenti nel session storage.
    const token = sessionStorage.getItem('authToken');
    if (token) {
      this.clienteToken$.next(token);
    }

    // Recupera i dati dell'utente logato se sono presenti nel session storage.
    const storedCliente = sessionStorage.getItem('cliente');
    if (storedCliente) {
      this.cliente$.next(JSON.parse(storedCliente)); // Ripristina il cliente nel BehaviorSubject
    }
  }

  // Questo metodo mi consente di salvare il token nella session storage dell'utente che fa l'accesso
  public setToken(clienteId: number, clienteNome: string): void {
    const token = `${clienteNome}-theatrumToken${clienteId}`; // Definisco la stringa del mio token
    this.clienteToken$.next(token); // Aggiorno il mio BehaviorSubject "clienteToken$"
    sessionStorage.setItem('authToken', token); // Salvo il token nella sessionStorage
  }

  // Metodo per effettuare l'accesso
  public login$(email: string, password: string): Observable<Cliente> {
    // Oggetto per la richiesta di "login" che mandiamo poi al server. Costituisce il body della chiamata HTTP di tipo "post"
    const loginRequest = {
      email: email,
      password: password,
    };

    return this.http
      .post<Cliente>(`${this.apiBaseUrl}/login`, loginRequest)
      .pipe(
        tap((cliente: Cliente) => {
          this.cliente$.next(cliente); // Aggiorno il mio BehaviorSubject "cliente$"
          sessionStorage.setItem('cliente', JSON.stringify(cliente)); // Salvo l'utente logato nella sessionStorage
        }),
        catchError(this.handleError('login'))
      );
  }

  // Metodo per registrare un nuovo utente
  public register$(
    cognome: string,
    nome: string,
    email: string,
    password: string
  ): Observable<Cliente> {
    // Oggetto per la richiesta di "registrazione" che mandiamo poi al server. Costituisce il body della chiamata HTTP di tipo "post"
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

  // Metodo per la gestione di errori sia per il form di "login" che per quello di "registrazione".
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

  // Pulisce i BehaviorSubjects "cliente$" et "clienteToken$" et la session storage
  public logout(): void {
    // Pulizia dei BehaviorSubjects
    this.cliente$.next(null);
    this.clienteToken$.next(null);
    // Pulizia delle session storage
    sessionStorage.removeItem('cliente');
    sessionStorage.removeItem('authToken');
  }

  // Verifica se l'utente è autenticato
  public isAuthenticated(): boolean {
    return !!this.clienteToken$.value;
  }

  /** Vari "Getters" che mi consentono di recuperare i dati salvati nella session storage */
  // Ottieni il token corrente
  public getToken(): string | null {
    return this.clienteToken$.value;
  }

  // Ottenere l'Id del cliente logato
  public getClienteId(): number | null {
    return this.cliente$.value ? Number(this.cliente$.value.id) : null;
  }

  // Ottenere il nome del cliente logato
  public getClienteNome(): string | null | undefined {
    return this.cliente$.value ? this.cliente$.value.nome : null;
  }

  // Ottenere il nome del cliente logato
  public getClienteCognome(): string | null | undefined {
    return this.cliente$.value ? this.cliente$.value.cognome : null;
  }

  // Ottenere il nome del cliente logato
  public getClienteEmail(): string | null | undefined {
    return this.cliente$.value ? this.cliente$.value.email : null;
  }
}
