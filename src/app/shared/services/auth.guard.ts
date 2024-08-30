import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inietta il servizio di autenticazione
  const router = inject(Router); // Inietta il Router per le eventuali redirezioni

  if (authService.isAuthenticated()) {
    return true; // L'utente è autenticato, consenti l'accesso alla rotta
  } else {
    router.navigate(['/login']); // Reindirizza alla pagina di login se non autenticato
    return false; // Nega l'accesso alla rotta
  }
};
