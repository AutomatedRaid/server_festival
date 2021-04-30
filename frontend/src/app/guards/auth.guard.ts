import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  async canActivate(): Promise<boolean> {
    return this.authService.isAuth().then(resp => {
      console.log(resp);
      if (resp.message === 'Yes') {
        console.log('isauthtrue');
        return true;
      }else {
        console.log('isfalse');
        this.router.navigate(['/login']);
        return false;
      }
    });
  }
}
