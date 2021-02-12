import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../clases/perfil';
@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  uri = 'http://localhost:8000/api';
  constructor(
    private http: HttpClient
    ) { }
  obtenerToken(formData){
    const url = `${this.uri}/user/login_check`;
    return this.http.post(url,formData);
  }
  obtenerPerfil(){
    const url = `${this.uri}/user/profile`;
    return this.http.post<Usuario>(url,{});
  }
  getFile(){
    const url = `${this.uri}/user/download?id=5`;
    return this.http.get(url, {
      responseType: 'blob'
    });
  }
  sendPhoto(formData){
    const url = `${this.uri}/user/upload`;
    return this.http.post(url, formData);
  }
}
