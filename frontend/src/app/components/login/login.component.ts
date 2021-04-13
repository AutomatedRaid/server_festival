import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(loginForm: NgForm) {
    const user = new User();
    user.email = loginForm.value.email;
    user.password = loginForm.value.password;
    this.authService.login(user);
  }
}
