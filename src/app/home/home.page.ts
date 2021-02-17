import { Component } from '@angular/core';
import { PerfilComponent } from './../perfil/perfil.component';
import { LoadingController } from '@ionic/angular';
import { ApiRequestService } from '../services/api-request.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LocationService } from '../services/location.service';
import { AuthService } from '../services/auth.service';
import { Subject } from 'rxjs';
//import * as env from '../../environments/environment'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  $ready = new Subject<boolean>();
  myLoading : HTMLIonLoadingElement;

  loadedGuardia = false;
  loadedSupervisor = false;
  loadedGoogleMaps = false;

  imagen ;
  apikey;
  role = '';
  asignaciones = [];
  constructor(
    private loadingController:LoadingController,
    private api: ApiRequestService,
    private sanitizer: DomSanitizer,
    private auth:AuthService
  ) {}
  async ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //this.download();
    this.api.getPuestos().subscribe( (asignaciones : any )=>{
      //console.log(asignaciones)
      this.asignaciones = asignaciones;
    })
  }

  async onLoadedPerfil(event){
    if(event){
      this.role = event;
    }else{
      alert('Ha ocurrido un error, por favor vuelva a iniciar sesión.');
      this.logout();
    }
  }
  async onLoadedGuardia(event){
    if(event){

    }else{

    }
  }
  async onLoadedGoogleMaps(event){
    if(event){
      this.loadedGoogleMaps = event;
    }else{

    }
  }
  async onLoadedSupervisor(event){
    if(event){

    }else{

    }
  }
  download(): void {
    this.api.getFile()
      .subscribe(blob => {
        const objectUrl = URL.createObjectURL(blob)
        this.imagen = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
        //URL.revokeObjectURL(objectUrl);
      })
  }
  logout(){
    this.auth.logout();
  }

}
