import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ActuacionComponent} from "./components/actuacion/actuacion.component";
import {TallerComponent} from "./components/taller/taller.component";
import {LoginComponent} from "./components/login/login.component";
import {EventoService} from "./services/evento.service";
import {AuthGuard} from "./guards/auth.guard";

let routes: Routes;

if (EventoService) {
  routes = [
    {
      path:'',
      pathMatch: 'full',
      component: HomeComponent,
      canActivate: [AuthGuard]
    },
    {
      path:'actuacion',
      pathMatch: 'full',
      component: ActuacionComponent,
      canActivate: [AuthGuard]
    },
    {
      path:'actuacion/:id',
      pathMatch: 'full',
      component: ActuacionComponent,
      canActivate: [AuthGuard]
    },
    {
      path:'taller',
      pathMatch: 'full',
      component: TallerComponent,
      canActivate: [AuthGuard]
    },
    {
      path:'taller/:id',
      pathMatch: 'full',
      component: TallerComponent,
      canActivate: [AuthGuard]
    },
    {
      path:'login',
      pathMatch: 'full',
      component: LoginComponent
    }
  ];
}else {
  routes = [];
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
