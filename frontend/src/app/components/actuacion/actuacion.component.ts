import {Component, OnInit} from '@angular/core';
import {FormControl, NgForm} from "@angular/forms";
import {Actuacion} from "../../models/actuacion";

declare const M: any;

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

  constructor() {
    this.ngModel = new Actuacion();
  }

  ngOnInit(): void {
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
}
