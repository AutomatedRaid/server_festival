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
import {DatosContacto} from "../../models/datosContacto";

declare const M: any;

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
  datosContacto: DatosContacto;

  faqs: { _id: String, question: String, answer: String }[] = [];
  ngModel: Comollegar;
  act1tal2rest3 = 0;

  img: String | ArrayBuffer = 'assets/images/img-not-found.png';
  imgcmll: String | ArrayBuffer = 'assets/images/img-not-found.png';
  private file1: any;
  private file2: any;

  idToEliminate: string;
  alertHead: string;
  alertbody: string;
  alertBody = '';
  idFAQEdit = '';

  faqsinstance: any;

  constructor(private eventoService: EventoService, private authService: AuthService,  private router: Router) {
    this.ngModel = new Comollegar("", "", "", "", "");
    this.datosContacto = new DatosContacto("","","");
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
    this.eventoService.getFAQs().subscribe(res => {
      this.faqs = res as { _id: String, question: String, answer: String }[];
    });
    this.eventoService.getDatosContacto().subscribe(res => {
      this.datosContacto = res as DatosContacto;
    });
    this.eventoService.getMapa().subscribe(res => {
      const mapa = res as Mapa;
      if (mapa.imagen != null && mapa.imagen != '') {
        this.img = mapa.imagen;
      }
    });
    this.eventoService.getComoLlegar().subscribe(res =>{
      this.ngModel= res as Comollegar;
      if(this.ngModel != null) {
        if (this.ngModel.img != null && this.ngModel.img != '') {
          this.imgcmll = this.ngModel.img;
        }
      }else {
        this.ngModel = new Comollegar("", "", "", "", "");
      }
      const labels = ['nombrelbl', 'ubicompletalbl', 'urlmapalbl'];
      for (let i = 0; i < labels.length; i++) {
        const label = <HTMLLabelElement>document.getElementById(labels[i]);
        label.classList.add('active');
      }
    });

    const elems = document.getElementById('modalFAQs');
    this.faqsinstance = M.Modal.init(elems, {dismissible: false});
  }

  async uploadimg(file: File) {
    let e = new FormData();
    e.append('image', file);
    let url = this.eventoService.URL_API_ADMIN+'/image';
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
            this.imgcmll = eventt.target.result;
          };
          break;
      }
    }else{
      this.toast('Imagen incorrecta, debe pesar menos de 2Mb y ser .png .jpg .jpeg');
    }
  }

  async guardarCambios() {
    if(this.file1 != null) {
      this.alertBody = 'Guardando imagen: ' + this.file1.name;
      const elems = document.getElementById('modal2');
      const instances = M.Modal.init(elems, {dismissible: false});
      instances.open();
      const mapa: Mapa = new Mapa();
      let err = false;
      try {
        mapa.imagen = await this.uploadimg(this.file1);
      } catch (e) {
        err = true;
        instances.close();
        this.toast('Hubo un error inesperado')
      }
      if (!err) {
        this.eventoService.postMapa(mapa).subscribe(() => {
          this.toast('Mapa guardado correctamente');
          instances.close();
          this.file1 = null;
        });
      }
    }else{
      this.toast('No se han detectdo cambios')
    }
  }

  addFAQ() {
    this.faqsinstance.open();
  }

  guardarFAQs(question: HTMLTextAreaElement, answer: HTMLTextAreaElement) {
    if (question.value != "" && answer.value != '') {
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
          for (let i = 0; i < this.faqs.length; i++) {
            if (this.faqs[i]._id == this.idFAQEdit) {
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
      this.faqsinstance.close();
    } else
      this.toast('Faltan datos');
  }

  editFAQ(_id: string, question: HTMLTextAreaElement, answer: HTMLTextAreaElement) {
    this.eventoService.getFAQ(_id).subscribe(res => {
      const r = res as { _id: string, question: string, answer: string };
      question.value = r.question;
      answer.value = r.answer;
      const questionlbl = <HTMLLabelElement>document.getElementById('questionlbl');
      questionlbl.classList.add('active');
      const answerlbl = <HTMLLabelElement>document.getElementById('answerlbl');
      answerlbl.classList.add('active');
      this.idFAQEdit = r._id;
    });
    this.faqsinstance.open();
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

  async guardarComoLlegar(cmllForm: NgForm) {
    if (cmllForm.value.nombre != '' && cmllForm.value.ubicompleta != '' && cmllForm.value.urlmapa != '') {
      const elems = document.getElementById('modal2');
      const instances = M.Modal.init(elems, {dismissible: false});
      let cmllegar = new Comollegar(this.ngModel._id, this.ngModel.nombre, this.ngModel.ubicompleta, this.ngModel.urlmapa);
      let err = false;
      try {
        if (this.file2 != null) {
          this.alertBody = 'Guardando imagen: ' + this.file2.name;
          instances.open();
          cmllegar.img = await this.uploadimg(this.file2);
        }
      }catch (e) {
        err = true;
        instances.close();
        this.toast('Hubo un error inesperado')
      }
      if(!err) {
        if (this.ngModel._id == '') {
          await this.eventoService.postComoLlegar(cmllegar).subscribe(res => {
            this.toast('Como llegar guardado');
            instances.close();
          });
        } else {
          await this.eventoService.putComoLlegar(cmllegar._id, cmllegar).subscribe(res => {
            this.toast('Como llegar guardado');
            instances.close();
          });
        }
      }
    } else {
        this.toast('Faltan datos');
    }
  }

  confirmdelete(_id: string, nombre: string, table: number) {
    this.idToEliminate = _id;
    this.act1tal2rest3 = table;
    this.alertHead = 'Eliminar "' + nombre + '" ?';
    switch (table) {
      case 1:
        this.alertbody = 'Estas seguro de eliminar el taller "' + nombre + '" de forma permanente?';
        break;
      case 2:
        this.alertbody = 'Estas seguro de eliminar la actuacion "' + nombre + '" de forma permanente?';
        break;
      case 3:
        this.alertbody = 'Estas seguro de eliminar el restaurante "' + nombre + '" de forma permanente?';
        break;
    }

    var elems = document.getElementById('modal1');
    var instances = M.Modal.init(elems);
    instances.open();
  }

  delete() {
    switch (this.act1tal2rest3) {
      case 1:
        this.eventoService.deleteActuacion(this.idToEliminate).subscribe(res => {
          const resaux = res as { message: string };
          this.toast(resaux.message);
          for (let i = 0; i < this.actuaciones.length; i++) {
            if (this.actuaciones[i]._id == this.idToEliminate) {
              this.actuaciones.splice(i, 1);
            }
          }
        });
        break;
      case 2:
        this.eventoService.deleteTaller(this.idToEliminate).subscribe(res => {
          const resaux = res as { message: string };
          this.toast(resaux.message);
          for (let i = 0; i < this.talleres.length; i++) {
            if (this.talleres[i]._id == this.idToEliminate) {
              this.talleres.splice(i, 1);
            }
          }
        });
        break;
      case 3:
        this.eventoService.deleteRestaurante(this.idToEliminate).subscribe(res => {
          const resaux = res as { message: string };
          this.toast(resaux.message);
          for (let i = 0; i < this.restaurantes.length; i++) {
            if (this.restaurantes[i]._id == this.idToEliminate) {
              this.restaurantes.splice(i, 1);
            }
          }
        });
        break;
    }
  }

  toast(message: string) {
    M.toast({html: message, classes: 'rounded'});
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  async guardarDatosContacto(dtcForm: NgForm) {
    if (dtcForm.value.correo != '' && dtcForm.value.numero != '') {
      const elems = document.getElementById('modal2');
      const instances = M.Modal.init(elems, {dismissible: false});
      instances.open();
      let dtcContacto = new DatosContacto(this.datosContacto._id, this.datosContacto.numero, this.datosContacto.correo);

      if (this.datosContacto._id == '') {
        await this.eventoService.postDatosContacto(dtcContacto).subscribe(res => {
          this.toast('Datos contacto guardado');
          instances.close();
        });
      }
       else {
        await this.eventoService.putDatosContacto(dtcContacto._id, dtcContacto).subscribe(res => {
          this.toast('Datos contacto guardado');
          instances.close();
        });
      }
    }
  }
}
