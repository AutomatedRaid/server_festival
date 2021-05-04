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
  private files: any[] = [];
  restaurante: Restaurante;
  alertBody = '';
  images: {url:string | ArrayBuffer, id: number}[] = [{url: '/assets/images/fastfood.jpg',id: 0},{url: '/assets/images/fastfood2.jpg',id: 1}];
  imgdelete = "";
  iddelete = null;

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

  orderimg(number: number, number2: number) {
    switch (number) {
      case 0:
        this.images[number2].id = 0 ;
        this.images[0].id = number2;
        break;
      case 1:
        if(number2 > 0){
          this.images[number2].id = number2-1;
          this.images[number2-1].id = number2;
        }
        break;
      case 2:
        if(number2 < this.images.length-1) {
          this.images[number2].id = number2+1;
          this.images[number2+1].id = number2;
        }
        break;
      case 3:
        break;
    }
    this.images.sort((l1, l2) => {if(l1.id > l2.id){return 1;}if(l1.id < l2.id){return -1;}return 0;});
  }

  deletemodalimg(i: {url: string, id: string}) {
    this.imgdelete = i.url;
    this.iddelete = i.id;
    var elems = document.getElementById('eliminarmodal');
    var instances = M.Modal.init(elems);
    instances.open();
  }

  deleteimg(){
    this.images.splice(this.iddelete, 1);
  }

  onSelectFile(event) {
    this.files.push(event.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (eventt) => {
      this.images.push({url: eventt.target.result, id: this.images.length});
    };
  }
}
