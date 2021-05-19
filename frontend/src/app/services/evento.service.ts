import { Injectable } from '@angular/core';
import {Actuacion} from '../models/actuacion';
import {Taller} from '../models/taller';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Mapa} from '../models/mapa';
import {Comollegar} from '../models/comollegar';
import {AuthService} from './auth.service';
import {Restaurante} from '../models/restaurante';
import {DatosContacto} from "../models/datosContacto";

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  URL_API_ADMIN = 'https://angry-bhabha.82-223-151-201.plesk.page/api/adminapp';
  URL_API_EVENT = 'https://angry-bhabha.82-223-151-201.plesk.page/api/eventapp';

  constructor(private http: HttpClient, private authServise: AuthService) {
  }

  postActuacion(actuacion: Actuacion){
    return this.http.post(this.URL_API_ADMIN + '/actuacion', actuacion, {
      headers: new HttpHeaders({
        'x-access-token': ('Bearer ' + this.authServise.getToken())
      })
    });
  }

  putActuacion(id: String, actuacion: Actuacion){
    return this.http.put(this.URL_API_ADMIN + `/actuacion/${id}`, actuacion, {
      headers: new HttpHeaders({
        'x-access-token': ('Bearer ' + this.authServise.getToken())
      })
    });
  }

  postTaller(taller: Taller){
    return this.http.post(this.URL_API_ADMIN + '/taller', taller , {
      headers: new HttpHeaders({
        'x-access-token': ('Bearer ' + this.authServise.getToken())
      })
    });
  }

  putTaller(id: String, taller: Taller){
    return this.http.put(this.URL_API_ADMIN + `/taller/${id}`, taller, {
      headers: new HttpHeaders({
        'x-access-token': ('Bearer ' + this.authServise.getToken())
      })
    });
  }

  getActuaciones(){
    return this.http.get( this.URL_API_EVENT + '/actuaciones');
  }

  getTalleres(){
    return this.http.get( this.URL_API_EVENT + '/talleres');
  }

  getTaller(id: string) {
    return this.http.get(this.URL_API_EVENT + `/taller/${id}`);
  }

  getActuacion(id: string) {
    return this.http.get(this.URL_API_EVENT + `/actuacion/${id}`);
  }

  deleteActuacion(_id: string){
    return this.http.delete( this.URL_API_ADMIN + `/actuacion/${_id}`, {
      headers: new HttpHeaders({
        'x-access-token': ('Bearer ' + this.authServise.getToken())
      })
    });
  }

  deleteTaller(_id: string){
    return this.http.delete( this.URL_API_ADMIN + `/taller/${_id}`, {
      headers: new HttpHeaders({
        'x-access-token': ('Bearer ' + this.authServise.getToken())
      })
    });
  }

  getMapa(){
    return this.http.get( this.URL_API_EVENT + `/mapa` );
  }

  postMapa(mapa: Mapa){
    return this.http.post( this.URL_API_ADMIN + `/mapa/`, mapa, {
      headers: new HttpHeaders({
        'x-access-token': ('Bearer ' + this.authServise.getToken())
      })
    });
  }

  getFAQs(){
    return this.http.get( this.URL_API_EVENT + '/faq');
  }

  getFAQ(_id: string){
    return this.http.get( this.URL_API_EVENT + `/faq/${_id}`);
  }

  postFAQs(faq: {question: String, answer: String}){
    return this.http.post( this.URL_API_ADMIN + '/faq', faq, {
      headers: new HttpHeaders({
        'x-access-token': ('Bearer ' + this.authServise.getToken())
      })
    });
  }

  putFAQs(_id: string, faq: {question: String, answer: String}){
    return this.http.put(this.URL_API_ADMIN + `/faq/${_id}`, faq, {
      headers: new HttpHeaders({
        'x-access-token': ('Bearer ' + this.authServise.getToken())
      })
    });
  }

  deleteFAQs(_id: string){
    return this.http.delete( this.URL_API_ADMIN + `/faq/${_id}`, {
      headers: new HttpHeaders({
        'x-access-token': ('Bearer ' + this.authServise.getToken())
      })
    });
  }

  putComoLlegar(_id: string, comoLlegar: Comollegar) {
    return this.http.put(this.URL_API_ADMIN + `/comollegar/${_id}`, comoLlegar, {
      headers: new HttpHeaders({
        'x-access-token': ('Bearer ' + this.authServise.getToken())
      })
    });
  }

  postComoLlegar(comoLlegar: Comollegar) {
    return this.http.post( this.URL_API_ADMIN + '/comollegar', comoLlegar, {
      headers: new HttpHeaders({
        'x-access-token': ('Bearer ' + this.authServise.getToken())
      })
    });
  }

  putDatosContacto(_id: string, datoscontacto: DatosContacto) {
    return this.http.put(this.URL_API_ADMIN + `/datoscontacto/${_id}`, datoscontacto, {
      headers: new HttpHeaders({
        'x-access-token': ('Bearer ' + this.authServise.getToken())
      })
    });
  }

  deleteDatosContacto(_id: string){
    return this.http.delete( this.URL_API_ADMIN + `/datoscontacto/${_id}`, {
      headers: new HttpHeaders({
        'x-access-token': ('Bearer ' + this.authServise.getToken())
      })
    });
  }

  postDatosContacto(datoscontacto: DatosContacto) {
    return this.http.post( this.URL_API_ADMIN + '/datoscontacto/', datoscontacto, {
      headers: new HttpHeaders({
        'x-access-token': ('Bearer ' + this.authServise.getToken())
      })
    });
  }

  getComoLlegar() {
    return this.http.get( this.URL_API_EVENT + '/comollegar/');
  }

  getDatosContacto() {
    return this.http.get( this.URL_API_EVENT + '/datoscontacto/');
  }

  getRestaurantes() {
    return this.http.get( this.URL_API_EVENT + '/restaurante/');
  }

  getRestaurante(id: string) {
    return this.http.get( this.URL_API_EVENT + `/restaurante/${id}`);
  }

  putRestaurante(_id: string, restaurante: Restaurante) {
    return this.http.put(this.URL_API_ADMIN + `/restaurante/${_id}`, restaurante, {
      headers: new HttpHeaders({
        'x-access-token': ('Bearer ' + this.authServise.getToken())
      })
    });
  }

  postRestaurante(restaurante: Restaurante) {
    return this.http.post( this.URL_API_ADMIN + '/restaurante', restaurante, {
      headers: new HttpHeaders({
        'x-access-token': ('Bearer ' + this.authServise.getToken())
      })
    });
  }

  deleteRestaurante(_id: string) {
    return this.http.delete( this.URL_API_ADMIN + `/restaurante/${_id}`, {
      headers: new HttpHeaders({
        'x-access-token': ('Bearer ' + this.authServise.getToken())
      })
    });
  }

  postImage(file: FormData) {
    return this.http.post(this.URL_API_ADMIN + '/image', file, {
      headers: new HttpHeaders({
        'x-access-token': ('Bearer ' + this.authServise.getToken())
      })
    }).toPromise();
  }
}
