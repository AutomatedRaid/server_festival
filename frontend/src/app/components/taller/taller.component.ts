import {Component, OnInit} from '@angular/core';
import {FormControl, NgForm} from "@angular/forms";
import {Taller} from "../../models/taller";
import axios from 'axios';
import {EventoService} from "../../services/evento.service";
import {Actuacion} from "../../models/actuacion";
import {ActivatedRoute, Router} from "@angular/router";

declare const M: any;

let imageUploader;
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/djlgdcqhg/image/upload'
const CLOUDINARY_UPLOAD_PRESET = 'rdzzccwc';

@Component({
  selector: 'app-taller',
  templateUrl: './taller.component.html',
  styleUrls: ['./taller.component.css']
})

export class TallerComponent implements OnInit {

  ngModel: Taller;
  horaIniciov = '';
  horaFinv = '';
  idTaller: number;
  img: string | ArrayBuffer = 'assets/img-not-found.png';
  img2: string | ArrayBuffer = 'assets/img-not-found.png';
  private file1: any;
  private file2: any;
  taller: Taller;


  constructor(private eventService: EventoService, private route: ActivatedRoute, private router: Router) {
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
    this.route.paramMap.subscribe(params => {
      if (params.has("id")) {
        console.log(params.get("id"));
        this.eventService.getTaller(params.get("id") || "").subscribe(res => {
          this.taller = res as Taller;
          this.inicializarDatos();
        });
      }
    });
  }

  async guardarTaller(actForm: NgForm) {
    if (actForm.value.nombre != '' && actForm.value.descripcion != '' && this.horaFinv != '' && this.horaIniciov != '' && this.file1 != null && this.file2 != null) {
      const taller: Taller = new Taller();
      taller.nombre = actForm.value.nombre;
      taller.horario = this.horaIniciov + ' - ' + this.horaFinv;
      taller.descripcion = actForm.value.descripcion;
      taller.img = await this.uploadimg(1);
      taller.img_mapa = await this.uploadimg(2);
      this.eventService.postTaller(taller).subscribe(res => {
        M.toast({html: 'Taller guardado correctamente', classes: 'rounded'});
      });
    } else {
      M.toast({html: 'Debe completar todos los campos primero!', classes: 'rounded'});
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
        }
      }
    );
    return res.data.url;
  }

  private inicializarDatos() {
    this.ngModel.nombre = this.taller.nombre;
    this.ngModel.descripcion = this.taller.descripcion;
    this.horaIniciov = this.taller.horario.split(' - ')[0];
    this.horaFinv = this.taller.horario.split(' - ')[1];
    console.log(this.taller.horario);
    // @ts-ignore
    this.img = this.taller.img;
    // @ts-ignore
    this.img2 = this.taller.img_mapa;
    console.log(this.horaIniciov);
    console.log(this.horaFinv);
  }
}
