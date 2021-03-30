import { Injectable } from '@angular/core';
import {Actuacion} from "../models/actuacion";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  URL_API = 'http://45.84.0.19:3000/api/adminapp';

  constructor(private http: HttpClient) {
  }

  postActuacion (actuacion: Actuacion){
    return this.http.post(this.URL_API + '/actuacion', actuacion);
  }

}
