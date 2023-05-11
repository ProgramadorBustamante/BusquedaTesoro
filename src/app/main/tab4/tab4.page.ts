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
  
 this.tesorosServ.obtenerTesoros().subscribe(c=> {
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


  const modal = await this.modalCtrl.create({
    component: ModalComponent,
    cssClass : "custom_modal2",
    componentProps: { 
      data
    }
  });
  modal.present();

    // console.log(data);
    // var directionsService = new google.maps.DirectionsService;
    // var service = new google.maps.DistanceMatrixService;
    // var geocoder = new google.maps.Geocoder;
    // var bounds = new google.maps.LatLngBounds;
    
    // const map = this.map;
    // directionsService.route({
    //   origin: this.center,
    //   destination: data.position,
    //   travelMode: google.maps.TravelMode.DRIVING
    // }).then(c=>{
    //   console.log(c);
      
  
    // })
  


    // var showGeocodedAddressOnMap =  (asDestination :  any ) =>{
    //   return function (results:any, status:any) {
    //     if (status === 'OK') {
    //       map.fitBounds(bounds.extend(results[0].geometry.location));
    //       // markersArray.push(new google.maps.Marker({
    //       //   map: map,
    //       //   position: results[0].geometry.location,
    //       //   icon: icon
    //       // }));
    //     } else {
    //       alert('Geocode was not successful due to: ' + status);
    //     }
    //   };
    // };

    // service.getDistanceMatrix({
    //   origins: [this.center],
    //   destinations: [data.position],
    //   travelMode: google.maps.TravelMode.DRIVING,
    //   unitSystem: google.maps.UnitSystem.METRIC,
    //   avoidHighways: false,
    //   avoidTolls: false
    // }).then(c=>{
    //     console.log(c);
    //     var originList = c.originAddresses;
    //     var destinationList = c.destinationAddresses;

    //     for (let i = 0; i < originList.length; i++) {
    //       let results = c.rows[i].elements;
    //       geocoder.geocode({ 'address': originList[i] },
    //         showGeocodedAddressOnMap(false));
    //       for (let j = 0; j < results.length; j++) {
    //         geocoder.geocode({ 'address': destinationList[j] },
    //           showGeocodedAddressOnMap(true));
    //       }
    //     }
    // })

    // this.ds.route(request, (response, status) => {
    //   this.dr.setOptions({
    //     suppressPolylines: false,
    //     map: this.map
    //   });

    //   if (status == google.maps.DirectionsStatus.OK) {
    //     this.dr.setDirections(response);
    //   }
    // })

  }

   printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log(coordinates);
  
         this.latitude =coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      
      this.center =  {
        // The initial position to be rendered by the map
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
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
    this.router.navigate(['/main/ranking'])

  }

}
