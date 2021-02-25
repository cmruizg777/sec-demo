import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiRequestService } from '../services/api-request.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
})
export class ReportesComponent implements OnInit {
  idReporte: number;
  reporte: any;
  constructor(
    private route: ActivatedRoute,
    private api: ApiRequestService
  ) { }

  ngOnInit() {
    //this.route.snapshot.
    this.idReporte = this.route.snapshot.params.id;
    this.api.getReporte(this.idReporte).subscribe((resp:any) =>{
      if(resp.mensaje){
        alert(resp.mensaje);
      }else{
        this.reporte = resp;
        console.log(resp)
      }
    })
  }

}
