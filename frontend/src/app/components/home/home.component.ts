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

  delete(_id: string) {
    var elems = document.getElementById('modal1');
    var instances = M.Modal.init(elems);
    instances.open();
  }
}
