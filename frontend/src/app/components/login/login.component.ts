import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";

declare const M: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    M.AutoInit();
  }

  login(email: HTMLInputElement, password: HTMLInputElement) {
    const user = new User();
    user.email = email.value;
    user.password = password.value;
    this.authService.login(user).subscribe( res => {
      let r = res as {token: string, message: string};
      M.toast({html: r.message, classes: 'rounded'});
      this.authService.setToken(r.token);
      this.router.navigate(['/']);
    }, (err) =>{
      M.toast({html: 'Email o contraseña incorrectas', classes: 'rounded'});
    });
  }
}
