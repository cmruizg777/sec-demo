import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { read } from 'fs';
import { Observable, Subject } from 'rxjs';
import { ApiRequestService } from '../services/api-request.service';
import { LocationService } from '../services/location.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-guardia',
  templateUrl: './guardia.component.html',
  styleUrls: ['./guardia.component.scss'],
})
export class GuardiaComponent implements OnInit {
  @Output() loaded = new EventEmitter<boolean>();

  $ready = new Subject<boolean>();
  observer : Observable<boolean>;
  idreporte = 0;
  counter = 0;
  constructor(
    private photo: PhotoService,
    private api: ApiRequestService,
    private geo: LocationService,
  ) { }

  ngOnInit() {}

  async entrada(){
    const gps = await this.geo.getCurrentPosition();
    let form = new FormData();
    if(gps.coords.latitude && gps.coords.longitude){
      form.append('latitud', gps.coords.latitude.toString());
      form.append('longitud', gps.coords.longitude.toString());
      if(gps.coords.speed){
        form.append('velocidad', gps.coords.speed.toString());
      }
      if(gps.coords.accuracy){
        form.append('presiciongps', gps.coords.accuracy.toString());
      }
    }
    this.loaded.emit(false);
    this.observer = this.$ready.asObservable();
    this.observer.subscribe( ready => {
      if(ready){
        this.takePhoto(this.idreporte).then();
      }
    })
    this.api.reportarLlegada(form).subscribe( (r: any) => {
      if(r.id){
        this.idreporte = r.id;
        this.$ready.next(true);
      }
      alert(r.mensaje);
    });

  }
  salida(){

  }
  async takePhoto(id){
    const resp  = await this.photo.addPhoto();
    const file = resp.file ;
    const ext = resp.format;
    let form = new FormData();
    form.append('file', file);
    form.append('extension', ext);
    this.api.sendPhoto(form, id).subscribe( (obs : any) => {
      if(obs.mensaje == 'OK'){
        this.counter ++ ;
        if(this.counter < 5){
          const otra = confirm('Agregar Otra Foto ?');
          if(otra){
            this.takePhoto(id);
          }else{
            alert('Sus fotos se han subido correctamente');
            this.loaded.emit(true);
          }
        }
      }else{
        alert(obs.mensaje)
      }
    });
  }
}
