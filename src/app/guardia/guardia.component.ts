import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../services/api-request.service';
import { LocationService } from '../services/location.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-guardia',
  templateUrl: './guardia.component.html',
  styleUrls: ['./guardia.component.scss'],
})
export class GuardiaComponent implements OnInit {

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
    this.api.reportarLlegada(form).subscribe( r => console.log(r) );
  }
  salida(){

  }
  async takePhoto(){
    const resp  = await this.photo.addPhoto();
    const file = resp.file ;
    const ext = resp.format;
    let form = new FormData();
    form.append('file', file);
    form.append('extension', ext);
    this.api.sendPhoto(form).subscribe( obs => {
      console.log(obs)
    });
  }
}
