import {Component, OnInit} from '@angular/core';
import { NgForm} from "@angular/forms";
import {Taller} from "../../models/taller";
import axios from 'axios';
import {EventoService} from "../../services/evento.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

declare const M: any;

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
  fecha = '';
  img: String | ArrayBuffer = 'assets/images/img-not-found.png'; img2: String | ArrayBuffer = 'assets/images/img-not-found.png';
  private file1: any; private file2: any;
  taller: Taller;
  alertBody = '';
  duplicate: Boolean;

  constructor(private eventService: EventoService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.ngModel = new Taller();
    this.duplicate = false
  }

  ngOnInit() {
    progressbar = document.getElementById('img-upload-bar');
    M.AutoInit();
    document.addEventListener('DOMContentLoaded', function () {
    });
    this.route.paramMap.subscribe(params => {
      let badid = false;
      if (params.has("duplicate")) {
        this.duplicate = true;
        if (params.get("duplicate") != "duplicate"){
          badid = true;
          this.router.navigate(["/"]);
        }
      }
      if (params.has("id") && !badid) {
        this.eventService.getTaller(params.get("id") || "").subscribe(res => {
          this.taller = res as Taller;
          this.inicializarDatos();
        }, () => {
          this.router.navigate(["/"]);
        });
      }
    });
    const elems = document.querySelectorAll('.timepicker');
    M.Timepicker.init(elems, {
      defaultTime: '9:00',
      twelveHour: false,
      i18n: {cancel: 'Cancelar', done: 'Aceptar'}
    });
    const elems2 = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems2, {
      i18n: {cancel: 'Cancelar', done: 'Aceptar'},
      format: 'dd-mm-yyyy',
    });
  }

  private inicializarDatos() {
    this.ngModel.nombre = this.taller.nombre;
    this.ngModel.descripcion = this.taller.descripcion;
    this.ngModel.ubicacion = this.taller.ubicacion;
    const labels = ['label1','label2','label3','label4','label5', 'label6'];
    for (let i = 0; i < labels.length; i++) {
      const label = <HTMLLabelElement>document.getElementById(labels[i]);
      label.classList.add('active');
    }
    const fecha = <HTMLInputElement>document.getElementById('fecha');
    fecha.value = this.taller.fecha;
    this.fecha = this.taller.fecha;
    const time_inicio = <HTMLInputElement>document.getElementById('time-inicio');
    time_inicio.value = this.taller.horario.split(' - ')[0];
    this.horaIniciov = this.taller.horario.split(' - ')[0];
    const time_fin = <HTMLInputElement>document.getElementById('time-fin');
    time_fin.value = this.taller.horario.split(' - ')[1];
    this.horaFinv = this.taller.horario.split(' - ')[1];
    this.img = this.taller.img;
    this.img2 = this.taller.img_mapa;
    this.ngModel.img = this.taller.img;
    this.ngModel.img_mapa = this.taller.img_mapa;
  }

  async guardarTaller(actForm: NgForm) {
    if (actForm.value.nombre != '' && actForm.value.descripcion != '' && actForm.value.ubicacion != ''  && this.fecha != '' && this.horaFinv != '' && this.fecha != '' && this.horaIniciov != '') {
      const elems = document.getElementById('modal1');
      const instances = M.Modal.init(elems, {dismissible:false});
      instances.open();
      const taller: Taller = new Taller();
      taller.nombre = actForm.value.nombre;
      taller.ubicacion = actForm.value.ubicacion;
      taller.horario = this.horaIniciov + ' - ' + this.horaFinv;
      taller.fecha = this.fecha;
      taller.descripcion = actForm.value.descripcion;
      let err = false;
      try {
        if(this.file1 != null) {
          this.alertBody = 'Guardando imagen: ' + this.file1.name;
          taller.img = await this.uploadimg(this.file1);
        }else{
          taller.img = this.ngModel.img;
        }
        if(this.file2 != null){
          progressbar.setAttribute('value', String(0));
          this.alertBody = 'Guardando imagen: ' + this.file2.name;
          taller.img_mapa = await this.uploadimg(this.file2);
        }else {
          taller.img_mapa = this.ngModel.img_mapa;
        }
      }catch (e) {
        err = true;
        instances.close();
        this.toast('Hubo un error inesperado al guardar las imagenes');
      }
      if(!err) {
        this.route.paramMap.subscribe(params => {
          if (params.has("id")) {
            if (!this.duplicate) {
              this.eventService.putTaller(params.get("id"), taller).subscribe(() => {
                this.toast('Taller guardado correctamente');
                this.router.navigate(['/']);
                instances.close();
              });
            }else {
              this.eventService.postTaller(taller).subscribe(() => {
                this.toast('Taller guardado correctamente');
                this.router.navigate(['/']);
                instances.close();
              });
            }
          } else {
            if(this.file1 != null && this.file2 != null) {
              this.eventService.postTaller(taller).subscribe(() => {
                this.toast('Taller guardado correctamente');
                this.router.navigate(['/']);
                instances.close();
              });
            }else{this.toast('Faltan datos')}
          }
        });
      }
    } else {
      this.toast('Debe completar todos los campos primero');
    }
  }

  onSelectFile(event, n) {
    if (event.target.files[0].size < 2097152 && event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/jpg' || event.target.files[0].type == 'image/jpeg') {
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
    }else{
      this.toast('Imagen incorrecta, debe pesar menos de 2Mb y ser .png .jpg .jpeg');
    }
  }

  async uploadimg(file: File) {
    let e = new FormData();
    e.append('image', file);
    let url = this.eventService.URL_API_ADMIN+'/image';
    //let url = 'http://localhost:3000/api/adminapp/image';
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
