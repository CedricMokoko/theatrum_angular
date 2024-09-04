import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inietta il servizio di autenticazione
  const router = inject(Router); // Inietta il Router per le eventuali redirezioni

  if (authService.isAuthenticated()) {
    // consente la navigazione verso route richiesta se l'utente risulta connesso.
    return true;
  } else {
    // blocca l'accesso alla route richiesta e redirige su /login se l'utente risulta non connesso.
    router.navigate(['/login']);
    return false;
  }
};
