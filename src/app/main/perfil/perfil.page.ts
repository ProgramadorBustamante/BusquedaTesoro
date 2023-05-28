import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TesorosService } from 'src/core/services/tesoros.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  // imports : [ReactiveFormsModule,FormsModule]
})
export class PerfilPage implements OnInit {
  user: any;
  frmUsuario = new FormGroup(
  {
    user : new FormControl('',Validators.required),
    email : new FormControl('',Validators.required),
    name : new FormControl('',Validators.required),

  }
  )
  uid: string;

  constructor(private tesorosServ : TesorosService,private router : Router,private alertCtrl : AlertController) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || "{}");
    this.uid = localStorage.getItem('uid') || "";
    this.frmUsuario.patchValue({...this.user})

  }
  Salir(){
    localStorage.clear();
    this.router.navigate(['auth','login'])
  }

  Actualizar(){
    if(this.frmUsuario.invalid){ 
    alert("completa todos los campos.");
  
  }else{
    console.log(this.frmUsuario.value);
    this.tesorosServ.ActualizarDatos(this.uid,this.frmUsuario.value).then(async c=>{
      const alert = await this.alertCtrl.create({
        header: 'Actualizacion exitosa!',
          buttons: ['OK'],
      })
      await alert.present();

    });
    
  }
  }
}
