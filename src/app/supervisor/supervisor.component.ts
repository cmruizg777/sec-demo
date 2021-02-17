import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LocationService } from '../services/location.service';

declare var google;
//let map: any;
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.scss'],
})
export class SupervisorComponent implements OnInit {
  @Input() asignaciones: any[];
  constructor() { }

  ngOnInit() {

  }
  reportesGuardias(){

  }
}
