import { Injectable } from '@angular/core';
import {Actuacion} from "../models/actuacion";
import {Taller} from "../models/taller";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  URL_API_ADMIN = 'http://45.84.0.19:3000/api/adminapp';
  URL_API_EVENT = 'http://45.84.0.19:3000/api/eventapp';

  constructor(private http: HttpClient) {
  }

  postActuacion (actuacion: Actuacion){
    return this.http.post(this.URL_API_ADMIN + '/actuacion', actuacion);
  }

  postTaller (taller: Taller){
    return this.http.post(this.URL_API_ADMIN + '/taller', taller);
  }

  getActuaciones (){
    return this.http.get( this.URL_API_EVENT + '/actuaciones');
  }

  getTalleres (){
    return this.http.get( this.URL_API_EVENT + '/talleres');
  }

  getTaller(id: string) {
    return this.http.get(this.URL_API_EVENT + `/taller/${id}`);
  }

  getActuacion(id: string) {
    return this.http.get(this.URL_API_EVENT + `/actuacion/${id}`);
  }
}
