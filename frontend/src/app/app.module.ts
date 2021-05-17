import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ActuacionComponent } from './components/actuacion/actuacion.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TallerComponent } from './components/taller/taller.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { RestauranteComponent } from './components/restaurante/restaurante.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ActuacionComponent,
    TallerComponent,
    LoginComponent,
    UsersComponent,
    RestauranteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
