import { Component, OnInit } from '@angular/core';
import {Taller} from "../../models/taller";
import {EventoService} from "../../services/evento.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {Restaurante} from "../../models/restaurante";
import {NgForm} from "@angular/forms";
import {Actuacion} from "../../models/actuacion";

declare const M: any;

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/djlgdcqhg/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'rdzzccwc';
let progressbar: any = null;

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.css']
})
export class RestauranteComponent implements OnInit {

  ngModel: Restaurante;
  horaIniciov = '';
  horaFinv = '';
  img: String | ArrayBuffer = 'assets/img-not-found.png'; img2: String | ArrayBuffer = 'assets/img-not-found.png';
  private file1: any; private file2: any;
  restaurante: Restaurante;
  alertBody = '';

  constructor(private eventService: EventoService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.ngModel = new Restaurante();
  }

  ngOnInit(): void {
    progressbar = document.getElementById('img-upload-bar');
    M.AutoInit();
    document.addEventListener('DOMContentLoaded', function () {
    });
    this.route.paramMap.subscribe(params => {
      if (params.has("id")) {
        this.eventService.getTaller(params.get("id") || "").subscribe(res => {
          this.restaurante = res as Restaurante;
          this.inicializarDatos();
        });
      }
    });

    var elems = document.querySelectorAll('.timepicker');
    M.Timepicker.init(elems, {
      defaultTime: '9:00',
      twelveHour: false,
      i18n: {cancel: 'Cancelar', done: 'Aceptar'}
    });
  }



  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private inicializarDatos() {

  }

  guardarRestaurante(actForm: NgForm) {if (actForm.value.nombre != '' && actForm.value.ubicacion != '' && this.horaFinv != '' && this.horaIniciov != '') {
    this.toast('Guardando imagen');
    const elems = document.getElementById('modal1');
    const instances = M.Modal.init(elems, {dismissible:false});
    instances.open();
    const restaurante: Restaurante = new Restaurante();
    restaurante.nombre = actForm.value.nombre;
    restaurante.localizacion = actForm.value.ubicacion;
    restaurante.horario = this.horaIniciov + ' - ' + this.horaFinv;
    this.alertBody = 'Guardando imagen: ' + this.file2.name;
    progressbar.setAttribute('value', String(0));

    this.route.paramMap.subscribe(params => {
      if (params.has("id")) {
        this.eventService.putRestaurante(params.get("id"), restaurante).subscribe(() => {
          this.toast('Restaurante guardado correctamente');
          this.router.navigate(['/']);
          instances.close();
        });
      }
      else {
        this.eventService.postRestaurante(restaurante).subscribe(() => {
          this.toast('Restaurante guardado correctamente');
          this.router.navigate(['/']);
          instances.close();
        });
      }
    });
  } else {
    this.toast('Debe completar todos los campos primero');
  }
  }

  addImagen(imagen: HTMLInputElement) {

  }

  toast(message: string) {
    M.toast({html: message, classes: 'rounded'});
  }
}
