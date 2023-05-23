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
    var puntos = localStorage.getItem('puntos')
    console.log(puntos);
    
    return this.afStore.collection('tesoros').ref
    .where("minPuntos", "<=", Number.parseInt(puntos || "0"))
    .orderBy("minPuntos", "asc").get()
  }

  async encontrarTesoro(uid: any, tesoro: any) {
    this.afStore
      .collection('Historial')
      .doc(uid)
      .ref.get()
      .then((c : any ) => {
        let puntosTotal = c.data() ? c.data().puntos : 0;

        puntosTotal += tesoro.puntos;

        this.afStore.collection('Historial').doc(uid).set({
          puntos: puntosTotal,
        });
        return this.afStore
          .collection('Historial')
          .doc(uid)
          .collection('tesoros').doc(tesoro.id).set
          ({ ...tesoro });
      });
  }

  getranking(){
    return this.afStore.collection('Historial').ref.orderBy("puntos", "desc").get().then(c=>c);
  }

   getUser( id : any  ){
    
      return   this.afStore.collection('jugadores').doc(id).ref.get();
    
  }

  bloquearTesoro(uid: string | undefined, data: any) {
   this.afStore.collection("bloqueos").add({
    uid : uid,
    tesoroid : data.id,
    fecha : new Date(),
    data : data
   })
  }

  abierto(uid : string , tid :string) {
    return this.afStore.collection("Historial").doc(uid).collection("tesoros").doc(tid).get();
  }

  ActualizarDatos(uid : string , data = {}) {
   return  this.afStore.collection('jugadores').doc(uid).set(data,{ merge : true})
  }


}
