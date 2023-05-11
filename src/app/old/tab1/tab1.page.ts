import { Component } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  user : any  = null;

  constructor() {
    if(!isPlatform('capacitor')){
      GoogleAuth.initialize();
    }
    // this.user = GoogleAuth
  }

  async signIn(){
    this.user =  await GoogleAuth.signIn();
    console.log(this.user);
    
  }

  signOut(){
    GoogleAuth.signOut().then(c=> {
      this.user = null;
    });  
  }


 

}
