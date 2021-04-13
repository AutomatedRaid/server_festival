import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //URL_API_EVENT = 'http://45.84.0.19:3000/api/userauth';
  URL_API_EVENT = 'http://localhost:3000/api/userauth';

  constructor(private http: HttpClient) {
  }

  isAuth() {
    return false;
  }

  login(user: User) {
    return this.http.post(this.URL_API_EVENT + '/actuacion', User);
  }

  setToken(token): void {
    localStorage.setItem("61757468", token);
  }

  getToken() {
    return localStorage.getItem("61757468");
  }
}
