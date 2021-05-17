import {Component, OnInit} from '@angular/core';
import { NgForm} from "@angular/forms";
import {Taller} from "../../models/taller";
import axios from 'axios';
import {EventoService} from "../../services/evento.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

declare const M: any;

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/djlgdcqhg/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'rdzzccwc';
let progressbar: any = null;

@Component({
  selector: 'app-taller',
  templateUrl: './taller.component.html',
  styleUrls: ['./taller.component.css']
})

export class TallerComponent implements OnInit {

  ngModel: Taller;
  horaIniciov = '';
  horaFinv = '';
  img: String | ArrayBuffer = 'assets/images/img-not-found.png'; img2: String | ArrayBuffer = 'assets/images/img-not-found.png';
  private file1: any; private file2: any;
  taller: Taller;
  alertBody = '';

  constructor(private eventService: EventoService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.ngModel = new Taller();
  }

  ngOnInit() {
    progressbar = document.getElementById('img-upload-bar');
    M.AutoInit();
    document.addEventListener('DOMContentLoaded', function () {
    });
    this.route.paramMap.subscribe(params => {
      if (params.has("id")) {
        this.eventService.getTaller(params.get("id") || "").subscribe(res => {
          this.taller = res as Taller;
          this.inicializarDatos();
        });
      }
    });
    const elems = document.querySelectorAll('.timepicker');
    M.Timepicker.init(elems, {
      defaultTime: '9:00',
      twelveHour: false,
      i18n: {cancel: 'Cancelar', done: 'Aceptar'}
    });
  }

  private inicializarDatos() {
    this.ngModel.nombre = this.taller.nombre;
    this.ngModel.descripcion = this.taller.descripcion;
    this.ngModel.ubicacion = this.taller.ubicacion;
    const labels = ['label1','label2','label3','label4','label5'];
    for (let i = 0; i < labels.length; i++) {
      const label = <HTMLLabelElement>document.getElementById(labels[i]);
      label.classList.add('active');
    }
    const time_inicio = <HTMLInputElement>document.getElementById('time-inicio');
    time_inicio.value = this.taller.horario.split(' - ')[0];
    this.horaIniciov = this.taller.horario.split(' - ')[0];
    const time_fin = <HTMLInputElement>document.getElementById('time-fin');
    time_fin.value = this.taller.horario.split(' - ')[1];
    this.horaFinv = this.taller.horario.split(' - ')[1];
    this.img = this.taller.img;
    this.img2 = this.taller.img_mapa;
    this.file1 = this.taller.img;
    this.file2 = this.taller.img_mapa;
  }

  async guardarTaller(actForm: NgForm) {
    if (actForm.value.nombre != '' && actForm.value.descripcion != '' && actForm.value.ubicacion != '' && this.horaFinv != '' && this.horaIniciov != '' && this.file1 != null && this.file2 != null) {
      this.alertBody = 'Guardando imagen: ' + this.file1.name;
      const elems = document.getElementById('modal1');
      const instances = M.Modal.init(elems, {dismissible:false});
      instances.open();
      const taller: Taller = new Taller();
      taller.nombre = actForm.value.nombre;
      taller.ubicacion = actForm.value.ubicacion;
      taller.horario = this.horaIniciov + ' - ' + this.horaFinv;
      taller.descripcion = actForm.value.descripcion;
      taller.img = await this.uploadimg(this.file1);
      this.alertBody = 'Guardando imagen: ' + this.file2.name;
      progressbar.setAttribute('value', String(0));
      taller.img_mapa = await this.uploadimg(this.file2);
      this.route.paramMap.subscribe(params => {
        if (params.has("id")) {
          this.eventService.putTaller(params.get("id"), taller).subscribe(() => {
            this.toast('Taller guardado correctamente');
            this.router.navigate(['/']);
            instances.close();
          });
        }
        else {
          this.eventService.postTaller(taller).subscribe(() => {
            this.toast('Taller guardado correctamente');
            this.router.navigate(['/']);
            instances.close();
          });
        }
      });
    } else {
      this.toast('Debe completar todos los campos primero');
    }
  }

  onSelectFile(event, n) {
    if (event.target.files && event.target.files[0]) {
      switch (n) {
        case 1:
          this.file1 = event.target.files[0];
          const reader = new FileReader();
          reader.readAsDataURL(this.file1);
          reader.onload = (eventt) => {
            this.img = eventt.target.result;
          };
          break;
        case 2:
          this.file2 = event.target.files[0];
          if (this.file2 == null){
            this.file2 = event.target.files[0];
          }
          const reader2 = new FileReader();
          reader2.readAsDataURL(this.file2);
          reader2.onload = (eventt) => {
            this.img2 = eventt.target.result;
          };
          break;
      }
    }
  }

  async uploadimg(file: File) {
    let e = new FormData();
    e.append('image', file);
    let url = 'http://localhost:3000/api/adminapp/image';
    const res = await axios.post(url, e, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress(e) {
          let progress = Math.round((e.loaded * 100.0) / e.total);
          progressbar.setAttribute('value', String(progress));
        }
      }
    );
    return res.data;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toast(message: string){
    M.toast({html: message, classes: 'rounded'});
  }
}
