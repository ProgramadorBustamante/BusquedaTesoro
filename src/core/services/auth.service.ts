import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,) { }

    SignIn(data : any ) {
      return this.ngFireAuth.signInWithEmailAndPassword(data.email, data.password);
    }
    // Register user with email/password
  async   RegisterUser(data : any ) {
      return await this.ngFireAuth.createUserWithEmailAndPassword(data.email, data.password).then(async (c)=> 
        {
          if(c.user){
            return await this.afStore.collection("jugadores").doc(c.user.uid).set({...data}).then(c=> true).catch(err=> false);
          }
          else {
            return false;
          }
        })
    }

}
