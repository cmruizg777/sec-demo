import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiRequestService } from '../services/api-request.service';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.page.html',
  styleUrls: ['./supervisor.page.scss'],
})
export class SupervisorPage implements OnInit {
  fecha : Date;
  strFecha : string;
  idPuesto : number ;
  reportes: any[];
  constructor(
    private route : ActivatedRoute,
    private api: ApiRequestService

  ) { }

  ngOnInit() {
    this.idPuesto = this.route.snapshot.params.id;
    this.fecha = new Date();
    this.strFecha = this.fecha.toDateString();
    this.dateChange();
  }
  dateChange(){
    this.api.getReportes(this.idPuesto, this.strFecha).subscribe( (resp:any) => {
      console.log(resp)
      if(resp.mensaje){
        alert(resp.mensaje);
      }else{
        this.reportes = resp;
      }
    });
  }

}
