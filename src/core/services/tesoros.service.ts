import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TesorosService {

  constructor(    public afStore: AngularFirestore,
   ) { }

   obtenerTesoros(){
      return this.afStore.collection("tesoros").get();
   }



}
