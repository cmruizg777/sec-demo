import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupervisorPageRoutingModule } from './supervisor-routing.module';

import { SupervisorPage } from './supervisor.page';
import { ReportesComponent } from '../reportes/reportes.component';
import { GoogleMapsComponent } from '../google-maps/google-maps.component';
import { FotosComponent } from '../fotos/fotos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupervisorPageRoutingModule
  ],
  declarations: [SupervisorPage, ReportesComponent, GoogleMapsComponent, FotosComponent],
})
export class SupervisorPageModule {}
