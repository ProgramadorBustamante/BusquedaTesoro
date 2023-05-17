import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
  constructor( private tesoroServ : TesorosService,private afa : AngularFireAuth) { }

  ngOnInit() {
    this.tesoro =   JSON.parse(localStorage.getItem('tesoro') || "");
      this.uid = localStorage.getItem('uid') || "";
  }
  Validar(){
    this.tesoroServ.encontrarTesoro(this.uid , this.tesoro.data);
  }



}
