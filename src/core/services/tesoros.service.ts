import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class TesorosService {
  constructor(
    private httpClient: HttpClient,
    public afStore: AngularFirestore
  ) {}

  obtenerTesoros() {
    return this.afStore.collection('tesoros').get();
  }

  async encontrarTesoro(uid: any, tesoro: any) {
    debugger;
    this.afStore
      .collection('Historial')
      .doc(uid)
      .ref.get()
      .then((c : any ) => {
        debugger;
        
        let puntosTotal = c.data() ? c.data().puntos : 0;

        puntosTotal += tesoro.puntos;

        this.afStore.collection('Historial').doc(uid).set({
          puntos: puntosTotal,
        });
        return this.afStore
          .collection('Historial')
          .doc(uid)
          .collection('tesoros')
          .add({ ...tesoro });
      });
  }
}
