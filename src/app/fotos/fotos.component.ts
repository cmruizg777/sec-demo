import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiRequestService } from '../services/api-request.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.scss'],
})
export class FotosComponent implements OnInit {
  @Input() fotos: any[];
  imagenes = [];
  constructor(
    private api: ApiRequestService  ,
    private sanitizer: DomSanitizer,
  ) { }

  async ngOnInit() {
    if(this.fotos){
      this.fotos.forEach(async (foto)=>{
        await this.download(foto)
      })
    }
  }

  async download(foto: any) {
    await this.api.getFile(foto.id)
      .subscribe(blob => {
        const objectUrl = URL.createObjectURL(blob)
        const new_url = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
        const img = {url: new_url, ext: foto.extension};
        this.imagenes.push(img);
        //URL.revokeObjectURL(objectUrl);
      })
  }

}
