import { Injectable } from '@angular/core';
import {Actuacion} from "../models/actuacion";
import {Taller} from "../models/taller";
import {HttpClient} from "@angular/common/http";
import {Mapa} from "../models/mapa";
import {Comollegar} from "../models/comollegar";

@Injectable({
  providedIn: 'root'
})
export class EventoService {

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
  }

  getMapa (){
    return this.http.get( this.URL_API_EVENT + `/mapa` );
  }

  postMapa (mapa: Mapa){
    return this.http.post( this.URL_API_ADMIN + `/mapa/`, mapa);
  }

  getFAQs (){
    return this.http.get( this.URL_API_EVENT + '/faq')
  }

  getFAQ (_id: string){
    return this.http.get( this.URL_API_EVENT + `/faq/${_id}`)
  }

  postFAQs (faq: {question: String, answer: String}){
    return this.http.post( this.URL_API_ADMIN + '/faq', faq);
  }

  putFAQs (_id: string, faq: {question: String, answer: String}){
    return this.http.put(this.URL_API_ADMIN + `/faq/${_id}`, faq);
  }

  deleteFAQs (_id: string){
    return this.http.delete( this.URL_API_ADMIN + `/faq/${_id}`);
  }

  putComoLlegar(_id: string, comoLlegar: Comollegar) {
    return this.http.put(this.URL_API_ADMIN + `/comollegar/${_id}`, comoLlegar);
  }

  postComoLlegar(comoLlegar: Comollegar) {
    return this.http.post( this.URL_API_ADMIN + '/comollegar', comoLlegar);
  }

  getComoLlegar() {
    return this.http.get( this.URL_API_EVENT + '/comollegar/')
  }
}
