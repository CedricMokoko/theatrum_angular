// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './homepage/login/login.component';
import { RegisterComponent } from './homepage/register/register.component';
import { WelcomeComponent } from './homepage/welcome/welcome.component';
import { ContentContainerComponent } from './content-container/content-container.component';
import { TeatriListComponent } from './content-container/teatri-list/teatri-list.component';
import { SpettacoliListComponent } from './content-container/spettacoli-list/spettacoli-list.component';
import { ReplicheListComponent } from './content-container/repliche-list/repliche-list.component';
import { OrderFormComponent } from './content-container/order-form/order-form.component';
import { PanierComponent } from './panier/panier.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegistrationSuccessComponent } from './homepage/registration-success/registration-success.component';
import { ConfirmLogoutComponent } from './content-container/confirm-logout/confirm-logout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    ContentContainerComponent,
    TeatriListComponent,
    SpettacoliListComponent,
    ReplicheListComponent,
    OrderFormComponent,
    PanierComponent,
    NotFoundComponent,
    RegistrationSuccessComponent,
    ConfirmLogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
