import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //URL_API_EVENT = 'http://45.84.0.19:3000/api/userauth';
  URL_API_EVENT = 'http://localhost:3000/api/userauth';

  constructor(private http: HttpClient) {
  }

  async isAuth() {
    let r = false;
    const t = localStorage.getItem("61757468");
    if (t != null) {
      await this.http.get(this.URL_API_EVENT + '/auth', {
        headers: new HttpHeaders({
          'x-access-token': ('Bearer ' + t)
        })
      }).subscribe(() => {
        r = true;
      });
    }
    console.log("isAuth: " + r);
    return r;
  }

  login(user: User) {
    return this.http.post(this.URL_API_EVENT + '/signin', user);
  }

  setToken(token): void {
    localStorage.setItem("61757468", token);
  }

  getToken() {
    return localStorage.getItem("61757468");
  }
}
