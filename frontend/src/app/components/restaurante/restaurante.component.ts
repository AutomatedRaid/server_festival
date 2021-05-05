import { Component, OnInit } from '@angular/core';
import {Taller} from "../../models/taller";
import {EventoService} from "../../services/evento.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {Restaurante} from "../../models/restaurante";
import {NgForm} from "@angular/forms";
import {Actuacion} from "../../models/actuacion";
import axios from "axios";

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
  images: {url:string | ArrayBuffer, id: number}[] = [];
  imgdelete: string | ArrayBuffer = "";
  iddelete = null;
  img1: String | ArrayBuffer = 'assets/images/img-not-found.png';
  img3: String | ArrayBuffer = 'assets/images/img-not-found.png';
  file1: any; file3: any;

  constructor(private eventService: EventoService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.ngModel = new Restaurante();
    this.restaurante = new Restaurante();
  }

  ngOnInit(): void {
    progressbar = document.getElementById('img-upload-bar');
    M.AutoInit();
    document.addEventListener('DOMContentLoaded', function () {
    });
    this.route.paramMap.subscribe(params => {
      if (params.has("id")) {
        this.eventService.getRestaurante(params.get("id") || "").subscribe(res => {
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
    for (let i = 0; i < this.restaurante.imagenes_carta.length; i++) {
      this.images.push({url: this.restaurante.imagenes_carta[i], id: i});
    }
    this.ngModel.nombre = this.restaurante.nombre;
    this.ngModel.localizacion = this.restaurante.localizacion;

    const time_inicio = <HTMLInputElement>document.getElementById('time-inicio');
    time_inicio.value = this.restaurante.horario.split(' - ')[0];
    this.horaIniciov = this.restaurante.horario.split(' - ')[0];
    const time_fin = <HTMLInputElement>document.getElementById('time-fin');
    time_fin.value = this.restaurante.horario.split(' - ')[1];
    this.horaFinv = this.restaurante.horario.split(' - ')[1];
    const localizacion = <HTMLInputElement>document.getElementById('localizacion');
    localizacion.value = this.restaurante.localizacion;

    const labels = ['label1','label2','label3','label4'];
    for (let i = 0; i < labels.length; i++) {
      const label = <HTMLLabelElement>document.getElementById(labels[i]);
      label.classList.add('active');
    }
    this.file1 = this.restaurante.imagen;
    this.file3 = this.restaurante.img_mapa;
    this.img1 = this.restaurante.imagen;
    this.img3 = this.restaurante.img_mapa;
  }

  async guardarRestaurante(actForm: NgForm) {
    if (actForm.value.nombre != '' && actForm.value.localizacion != '' && this.horaFinv != '' && this.horaIniciov != '') {
      this.toast('Guardando imagenes');
      const elems = document.getElementById('modal1');
      const instances = M.Modal.init(elems, {dismissible: false});
      instances.open();
      this.restaurante.nombre = actForm.value.nombre;
      this.restaurante.localizacion = actForm.value.localizacion;
      this.restaurante.horario = this.horaIniciov + ' - ' + this.horaFinv;
      for (let i = 0; i < this.files.length; i++) {
        progressbar.setAttribute('value', String(0));
        this.restaurante.imagenes_carta.push(await this.uploadimg(i, true));
      }
      progressbar.setAttribute('value', String(0));
      this.restaurante.imagen = await this.uploadimg(0,false, this.img1);
      progressbar.setAttribute('value', String(0));
      this.restaurante.img_mapa = await this.uploadimg(0, false, this.img3);
      this.route.paramMap.subscribe(params => {
        if (params.has("id")) {
          this.eventService.putRestaurante(params.get("id"), this.restaurante).subscribe(() => {
            this.toast('Restaurante guardado correctamente');
            this.router.navigate(['/']);
            instances.close();
          },error => {
            instances.close();
            this.toast('Error al guardar el restaurante');
          });
        } else {
          this.eventService.postRestaurante(this.restaurante).subscribe(() => {
            this.toast('Restaurante guardado correctamente');
            this.router.navigate(['/']);
            instances.close();
          },error => {
            instances.close();
            this.toast('Error al guardar el restaurante');
          });
        }
      });

    } else {
      this.toast('Debe completar todos los campos primero');
    }
  }

  async uploadimg(number: number, t: boolean, f?: any ) {
    let file: any;
    if (t) {
      file = this.files[number];
    }else {
      file = f;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const res = await axios.post(
      CLOUDINARY_URL,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress(e) {
          var progress = Math.round((e.loaded * 100.0) / e.total);
          progressbar.setAttribute('value', String(progress));
        }
      }
    );
    return res.data.url;
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

  deletemodalimg(i: {url: string | ArrayBuffer, id: number}) {
    this.imgdelete = i.url;
    this.iddelete = i.id;
    var elems = document.getElementById('eliminarmodal');
    var instances = M.Modal.init(elems);
    instances.open();
  }

  deleteimg(){
    this.images.splice(this.iddelete, 1);
    this.files.splice(this.iddelete, 1);
    for (let i = 0; i < this.images.length; i++) {
      this.images[i].id = i;
    }
  }

  onSelectFile(event, n: number) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      switch (n) {
        case 1:
          this.file1 = event.target.files[0];
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (eventt) => {
            this.img1 = eventt.target.result;
          };
          break;
        case 2:
          this.files.push(event.target.files[0]);
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (eventt) => {
            this.images.push({url: eventt.target.result, id: this.images.length});
          };
          break;
        case 3:
          this.file3 = event.target.files[0];
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (eventt) => {
            this.img3 = eventt.target.result;
          };
          break;
    }
    }
  }
}
