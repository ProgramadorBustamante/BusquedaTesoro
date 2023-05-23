import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  frmLogin = new FormGroup({
    email : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required)
  });

  constructor( private authServ : AuthService ,private router: Router,private alertCtrl : AlertController ) { }

  ngOnInit() {

  }

  entrar(){
    if(this.frmLogin.invalid){
     
      alert("completa todos los campos");

    }else{

      console.log(this.frmLogin.value);
      
      this.authServ.SignIn(this.frmLogin.value).then(async (c)=>{
        console.log(c);
        
        if(c){
          localStorage.setItem('uid' , c.user?.uid || "");
          this.authServ.ObtenerUsuario(c.user?.uid || "" );
       

          this.authServ.ObtenerPuntos(c.user?.uid);
          
          this.router.navigate(['/main/tabs/mapa'])



        }else{
         const alert = await  this.alertCtrl.create({
            header: '¡Atención!',
          subHeader  : "Usuario o contraseña incorrectos",
           message : 'Intenta nuevamente!',
            buttons: ['OK'],
          });

          await alert.present();
        }
        
      }).catch(async (err)=>{
        const alert = await this.alertCtrl.create({
          header: '¡Atención!',
          subHeader  : "Usuario o contraseña incorrectos",
           message : 'Intenta nuevamente!',
            buttons: ['OK'],
        })
        await alert.present();
      })
    }
  }

}
