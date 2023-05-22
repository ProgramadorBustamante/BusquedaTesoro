import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TesorosService } from 'src/core/services/tesoros.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  implements OnInit {
  data : any ;
  enabled: boolean;
  encontrado : boolean = false;
  constructor(private router : Router,private modalCtrl : ModalController,private tesoroServ : TesorosService) { }

  ngOnInit() {
    console.log(this.data);
    let uid =   localStorage.getItem('uid') || "0";
    this.tesoroServ.abierto(uid ,this.data.data.id).subscribe(c=>{
      console.log(c.exists);
      this.encontrado =c.exists;
    })


    if(this.data.distancia <= 0.100)
    {
      this.enabled = true;
    }


  }

  Encontrado(){
    console.log("Encontre el tesoro");
    localStorage.setItem('tesoro',JSON.stringify(this.data));
    this.router.navigateByUrl('/main/acertijo');

    this.modalCtrl.dismiss();


  };


}
