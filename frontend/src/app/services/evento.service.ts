import { Injectable } from '@angular/core';
import {Actuacion} from "../models/actuacion";
import {Taller} from "../models/taller";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  //URL_API_ADMIN = 'http://45.84.0.19:3000/api/adminapp';
  //URL_API_EVENT = 'http://45.84.0.19:3000/api/eventapp';
  URL_API_ADMIN = 'http://localhost:3000/api/adminapp';
  URL_API_EVENT = 'http://localhost:3000/api/eventapp';

  constructor(private http: HttpClient) {
  }

  postActuacion (actuacion: Actuacion){
    return this.http.post(this.URL_API_ADMIN + '/actuacion', actuacion);
  }

  putActuacion (id: String, actuacion: Actuacion){
    return this.http.put(this.URL_API_ADMIN + `/actuacion/${id}`, actuacion);
  }

  postTaller (taller: Taller){
    return this.http.post(this.URL_API_ADMIN + '/taller', taller);
  }

  putTaller (id: String, taller: Taller){
    return this.http.put(this.URL_API_ADMIN + `/taller/${id}`, taller);
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

  deleteActuacion (_id: string){
    return this.http.delete( this.URL_API_ADMIN + `/actuacion/${_id}` );
  }

  deleteTaller (_id: string){
    return this.http.delete( this.URL_API_ADMIN + `/taller/${_id}` );
  }/*

  getMapa (){
    return this.http.get( this.URL_API_ADMIN + `/mapa/` );
  }

  postMapa (){
    return this.http.post( this.URL_API_ADMIN + `/mapa/`, mapa,  );
  }*/
}
