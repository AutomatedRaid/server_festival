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
      if (resp.message === 'Yes') {
        return true;
      }else {
        this.authService.logout();
        this.router.navigate(['/login']);
        return false;
      }
    }, () => {
      this.authService.logout();
      this.router.navigate(['/login']);
      return false
    });
  }
}
