import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { PerfilComponent } from '../perfil/perfil.component';
import { GuardiaComponent } from '../guardia/guardia.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
    declarations: [HomePage, PerfilComponent, GuardiaComponent]
})
export class HomePageModule {}
