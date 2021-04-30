import {Component, OnInit} from '@angular/core';
import {EventoService} from "../../services/evento.service";
import {Actuacion} from "../../models/actuacion";
import {Taller} from "../../models/taller";
import axios from "axios";
import {Mapa} from "../../models/mapa";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {Comollegar} from "../../models/comollegar";
import {AuthService} from "../../services/auth.service";
import {Restaurante} from "../../models/restaurante";

declare const M: any;
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/djlgdcqhg/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'rdzzccwc';
let progressbar: any = null;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  actuaciones: Actuacion[] = [];
  talleres: Taller[] = [];
  restaurantes: Restaurante[] = [];

  faqs: {_id: String, question: String, answer: String}[] = [];
  ngModel: Comollegar;
  act0tal1 = null;

  img: String | ArrayBuffer = 'assets/img-not-found.png';
  imgcmll: String | ArrayBuffer = 'assets/img-not-found.png';
  private file1: any;

  idToEliminate: string;
  alertHead: string;
  alertbody: string;
  alertBody = '';
  private idFAQEdit = '';

  constructor(private eventoService: EventoService, private authService: AuthService,  private router: Router) {
    this.ngModel = new Comollegar();
  }

  ngOnInit(): void {
    progressbar = document.getElementById('img-upload-bar');
    M.AutoInit();
    this.eventoService.getActuaciones().subscribe(res => {
      this.actuaciones = res as Actuacion[];
    });
    this.eventoService.getTalleres().subscribe(res => {
      this.talleres = res as Taller[];
    });
    this.eventoService.getRestaurantes().subscribe(res => {
      this.restaurantes = res as Restaurante[];
    });
    this.eventoService.getFAQs().subscribe( res => {
      this.faqs = res as {_id:String, question: String, answer: String}[];
    });
    this.eventoService.getMapa().subscribe( res => {
      const mapa = res as Mapa;
      if(mapa.imagen != null && mapa.imagen != ''){
        this.img = mapa.imagen;
      }
    });
    this.eventoService.getComoLlegar().subscribe(res =>{
      this.ngModel= res as Comollegar;
      if(this.ngModel.img != null && this.ngModel.img != ''){
        this.imgcmll = this.ngModel.img;
      }
      const labels = ['nombrelbl','ubicompletalbl', 'urlmapalbl'];
      for (let i = 0; i < labels.length; i++) {
        const label = <HTMLLabelElement>document.getElementById(labels[i]);
        label.classList.add('active');
      }
    });
  }

  async uploadimg() {
    const formData = new FormData();
    formData.append('file', this.file1);
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

  onSelectFile(event, n) {
    if (event.target.files && event.target.files[0]) {
      switch (n) {
        case 1:
          this.file1 = event.target.files[0];
          const reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (eventt) => {
              this.img = eventt.target.result;
          };
          break;
        case 2:
          this.file1 = event.target.files[1];
          const reader2 = new FileReader();
          reader2.readAsDataURL(event.target.files[0]);
          reader2.onload = (eventt) => {
            this.imgcmll = eventt.target.result;
          };
          break;
      }
    }
  }

  async guardarCambios() {
    this.alertBody = 'Guardando imagen: ' + this.file1.name;
    const elems = document.getElementById('modal2');
    const instances = M.Modal.init(elems, {dismissible: false});
    instances.open();
    const mapa: Mapa = new Mapa();
    mapa.imagen = await this.uploadimg();
    this.eventoService.postMapa(mapa).subscribe(() => {
      this.toast('Mapa guardado correctamente');
      instances.close();
    });

  }

  addFAQ() {
    var elems = document.getElementById('modalFAQs');
    var instances = M.Modal.init(elems,{dismissible:false});
    instances.open();
  }

  guardarFAQs(question: HTMLTextAreaElement, answer: HTMLTextAreaElement) {
    if (question.value != "" && answer.value != '') {
      var elems = document.getElementById('modalFAQs');
      var instances = M.Modal.init(elems, {dismissible: false});
      if (this.idFAQEdit == '') {
        this.eventoService.postFAQs({question: question.value, answer: answer.value}).subscribe(res => {
          this.toast('FAQ guardada');
          this.faqs.push({
            _id: (res as { message: String }).message.split(', ')[1],
            question: question.value,
            answer: answer.value
          });
          question.value = '';
          answer.value = '';
          this.idFAQEdit = '';
        });
      } else {
        this.eventoService.putFAQs(this.idFAQEdit, {question: question.value, answer: answer.value}).subscribe(() => {
          this.toast('FAQ guardada');
          for (let i = 0; i <this.faqs.length ; i++) {
            if(this.faqs[i]._id == this.idFAQEdit){
              this.faqs[i].question = question.value;
              this.faqs[i].answer = answer.value;
              break;
            }
          }
          question.value = '';
          answer.value = '';
          this.idFAQEdit = '';
        });
      }
      instances.close();
    } else
      this.toast('Faltan datos');
  }

  editFAQ(_id:string, question: HTMLTextAreaElement, answer: HTMLTextAreaElement) {
    this.eventoService.getFAQ(_id).subscribe(res => {
      const r = res as {_id: string, question: string, answer: string};
      question.value = r.question;
      answer.value = r.answer;
      const questionlbl = <HTMLLabelElement>document.getElementById('questionlbl');
      questionlbl.classList.add('active');
      const answerlbl = <HTMLLabelElement>document.getElementById('answerlbl');
      answerlbl.classList.add('active');
      this.idFAQEdit = r._id;
    });
    var elems = document.getElementById('modalFAQs');
    var instances = M.Modal.init(elems,{dismissible:false});
    instances.open();
  }

  deleteFAQ(id: string) {
    this.eventoService.deleteFAQs(id).subscribe(res => {
      const resaux = res as { message: string };
      for (let i = 0; i < this.faqs.length; i++) {
        if (this.faqs[i]._id == id) {
          this.faqs.splice(i, 1);
          M.toast({html: resaux.message, classes: 'rounded'});
        }
      }
    });
  }

  guardarComoLlegar(cmllForm: NgForm) {
    if (cmllForm.value.nombre != '' && cmllForm.value.ubicompleta != '' && cmllForm.value.urlmapa != '' && this.imgcmll != '' ) {
      if (this.ngModel._id == '') {
        this.eventoService.postComoLlegar(this.ngModel).subscribe(res => {
          this.toast('Como llegar guardado');
        });
      }else {
        this.eventoService.putComoLlegar(this.ngModel._id, this.ngModel).subscribe(res => {
          this.toast('Como llegar guardado');
        });
      }
    } else
    this.toast('Faltan datos');
  }

  confirmdelete(_id: string, nombre: string, table: boolean) {
    this.idToEliminate = _id;
    this.act0tal1 = table;
    this.alertHead = 'Eliminar "' + nombre + '" ?';
    if (table)
      this.alertbody = 'Estas seguro de eliminar el taller "' + nombre + '" de forma permanente?';
    else
      this.alertbody = 'Estas seguro de eliminar la actuacion "' + nombre + '" de forma permanente?';
    var elems = document.getElementById('modal1');
    var instances = M.Modal.init(elems);
    instances.open();
  }

  delete() {
    if (!this.act0tal1) {
      this.eventoService.deleteActuacion(this.idToEliminate).subscribe(res => {
        const resaux = res as { message: string };
        this.toast(resaux.message);
        for (let i = 0; i < this.actuaciones.length; i++) {
          if (this.actuaciones[i]._id == this.idToEliminate) {
            this.actuaciones.splice(i, 1);
          }
        }
      });
    } else {
      this.eventoService.deleteTaller(this.idToEliminate).subscribe(res => {
        const resaux = res as { message: string };
        this.toast(resaux.message);
        for (let i = 0; i < this.talleres.length; i++) {
          if (this.talleres[i]._id == this.idToEliminate) {
            this.talleres.splice(i, 1);
          }
        }
      });
    }
  }

  toast(message: string){
    M.toast({html: message, classes: 'rounded'});
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
