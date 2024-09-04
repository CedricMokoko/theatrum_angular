import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.checkAuthentication();
  }

  getRouterLink(): string[] {
    return this.authService.isAuthenticated() ? ['/contents'] : ['/'];
  }
  private checkAuthentication(): void {
    this.authService.isAuthenticated;
  }
}
