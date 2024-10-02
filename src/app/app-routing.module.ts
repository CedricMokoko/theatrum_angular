// Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './homepage/login/login.component';
import { RegisterComponent } from './homepage/register/register.component';
import { WelcomeComponent } from './homepage/welcome/welcome.component';
import { ContentContainerComponent } from './content-container/content-container.component';
import { TeatriListComponent } from './content-container/teatri-list/teatri-list.component';
import { SpettacoliListComponent } from './content-container/spettacoli-list/spettacoli-list.component';
import { ReplicheListComponent } from './content-container/repliche-list/repliche-list.component';
import { OrderFormComponent } from './content-container/order-form/order-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PanierComponent } from './panier/panier.component';
import { ConfirmLogoutComponent } from './content-container/confirm-logout/confirm-logout.component';
import { RegistrationSuccessComponent } from './homepage/registration-success/registration-success.component';

// Guards
import { authGuard } from './shared/auth/auth.guard';
import { signoutGuard } from './shared/auth/signout.guard';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    canActivate: [signoutGuard], // Impedisce di uscire dall'applicazione tramite l'url se l'utente è authentificated.
    children: [
      { path: '', component: WelcomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'register-success', component: RegistrationSuccessComponent },
    ],
  },
  {
    path: 'contents',
    component: ContentContainerComponent,
    canActivate: [authGuard], // Protegge la rotta "contents" da utenti non connessi
    children: [
      { path: '', component: TeatriListComponent },
      {
        path: 'teatro/:teatro_id/:teatro_nome',
        component: SpettacoliListComponent,
      },
      {
        path: 'teatro/:teatro_id/:teatro_nome/spettacolo/:spettacolo_id/:spettacolo_titolo/repliche-list',
        component: ReplicheListComponent,
      },
      // {
      //   path: 'teatro/:teatro_id/:teatro_nome/spettacolo/:spettacolo_id/:spettacolo_titolo/repliche-list/order-form/replica/:id',
      //   component: OrderFormComponent,
      // },
    ],
  },
  {
    path: 'confirm-logout',
    component: ConfirmLogoutComponent,
    canActivate: [authGuard], // Protegge la rotta "confirm-logout" da utenti non connessi
  },
  { path: 'panier', component: PanierComponent, canActivate: [authGuard] }, // Protegge la rotta "panier" da utenti non connessi
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
