import { Component, Input, Renderer2, ElementRef, Inject, Output, EventEmitter, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Plugins } from '@capacitor/core';
import { LocationService } from '../services/location.service';
import { resolve } from 'dns';
import { rejects } from 'assert';

const { Geolocation, Network } = Plugins;

declare var google: any;

@Component({
  selector: 'google-maps',
  styleUrls: ['google-maps.component.scss'],
  templateUrl: 'google-maps.component.html'
})
export class GoogleMapsComponent {

    @Input() gpsReporte;
    @Input() gpsPuesto;
    center;
    reporte;
    markers: any[] = [];
    markersMap: any[] = [];
    miUbicacion ;
    destino ;

    minLat;
    minLng;
    maxLat;
    maxLng;

    public map: any;
    private mapsLoaded: boolean = false;
    private networkHandler = null;
    @Output() loaded = new EventEmitter<boolean>();
    @ViewChild('map', {static: false}) mapElement: ElementRef;

    constructor(
      private geo: LocationService
      ){
    }

    ngOnInit(){
      if(this.gpsPuesto){
        this.center = {
          coords:{
            latitude: this.gpsPuesto.latitud,
            longitude: this.gpsPuesto.longitud
          }
        };
      }
      if(this.gpsReporte){
          this.reporte = {
            coords:{
              latitude: this.gpsReporte.latitud,
              longitude: this.gpsReporte.longitud
            }
          };

      }
    }

    ngAfterViewInit(): void {
      //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
      //Add 'implements AfterViewInit' to the class.
      this.init(this.center);
      this.agregarMarker(this.reporte, 'Lugar de Reporte');
    }
    init(location){
        //const location =  await  this.geo.getCurrentPosition();
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
          center: { lat: location.coords.latitude, lng: location.coords.longitude },
          zoom: 15
        });
        //const location = new
        this.agregarMarker(location, 'Puesto de Trabajo');
    }
    agregarMarker(location, lugar) {
      const marker = new google.maps.Marker({
        position: { lat: location.coords.latitude, lng: location.coords.longitude },
        map: this.map,
        title: lugar,
      });
      marker.setLabel(lugar);
      this.markersMap.push(marker);

    }
    setBounds(){
      const sw = new google.maps.LatLng ({lat: this.minLat, lng: this.minLng});
      const ne = new google.maps.LatLng ({lat: this.maxLat, lng: this.maxLng});
      const bounds = new google.maps.LatLngBounds(sw, ne);
      this.map.fitBounds(bounds);
    }
    /*
    private loadSDK(): Promise<any> {
        console.log("Loading Google Maps SDK");
        return new Promise((resolve, reject) => {
            if(!this.mapsLoaded){
                Network.getStatus().then((status) => {
                    if(status.connected){
                        this.injectSDK().then((res) => {
                            resolve(true);
                        }, (err) => {
                            reject(err);
                        });
                    } else {
                        if(this.networkHandler == null){
                            this.networkHandler = Network.addListener('networkStatusChange', (status) => {
                                if(status.connected){
                                    this.networkHandler.remove();
                                    this.init().then((res) => {
                                        console.log("Google Maps ready.")
                                    }, (err) => {
                                        console.log(err);
                                    });
                                }
                            });
                        }
                        reject('Not online');
                    }
                }, (err) => {
                    // NOTE: navigator.onLine temporarily required until Network plugin has web implementation
                    if(navigator.onLine){
                        this.injectSDK().then((res) => {
                            resolve(true);
                        }, (err) => {
                            reject(err);
                        });
                    } else {
                        reject('Not online');
                    }
                });
            } else {
                reject('SDK already loaded');
            }
        });
    }

    private injectSDK(): Promise<any> {
        return new Promise((resolve, reject) => {
            window['mapInit'] = () => {
                this.mapsLoaded = true;
                resolve(true);
            }
            let script = this.renderer.createElement('script');
            script.id = 'googleMaps';
            if(this.apiKey){
                script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
            } else {
                script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit';
            }
            this.renderer.appendChild(this._document.body, script);
        });
    }

    private initMap(): Promise<any> {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition().then((position) => {
                console.log(position);
                let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                let mapOptions = {
                    center: latLng,
                    zoom: 15
                };
                this.map = new google.maps.Map(this.element.nativeElement, mapOptions);
                resolve(true);
            }, (err) => {
                reject('Could not initialise map');
            });
        });
    }

    public addMarker(lat: number, lng: number): void {
        let latLng = new google.maps.LatLng(lat, lng);
        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng
        });
        this.markers.push(marker);
    }
    */
}
