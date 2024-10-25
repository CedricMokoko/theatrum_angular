import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public clienteId!: string | null;
  public clienteNome!: string | null | undefined;

  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.checkAuthentication();

    this.loadClienteData();
  }

  // Ottieni il link per la navigazione in base allo stato di autenticazione e ai dati del cliente
  public getRouterLink(): string[] {
    // Controlla se l'utente è autenticato e se i dati del cliente sono disponibili
    return this.authService.isAuthenticated() &&
      this.clienteId &&
      this.clienteNome
      ? ['/contents', this.clienteId, this.clienteNome]
      : ['/'];
  }

  private checkAuthentication(): void {
    this.authService.isAuthenticated;
  }

  // Funzione che carica i dati del cliente dal servizio AuthService
  private loadClienteData(): void {
    this.clienteId = this.authService.getClienteId()?.toString() || null;
    this.clienteNome = this.authService.getClienteNome();
  }
}
