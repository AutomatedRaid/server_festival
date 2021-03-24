import { Component, OnInit } from '@angular/core';

declare const M: any;

@Component({
  selector: 'app-actuacion',
  templateUrl: './actuacion.component.html',
  styleUrls: ['./actuacion.component.css']
})
export class ActuacionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    M.AutoInit();
  }

}
