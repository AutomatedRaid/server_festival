import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ActuacionComponent} from "./components/actuacion/actuacion.component";
import {TallerComponent} from "./components/taller/taller.component";

const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path:'actuacion',
    pathMatch: 'full',
    component: ActuacionComponent
  },
  {
    path:'actuacion/:id',
    pathMatch: 'full',
    component: ActuacionComponent
  },
  {
    path:'taller',
    pathMatch: 'full',
    component: TallerComponent
  },
  {
    path:'taller/:id',
    pathMatch: 'full',
    component: TallerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
