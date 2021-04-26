import {Component, OnInit} from '@angular/core';
import {EventoService} from "../../services/evento.service";
import {Actuacion} from "../../models/actuacion";
import {Taller} from "../../models/taller";
import axios from "axios";
import {Mapa} from "../../models/mapa";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

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
  faqs: {_id: String, question: String, answer: String}[] = [];
  comollegar: {_id: String, nombre: String, ubicompleta: String, urlmapa: String, imgmapa: String}[] = [];
  alertHead: string;
  alertbody: string;
  idToEliminate: string;
  act0tal1 = null;
  img: String | ArrayBuffer = 'assets/img-not-found.png';
  alertBody = '';
  private idFAQEdit = '';
  private file1: any;
  private idComoLlegarEdit: any;

  constructor(private eventoService: EventoService) {
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
    this.eventoService.getFAQs().subscribe( res => {
      this.faqs = res as {_id:String, question: String, answer: String}[];
    });
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
        M.toast({html: resaux.message, classes: 'rounded'});
        for (let i = 0; i < this.actuaciones.length; i++) {
          if (this.actuaciones[i]._id == this.idToEliminate) {
            this.actuaciones.splice(i, 1);
          }
        }
      });
    } else {
      this.eventoService.deleteTaller(this.idToEliminate).subscribe(res => {
        const resaux = res as { message: string };
        M.toast({html: resaux.message, classes: 'rounded'});
        for (let i = 0; i < this.talleres.length; i++) {
          if (this.talleres[i]._id == this.idToEliminate) {
            this.talleres.splice(i, 1);
          }
        }
      });
    }

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

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.file1 = event.target.files[0];
    }
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (eventt) => {
      this.img = eventt.target.result;
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
      M.toast({html: 'Mapa guardado correctamente', classes: 'rounded'});
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
          M.toast({html: 'FAQ guardada', classes: 'rounded'});
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
          M.toast({html: 'FAQ guardada', classes: 'rounded'});
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
      M.toast({html: 'Faltan datos', classes: 'rounded'});
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

  guardarComoLlegar(nombre: HTMLTextAreaElement, ubicompleta: HTMLTextAreaElement, urlmapa: HTMLTextAreaElement, imgmapa: HTMLTextAreaElement) {
    if (nombre.value != "" && ubicompleta.value != '' && urlmapa.value != '' && imgmapa.value != '') {
      var elems = document.getElementById('modalComoLlegar');
      var instances = M.Modal.init(elems, {dismissible: false});
      if (this.idComoLlegarEdit == '') {
        this.eventoService.postComoLlegar({nombre: nombre.value, ubicompleta: ubicompleta.value, urlmapa: urlmapa.value, imgmapa: imgmapa.value}).subscribe(res => {
          M.toast({html: 'Como llegar guardado', classes: 'rounded'});
          this.comollegar.push({
            _id: (res as { message: String }).message.split(', ')[1],
            nombre: nombre.value,
            ubicompleta: ubicompleta.value,
            urlmapa: urlmapa.value,
            imgmapa: imgmapa.value
          });
          nombre.value = '';
          ubicompleta.value = '';
          urlmapa.value = '';
          imgmapa.value = '';
          this.idComoLlegarEdit = '';
        });
      } else {
        this.eventoService.putComoLlegar(this.idComoLlegarEdit, {nombre: nombre.value, ubicompleta: ubicompleta.value, urlmapa: urlmapa.value, imgmapa: imgmapa.value}).subscribe(() => {
          M.toast({html: 'Como llegar guardado', classes: 'rounded'});
          for (let i = 0; i <this.comollegar.length ; i++) {
            if(this.comollegar[i]._id == this.idComoLlegarEdit){
              this.comollegar[i].nombre = nombre.value;
              this.comollegar[i].ubicompleta = ubicompleta.value;
              this.comollegar[i].urlmapa = urlmapa.value;
              this.comollegar[i].imgmapa = imgmapa.value;
              break;
            }
          }
          nombre.value = '';
          ubicompleta.value = '';
          urlmapa.value = '';
          imgmapa.value = '';
          this.idComoLlegarEdit = '';
        });
      }
      instances.close();
    } else
      M.toast({html: 'Faltan datos', classes: 'rounded'});
  }

  abrirComoLlegar(){
    var elems = document.getElementById('modalComoLlegar');
    var instances = M.Modal.init(elems,{dismissible:false});
    instances.open();
  }
}
