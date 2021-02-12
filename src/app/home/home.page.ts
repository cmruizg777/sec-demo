import { Component } from '@angular/core';
import { PerfilComponent } from './../perfil/perfil.component';
import { LoadingController } from '@ionic/angular';
import { ApiRequestService } from '../services/api-request.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  myLoading : HTMLIonLoadingElement;
  loadedProfile = false;
  imagen ;
  constructor(
    private loadingController:LoadingController,
    private api: ApiRequestService,
    private sanitizer: DomSanitizer
  ) {}
  async ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.download();
    this.myLoading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Espere por favor...',
      spinner: 'dots',
    });
    await this.myLoading.present();
  }


  async onLoaded(event){
    console.log('me ha enviado', event)
    if(event){
      await this.myLoading.dismiss();
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
}
