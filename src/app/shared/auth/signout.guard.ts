import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const signoutGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inietta il servizio di autenticazione
  const router = inject(Router); // Inietta il Router per le eventuali redirezioni

  if (authService.isAuthenticated()) {
    // blocca l'accesso alla route richiesta e redirige su /contents se l'utente risulta connesso.
    router.navigate(['/contents']);
    return false;
  } else {
    // consente la navigazione verso route richiesta se l'utente risulta non connesso.
    return true;
  }
};
