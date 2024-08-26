import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgOptimizedImage } from '@angular/common';
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

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomepageComponent, LoginComponent, RegisterComponent, WelcomeComponent, ContentContainerComponent, TeatriListComponent, SpettacoliListComponent, ReplicheListComponent, OrderFormComponent, PanierComponent, NotFoundComponent],
  imports: [BrowserModule, AppRoutingModule, NgOptimizedImage],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
