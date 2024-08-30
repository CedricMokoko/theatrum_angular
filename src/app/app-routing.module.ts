import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { authGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    children: [
      { path: '', component: WelcomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      // Altre rotte possono essere aggiunte qui
      // { path: '', redirectTo: '/login', pathMatch: 'full' }, // Reindirizza alla pagina di login di default
    ],
  },
  {
    path: 'contents',
    component: ContentContainerComponent,
    canActivate: [authGuard], // Proteggi la rotta "contents"
    children: [
      { path: '', component: TeatriListComponent },
      { path: 'spettacoli/teatro/:id', component: SpettacoliListComponent },
      { path: 'repliche/spettacolo/:id', component: ReplicheListComponent },
      {
        path: 'order-form/replica/:id/spettacolo/:id/teatro/:id',
        component: OrderFormComponent,
      },
    ],
  },
  { path: 'panier', component: PanierComponent, canActivate: [authGuard] }, // Proteggi la rotta "panier"
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
