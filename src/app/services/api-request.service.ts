import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse} from '@angular/common/http';
import { Usuario } from '../clases/perfil';
import { Observable } from 'rxjs';
import { Config } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  //uri = 'http://localhost:8000/api';
  uri =  'http://186.4.154.145:8080/sec-demo-api/public/index.php/api';
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
  getFile(id: number){
    const url = `${this.uri}/v1/fotos/download/${id}`;
    return this.http.get(url, { responseType:'blob'});
  }
  getPuestos(){
    const url = `${this.uri}/v1/puestos`;
    return this.http.get(url);
  }

  getReportes(id: number, fecha: string){
    const url = `${this.uri}/v1/reporte/${id}?fecha=${fecha}`;
    return this.http.get(url);
  }
  getReporte(id: number){
    const url = `${this.uri}/v1/reporte/detalles/${id}`;
    return this.http.get(url);
  }

  sendPhoto(formData, id){
    const url = `${this.uri}/v1/fotos/upload/${id}`;
    return this.http.post(url, formData);
  }
  reportar(formData, id: number){
    const url = `${this.uri}/v1/reporte/${id}`;
    return this.http.post(url, formData);
  }
}
