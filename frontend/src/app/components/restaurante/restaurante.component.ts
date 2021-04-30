import { Component, OnInit } from '@angular/core';
import {Taller} from "../../models/taller";
import {EventoService} from "../../services/evento.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {Restaurante} from "../../models/restaurante";
import {NgForm} from "@angular/forms";

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
      var elems = document.querySelectorAll('.timepicker');
      M.Timepicker.init(elems, {
        defaultTime: '9:00',
        twelveHour: false,
        i18n: {cancel: 'Cancelar', done: 'Aceptar'}
      });
    });
    this.route.paramMap.subscribe(params => {
      if (params.has("id")) {
        this.eventService.getTaller(params.get("id") || "").subscribe(res => {
          this.restaurante = res as Restaurante;
          this.inicializarDatos();
        });
      }
    });
  }



  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private inicializarDatos() {

  }

  guardarRestaurante(actForm: NgForm) {

  }

  addImagen(imagen: HTMLInputElement) {
    
  }
}
