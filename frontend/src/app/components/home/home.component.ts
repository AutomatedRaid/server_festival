import { Component, OnInit } from '@angular/core';
import {EventoService} from "../../services/evento.service";
import {Actuacion} from "../../models/actuacion";
import {Taller} from "../../models/taller";

declare const M: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  actuaciones: Actuacion[] = [];
  talleres: Taller[] = [];
  alertHead: string;
  alertbody: string;
  idToEliminate: string;
  act0tal1 = null;

  constructor(private eventoService: EventoService) { }

  ngOnInit(): void {
    M.AutoInit();
    this.eventoService.getActuaciones().subscribe(res => {
      this.actuaciones = res as Actuacion[];
    });
    this.eventoService.getTalleres().subscribe(res => {
      this.talleres = res as Taller[];
    });
  }

  confirmdelete(_id: string, nombre: string, table: boolean) {
    this.idToEliminate = _id;
    this.act0tal1 = table;
    this.alertHead = 'Eliminar "' + nombre + '" ?';
    if(table)
      this.alertbody = 'Estas seguro de eliminar el taller "' + nombre + '" de forma permanente?';
    else
      this.alertbody = 'Estas seguro de eliminar la actuacion "' + nombre + '" de forma permanente?';
    var elems = document.getElementById('modal1');
    var instances = M.Modal.init(elems);
    instances.open();
  }

  delete(){
    if(!this.act0tal1) {
      this.eventoService.deleteActuacion(this.idToEliminate).subscribe(res => {
        const resaux = res as { message: string };
        M.toast({html: resaux.message, classes: 'rounded'});
        for (let i = 0; i < this.actuaciones.length; i++) {
          if (this.actuaciones[i]._id == this.idToEliminate) {
            this.actuaciones.splice(i, 1);
          }
        }
      });
    }else {
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
}
