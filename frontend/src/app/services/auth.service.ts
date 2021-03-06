import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL_API_EVENT = 'https://angry-bhabha.82-223-151-201.plesk.page/api/userauth';
  //URL_API_EVENT = 'http://localhost:3000/api/userauth';

  constructor(private http: HttpClient) {
  }

  async isAuth(): Promise<any> {
    const t = this.getToken();
    if (t != null) {
      return this.http.get(this.URL_API_EVENT + '/auth', {
        headers: new HttpHeaders({
          'x-access-token': ('Bearer ' + t)
        })
      }).toPromise();
    }else {
      return false
    }
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

  logout() {
    localStorage.removeItem("61757468");
  }

}
