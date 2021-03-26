import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ActuacionComponent } from './components/actuacion/actuacion.component';
import {FormsModule} from "@angular/forms";
import { TallerComponent } from './components/taller/taller.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ActuacionComponent,
    TallerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
