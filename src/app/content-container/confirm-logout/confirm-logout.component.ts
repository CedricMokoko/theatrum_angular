import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-confirm-logout',
  templateUrl: './confirm-logout.component.html',
  styleUrl: './confirm-logout.component.scss',
})
export class ConfirmLogoutComponent {
  constructor(public authService: AuthService) {}

  // Funzione di logout. Toglie il token.
  logout(): void {
    this.authService.logout();
  }
}
