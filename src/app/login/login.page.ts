import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiRequestService } from '../services/api-request.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = '';
  pass = '';

  constructor(
    private auth: AuthService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    //this.user = '0401702832';//guardia
    this.user = '1718783010'; //supervisor
    this.pass = '123456';
    //localStorage.clear();

    this.auth.userStatus().subscribe( logged => {
      if(logged){
          this.navCtrl.navigateForward('/home');
      }
    });
    this.auth.checkStatus();

  }
  enviar(){
    if(this.user && this.pass){
      localStorage.clear();
      let form = {username: this.user, password: this.pass};
      this.auth.login(form);
    }
  }
}
