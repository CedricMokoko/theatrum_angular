import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-logout',
  templateUrl: './confirm-logout.component.html',
  styleUrl: './confirm-logout.component.scss',
})
export class ConfirmLogoutComponent implements OnInit {
  public clienteId!: string;
  public clienteNome!: string;

  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Ottieni l'ID e il nome del cliente dalla route
    this.clienteId = this.activatedRoute.snapshot.paramMap.get('cliente_id')!;
    this.clienteNome =
      this.activatedRoute.snapshot.paramMap.get('cliente_nome')!;
  }
  // Funzione di logout. Toglie il token.
  logout(): void {
    this.authService.logout();
  }
}
