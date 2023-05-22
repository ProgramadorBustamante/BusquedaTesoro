import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { TesorosService } from 'src/core/services/tesoros.service';

@Component({
  selector: 'app-acertijo',
  templateUrl: './acertijo.page.html',
  styleUrls: ['./acertijo.page.scss'],
})
export class AcertijoPage implements OnInit {
  tesoro: any;
  respuesta : any = "";
  uid: string | undefined;
  numIntentos : number = 0;
  constructor( private tesoroServ : TesorosService,private afa : AngularFireAuth, private alertCtrl : AlertController) { }

  ngOnInit() {
    this.tesoro =   JSON.parse(localStorage.getItem('tesoro') || "");
      this.uid = localStorage.getItem('uid') || "";
  }
 async  Validar(){

    if(this.respuesta.includes(this.tesoro.data.respuestaAcertijo)){
      const alert = await this.alertCtrl.create({
        header: '¡Imprecionante!',
        subHeader  : "Tu respuesta es correcta ",
         message : 'haz ganado '+ this.tesoro.data.puntos + ' Puntos ' ,
          buttons: ['OK'],
      })
      await alert.present();

      this.tesoroServ.encontrarTesoro(this.uid , this.tesoro.data);
    }else{
      const alert = await this.alertCtrl.create({
        header: 'Lo sentimos!',
        subHeader  : "la respuesta es incorrecta",
         message : 'intenata nuevamente' ,
          buttons: ['OK'],
      })
      await alert.present();

      this.numIntentos++;
      if(this.numIntentos > 3){

        this.tesoroServ.bloquearTesoro(this.uid , this.tesoro.data);

        const alert = await this.alertCtrl.create({
          header: 'Lo sentimos!',
          subHeader  : "Haz superado el numero de intentos por dia ",
           message : 'Vuele mañana ' ,
            buttons: ['OK'],
        })
        await alert.present();
      }
      // this.tesoroServ.encontrarTesoro(this.uid , this.tesoro.data);
    }



  }



}
