import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../components/modal/modal.component';
import { Router } from '@angular/router';
import { TesorosService } from 'src/core/services/tesoros.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})

export class Tab4Page implements OnInit {
  @ViewChild(google.maps.Map, { static: false }) map: google.maps.Map;

  center: google.maps.LatLngLiteral;

  ds: google.maps.DirectionsService;
  dr: google.maps.DirectionsRenderer;

  apiKey = 'AIzaSyCbmXRy3rHFINi6D5C6tldcVAkcoYwtiz0';

  latitude: any;
  longitude: number;
  markers : any[] = [];
  tesoros: Observable<any>;

  constructor(private modalCtrl: ModalController,private router: Router,private tesorosServ : TesorosService) { }


  ngOnInit() { 
  
 this.tesorosServ.obtenerTesoros().then(c=> {
  console.log(c);
  
  c.docs.map((doc: any )=>{
    this.markers.push({
      position: {
        lat: doc.data().lat, 
        lng: doc.data().long,
      },
      title: doc.data().title,
      options: { icon: '/assets/cofrec.png' },
      data : doc.data(),
    })
  })
 })
    this.checkPermissions();
    this.printCurrentPosition();
 
    // setInterval( ()=>{
    //   this.printCurrentPosition();
    // },10000)

    //  this.markers = [{
    //     position: {
    //       lat: 20.151480905835655, 
    //       lng: -99.25729366915179,
    //     },
    //     // label: {
    //     //   color: 'red',
    //     //   text: 'Tesoro 1 ',
    //     // },
    //     title: 'ATesoro 1 ',
    //     options: { icon: '/assets/cofrec.png' },
    //   },{
    //     position: {
    //       lat: 20.152135589087163, 
    //       lng: -99.26081272724598,
    //     },
    //     // label: {
    //     //   color: 'red',
    //     //   text: 'Tesoro 1 ',
    //     // },
    //     title: 'ATesoro 1 ',
    //     options: { icon: '/assets/cofrec.png' },
    //   },{
    //     position: {
    //       lat: 20.15519745584919, 
    //       lng: -99.2580876029901,
    //     },
    //     // label: {
    //     //   color: 'red',
    //     //   text: 'Tesoro 1 ',
    //     // },
    //     title: 'ATesoro 1 ',
    //     options: { icon: '/assets/cofrec.png' },
    //   }
    // ];


  }

async ver(data : any ){

  data.distancia = this.distance(this.center.lat, this.center.lng ,data.data.lat ,data.data.long  )



  const modal = await this.modalCtrl.create({
    component: ModalComponent,
    cssClass : "custom_modal2",
    componentProps: { 
      data
    }
  });
  modal.present();

  }

   printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log(coordinates);
  
         this.latitude =coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      
      this.center =  {
        // The initial position to be rendered by the map
        lat:   this.latitude,
        lng:  this.longitude,
       
      };
      
      this.markers.push({
        position: {
          lat: this.center.lat ,
          lng: this.center.lng ,
        },
        // label: {
        //   color: 'red',
        //   text: 'Aqui andamos',
        // },
        options : {
          // animation: google.maps.Animation.BOUNCE,
          draggable: false, 
          icon: '/assets/pirata.png'
       }
        // options: { animation: google.maps.Animation.BOUNCE },
       
      });

  };
  
  checkPermissions = async () => {
  return await Geolocation.checkPermissions().then(c=> c);
  }
     
  verranking(){
    this.router.navigate(['/main/tabs/ranking'])

  }


   distance(lat1 : number, lon1: number, lat2: number, lon2: number, unit = "K") {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
    }
}

}
