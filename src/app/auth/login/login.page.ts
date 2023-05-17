import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor( private authServ : AuthService ,private router: Router ) { }

  ngOnInit() {

  }

  entrar(){
    if(this.frmLogin.invalid){
     
      alert("completa todos los campos");

    }else{

      console.log(this.frmLogin.value);
      
      this.authServ.SignIn(this.frmLogin.value).then(c=>{
        if(c.user){
          localStorage.setItem('uid' , c.user.uid);
          this.router.navigate(['/main'])
        }
        
      }).catch(err=>{
        console.log(err);
      })
    }
  }

}
