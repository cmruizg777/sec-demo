import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { error } from 'protractor';
import { Usuario } from '../clases/perfil';
import { ApiRequestService } from '../services/api-request.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  usuario: Usuario;
  @Output() loaded = new EventEmitter<string>();
  constructor(
    private api: ApiRequestService
  ) { }

  ngOnInit() {
    const user = localStorage.getItem('usuario');
    if(user){
      this.usuario = JSON.parse(user);
      this.enviar();
    }else{
      this.api.obtenerPerfil().subscribe((user:any) => {
        console.log(user)
        if(user){
          this.usuario = user.profile;
          this.usuario.cargo = user.cargo;
          localStorage.setItem('usuario', JSON.stringify(this.usuario));
        }
      },error => console.log(error),
      ()=>{
        this.enviar();
      })
    }
  }

  enviar(){
    let role = '';
    if(this.usuario.cargo){
      const id  = this.usuario.cargo.idCargo;
      if(id==10){
        role = 'ROLE_GUARDIA';
      }
      if(id==11){
        role = 'ROLE_SUPERVISOR';
      }
    }
    this.loaded.emit(role);
  }

}
