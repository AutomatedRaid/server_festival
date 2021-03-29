import {Component, OnInit} from '@angular/core';
import {FormControl, NgForm} from "@angular/forms";
import {Actuacion} from "../../models/actuacion";
import axios from 'axios';

declare const M: any;

let imageUploader;
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/djlgdcqhg/image/upload'
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

  constructor() {
    this.ngModel = new Actuacion();
  }

  ngOnInit() {
    imageUploader = document.getElementById('img-uploader');
    M.AutoInit();
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.timepicker');
      var instances = M.Timepicker.init(elems, {
        defaultTime: '9:00',
        twelveHour: false,
        i18n: {cancel: 'Cancelar', done: 'Aceptar'}
      });
    });
  }

  guardarActuacion(actForm: NgForm) {
    console.log(actForm.value);
    console.log(this.horaIniciov);
    console.log(this.horaFinv);
    this.uploadimg(1);
    this.uploadimg(2);
  }

  addArtistas(artista: HTMLInputElement) {
    if (artista.value != "" && artista.value != null) {
      this.artistas.push(artista.value);
      artista.value = "";
      console.log(this.artistas);
    }
  }

  removeArtistas(a: string) {
    for (let i = 0; i < this.artistas.length; i++) {
      if(this.artistas[i] == a){
        this.artistas.splice(i,1);
        console.log(this.artistas);
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
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (eventt) => {
        console.log(eventt);
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
          let progress = Math.round((e.loaded * 100.0) / e.total);
          console.log(progress);
        }
      }
    );
    console.log(res);
  }
}
