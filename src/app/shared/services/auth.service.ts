import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private clienteToken$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null); // Ici null est la valeur par defaut que je passe à mon "BehaviorSubject" car c'est obbligé de lui passer une valeur par defaut.

  // Aggiunti per l'ID e il nome del cliente
  private clienteId$: BehaviorSubject<number | null> = new BehaviorSubject<
    number | null
  >(null);
  private clienteNome$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor() {
    // Carica il token e i dati del cliente se sono presenti nel sessionStorage all'avvio
    const token = sessionStorage.getItem('authToken');
    if (token) {
      this.clienteToken$.next(token);
    }

    const clienteId = sessionStorage.getItem('clienteId');
    if (clienteId) {
      this.clienteId$.next(Number(clienteId));
    }

    const clienteNome = sessionStorage.getItem('clienteNome');
    if (clienteNome) {
      this.clienteNome$.next(clienteNome);
    }
  }

  // Metodo per il login (ora salva anche l'ID e il nome del cliente)
  public login(clienteId: number, clienteNome: string): void {
    const token = `${clienteNome}-token`;
    this.clienteToken$.next(token);
    this.clienteId$.next(clienteId);
    this.clienteNome$.next(clienteNome);

    // Salva il token, l'ID e il nome nel sessionStorage
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('clienteId', clienteId.toString());
    sessionStorage.setItem('clienteNome', clienteNome);
  }

  // Metodo per il logout (ora rimuove anche l'ID e il nome del cliente)
  public logout(): void {
    this.clienteToken$.next(null);
    this.clienteId$.next(null);
    this.clienteNome$.next(null);
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('clienteId');
    sessionStorage.removeItem('clienteNome');
  }

  // Verifica se l'utente è autenticato
  public isAuthenticated(): boolean {
    return !!this.clienteToken$.value;
  }

  // Ottieni il token corrente
  public getToken(): string | null {
    return this.clienteToken$.value;
  }

  // Ottieni l'ID del cliente
  public getClienteId(): number | null {
    return this.clienteId$.value;
  }

  // Ottieni il nome del cliente
  public getClienteNome(): string | null {
    return this.clienteNome$.value;
  }
}
