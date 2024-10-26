import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
// Importa icone solide da '@fortawesome/free-solid-svg-icons'
import {
  faHome,
  faShoppingCart,
  faSignInAlt,
  faSignOutAlt,
  faCheckCircle, // Icona per il successo dell'ordine
  faUserPlus, // Icona per registrazione
  faLock, // Icona per password
  faUser, // Icona per nome utente
} from '@fortawesome/free-solid-svg-icons';

// Importa icone regolari da '@fortawesome/free-regular-svg-icons'
import { faEnvelope, faCopyright } from '@fortawesome/free-regular-svg-icons';

// Importa icone di brand da '@fortawesome/free-brands-svg-icons'
import {
  faLinkedin,
  faGithub,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  // Icons
  // Icone solide
  faHome = faHome;
  faShoppingCart = faShoppingCart;
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;
  faCheckCircle = faCheckCircle; // Icona per il successo dell'ordine
  faUserPlus = faUserPlus; // Icona per registrazione
  faLock = faLock; // Icona per password
  faUser = faUser; // Icona per nome utente

  // Icone regolari
  faEnvelope = faEnvelope;
  faCopyright = faCopyright;

  // Icone di brand
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  faInstagram = faInstagram;

  public clienteId!: string | null;
  public clienteNome!: string | null | undefined;

  constructor(public authService: AuthService) {}

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
