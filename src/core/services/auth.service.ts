import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
// import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 
  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    private alertCtrl: AlertController
  ) {}

  SignIn(data: any) {
    return this.ngFireAuth.signInWithEmailAndPassword(
      data.email,
      data.password
    );
  }
  // Register user with email/password
  async RegisterUser(data: any) {
    return await this.ngFireAuth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(async (c) => {
        if (c.user) {
          localStorage.setItem('uid', c.user.uid);
          // localStorage.setItem('user' , c.user.metadata);

          return await this.afStore
            .collection('jugadores')
            .doc(c.user.uid)
            .set({ ...data })
            .then((c) => true)
            .catch((err) => false);
        } else {
          return false;
        }
      })
      .catch(async (e) => {
        let alet = this.alertCtrl.create({
          header: 'Alert',
          subHeader: 'Intenta nuevamente!',
          message: 'Usuario o contraseña incorrectos',
          buttons: ['OK'],
        });
        await (await alet).present();
      });
  }

 ObtenerPuntos(uid: string | undefined) {
   this.afStore.collection('Historial').doc(uid).get().subscribe((c: any)=>{
    localStorage.setItem('puntos' , (c.data().puntos || 0));
    
  })
  }



}
