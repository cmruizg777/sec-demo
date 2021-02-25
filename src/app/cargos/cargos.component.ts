import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.scss'],
})
export class CargosComponent implements OnInit {
  @Input() asignaciones: any[];
  @Input() role: string;

  constructor() { }

  ngOnInit() {}

  goTo(){

  }
}
