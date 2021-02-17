import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { stat } from 'fs';
import { Subject } from 'rxjs';
import { AuthResponse } from '../clases/auth';
import { ApiRequestService } from './api-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logged$ = new Subject<boolean>();
  state = false;

  constructor(
    private api: ApiRequestService,
    private router: Router
  ) {

  }
  login(form){
    this.api.obtenerToken(form).subscribe( (r : AuthResponse) => {
      if(r.token){
        localStorage.setItem('token', r.token);
        this.state = true;
      }else{
        this.state = false;
        alert(r.message);
      }
      this.logged$.next(this.state);
    }, error => {
      console.log(error);
      alert('Ah ocurrido un error, intentelo nuevamente');
      this.state = false;
      this.logged$.next(this.state);
    }, ()=>{
      if(!this.state){
        localStorage.clear();
      }
    })
  }

  userStatus(){
    return this.logged$.asObservable();
  }
  checkStatus(){
    let token = localStorage.getItem('token');
    if(token){
      this.state = true;
    }
    this.logged$.next(this.state);
    return this.state;
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
    this.state=false;
    return this.logged$.next(this.state);
  }
}

