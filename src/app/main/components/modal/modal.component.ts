import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  implements OnInit {
  data : any ;
  enabled: boolean;
  constructor(private router : Router,private modalCtrl : ModalController) { }

  ngOnInit() {
    console.log(this.data);
    

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
