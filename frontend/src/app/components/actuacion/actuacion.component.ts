import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Actuacion} from "../../models/actuacion";
import axios from 'axios';
import {EventoService} from "../../services/evento.service";
import {ActivatedRoute, Router} from "@angular/router";

declare const M: any;

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/djlgdcqhg/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'rdzzccwc';
let progressbar: any = null;

@Component({
  selector: 'app-actuacion',
  templateUrl: './actuacion.component.html',
  styleUrls: ['./actuacion.component.css']
})

export class ActuacionComponent implements OnInit {

  ngModel: Actuacion;
  horaIniciov = '';
  horaFinv = '';
  artistas: String[] = [];
  img: String | ArrayBuffer = 'assets/img-not-found.png'; img2: String | ArrayBuffer = 'assets/img-not-found.png';
  private file1: any; private file2: any;
  actuacion: Actuacion;
  alertBody = '';
  editando = false;

  constructor(private eventService: EventoService, private route: ActivatedRoute,  private router: Router) {
    this.ngModel = new Actuacion();
  }

  ngOnInit() {
    progressbar = document.getElementById('img-upload-bar');
    M.AutoInit();
    document.addEventListener('DOMContentLoaded', function () {
      const elems = document.querySelectorAll('.timepicker');
      M.Timepicker.init(elems, {
        defaultTime: '9:00',
        twelveHour: false,
        i18n: {cancel: 'Cancelar', done: 'Aceptar'}
      });
    });
    this.route.paramMap.subscribe(params => {
      if (params.has("id")) {
        this.editando = true;
        this.eventService.getActuacion(params.get("id") || "").subscribe(res => {
          this.actuacion = res as Actuacion;
          this.inicializarDatos();
        });
      }
    });
  }

  async guardarActuacion(actForm: NgForm) {
    if (actForm.value.nombre != '' && actForm.value.descripcion != '' && this.horaFinv != '' && this.horaIniciov != '' && this.file1 != null && this.file2 != null && this.artistas.length > 0) {
      this.alertBody = 'Guardando imagen: ' + this.file1.name;
      const elems = document.getElementById('modal1');
      const instances = M.Modal.init(elems, {dismissible:false});
      instances.open();
      const actuacion: Actuacion = new Actuacion();
      actuacion.nombre = actForm.value.nombre;
      actuacion.horario = this.horaIniciov + ' - ' + this.horaFinv;
      actuacion.artistas = this.artistas;
      actuacion.descripcion = actForm.value.descripcion;
      actuacion.img = await this.uploadimg(1);
      this.alertBody = 'Guardando imagen: ' + this.file2.name;
      progressbar.setAttribute('value', String(0));
      actuacion.img_mapa = await this.uploadimg(2);

      this.route.paramMap.subscribe(params => {
        if (params.has("id")) {
          this.eventService.putActuacion(params.get("id"), actuacion).subscribe(() => {
            M.toast({html: 'Actuacion guardada correctamente', classes: 'rounded'});
            this.router.navigate(['/']);
            instances.close();
          });
        }
        else {
          this.eventService.postActuacion(actuacion).subscribe(() => {
            M.toast({html: 'Actuacion guardada correctamente', classes: 'rounded'});
            this.router.navigate(['/']);
            instances.close();
          });
        }
      });
    } else {
      M.toast({html: 'Debe completar todos los campos primero!', classes: 'rounded'});
    }
  }

  addArtistas(artista: HTMLInputElement) {
    if (artista.value != "" && artista.value != null) {
      if (artista.value.length <= 25) {
        this.artistas.push(artista.value);
      artista.value = "";
      }else {
        M.toast({html: 'Máximo 25 carácteres', classes: 'rounded'});
      }
    }
  }

  removeArtistas(a: string) {
    for (let i = 0; i < this.artistas.length; i++) {
      if(this.artistas[i] == a){
        this.artistas.splice(i,1);
        break;
      }
    }
  }

  onSelectFile(event, number: number) {
    if (event.target.files && event.target.files[0]) {
      switch (number) {
        case 1:
          this.file1 = event.target.files[0];
          break;
        case 2:
          this.file2 = event.target.files[0];
          break;
      }
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (eventt) => {
        switch (number) {
          case 1:
            this.img = eventt.target.result;
            break;
          case 2:
            this.img2 = eventt.target.result;
            break;
        }
      }
    }
  }

  async uploadimg(number: number) {
    let file: any;
    if (number === 1) {
      file = this.file1;
    } else {
      file = this.file2;
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

  private inicializarDatos() {
    this.ngModel.nombre = this.actuacion.nombre;
    this.ngModel.descripcion = this.actuacion.descripcion;
    const time_inicio = <HTMLInputElement>document.getElementById('time-inicio');
    time_inicio.value = this.actuacion.horario.split(' - ')[0];
    const labels = ['label1','label2','label3','label4'];
    for (let i = 0; i < labels.length; i++) {
      const label = <HTMLLabelElement>document.getElementById(labels[i]);
      label.classList.add('active');
    }

    this.horaIniciov = this.actuacion.horario.split(' - ')[0];
    const time_fin = <HTMLInputElement>document.getElementById('time-fin');
    time_fin.value = this.actuacion.horario.split(' - ')[1];
    this.horaFinv = this.actuacion.horario.split(' - ')[1];
    this.artistas = this.actuacion.artistas;
    console.log(this.actuacion.horario);
    this.file1 = this.actuacion.img;
    this.file2 = this.actuacion.img_mapa;
    this.img = this.actuacion.img;
    this.img2 = this.actuacion.img_mapa;
    console.log(this.horaIniciov);
    console.log(this.horaFinv);
  }
}
