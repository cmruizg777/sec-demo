import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  myLoading: HTMLIonLoadingElement;
  constructor(
    private loadingController: LoadingController
  ) { }
  async createLoading(message = 'Espere por favor', cssClass=''){
    this.myLoading = await this.loadingController.create({
      cssClass,
      message,
      spinner: 'dots'
    });
    this.myLoading.present();
  }
}
