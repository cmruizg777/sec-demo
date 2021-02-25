import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ApiRequestService } from '../services/api-request.service';
import { LocationService } from '../services/location.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-guardia',
  templateUrl: './guardia.page.html',
  styleUrls: ['./guardia.page.scss'],
})
export class GuardiaPage implements OnInit {

  @Output() loaded = new EventEmitter<boolean>();

  $ready = new Subject<boolean>();
  observer : Observable<boolean>;
  idreporte = 0;
  counter = 0;
  idPuesto : number;
  constructor(
    private photo: PhotoService,
    private api: ApiRequestService,
    private geo: LocationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.idPuesto = this.route.snapshot.params.id;
    console.log(this.idPuesto);
  }
  async reporte(codigo: string){
    const reporte = this.tipoReporte(codigo);
    if(reporte){
      const confirmacion = confirm(`ESTA SEGURO QUE DESEA REALIZAR UN REPORTE DE ${reporte}`);
      if(confirmacion){
        let form = new FormData();
        if(codigo!='E' && codigo!='S'){
          let descripcion = prompt(`Por favor, ingrese su ${reporte}`, "");
          form.append('descripcion', descripcion)
        }
        const gps = await this.geo.getCurrentPosition();
        form.append('tipo', codigo)
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
            if(codigo == 'C' || codigo=='N'){
              const tomarFotos = confirm(`Desea subir fotos de la ${reporte} ?`);
              if(tomarFotos){
                this.takePhoto(this.idreporte).then();
              }
            }
          }
        })

        this.api.reportar(form, this.idPuesto).subscribe( (r: any) => {
          if(r.id){
            this.idreporte = r.id;
            this.$ready.next(true);
          }
          alert(r.mensaje);
        });
      }
    }
  }
  solicitarDescripcion(){

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

  tipoReporte(codigo){

    if(codigo == 'E'){
      return 'ENTRADA'
    }
    if(codigo == 'S'){
      return 'SALIDA'
    }
    if(codigo == 'C'){
      return 'CONSIGNA'
    }
    if(codigo == 'R'){
      return 'RECOMENDACIÓN'
    }
    if(codigo == 'N'){
      return 'NOVEDAD'
    }

  }
}
