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
  @Output() loaded = new EventEmitter<boolean>();
  constructor(
    private api: ApiRequestService
  ) { }

  ngOnInit() {
    this.loaded.emit(false);
    this.api.obtenerPerfil().subscribe((user:any) => {
      if(user){
        this.usuario = user.profile;
        this.usuario.cargo = user.cargo;
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
      }
    },error => console.log(error),
    ()=>{
      this.loaded.emit(true);
    })
  }

}
