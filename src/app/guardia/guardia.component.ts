import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../services/api-request.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-guardia',
  templateUrl: './guardia.component.html',
  styleUrls: ['./guardia.component.scss'],
})
export class GuardiaComponent implements OnInit {

  constructor(
    private photo: PhotoService,
    private api: ApiRequestService
  ) { }

  ngOnInit() {}
  async takePhoto(){
    const resp  = await this.photo.addPhoto();
    const file = resp.file ;
    const ext = resp.format;
    let form = new FormData();
    form.append('file', file);
    form.append('extension', ext);
    this.api.sendPhoto(form).subscribe( obs => {
      console.log(obs)
    });
  }
}
