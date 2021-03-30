import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Actuacion} from "../../models/actuacion";
import axios from 'axios';
import {EventoService} from "../../services/evento.service";

declare const M: any;

let imageUploader;
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/djlgdcqhg/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'rdzzccwc';

@Component({
  selector: 'app-actuacion',
  templateUrl: './actuacion.component.html',
  styleUrls: ['./actuacion.component.css']
})

export class ActuacionComponent implements OnInit {

  ngModel: Actuacion;
  horaIniciov = '';
  horaFinv = '';
  artistas: string[] = [];
  img: string | ArrayBuffer = 'assets/img-not-found.png';
  img2: string | ArrayBuffer = 'assets/img-not-found.png';
  private file1: any;
  private file2: any;

  constructor(private eventService: EventoService) {
    this.ngModel = new Actuacion();
  }

  ngOnInit() {
    imageUploader = document.getElementById('img-uploader');
    M.AutoInit();
    document.addEventListener('DOMContentLoaded', function () {
      const elems = document.querySelectorAll('.timepicker');
      M.Timepicker.init(elems, {
        defaultTime: '9:00',
        twelveHour: false,
        i18n: {cancel: 'Cancelar', done: 'Aceptar'}
      });
    });
  }

  async guardarActuacion(actForm: NgForm) {
    if (actForm.value.nombre != '' && actForm.value.descripcion != '' && this.horaFinv != '' && this.horaIniciov != '' && this.file1 != null && this.file2 != null && this.artistas.length > 0) {
      const actuacion: Actuacion = new Actuacion();
      actuacion.nombre = actForm.value.nombre;
      actuacion.horario = this.horaIniciov + ' - ' + this.horaFinv;
      actuacion.artistas = this.artistas;
      actuacion.descripcion = actForm.value.descripcion;
      actuacion.img = await this.uploadimg(1);
      actuacion.img_mapa = await this.uploadimg(2);
      this.eventService.postActuacion(actuacion).subscribe(() => {
        M.toast({html: 'Serie guardada correctamente', classes: 'rounded'});
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
        }/**,
        onUploadProgress(e) {
          let progress = Math.round((e.loaded * 100.0) / e.total);
        }**/
      }
    );
    return res.data.url;
  }
}
