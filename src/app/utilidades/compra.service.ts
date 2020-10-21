import { Injectable, Query } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private firestore: AngularFirestore) { }

  getComprasOrderByFecha(producto: string){
    return this.firestore.collection('compras').ref
      .where('producto', '==', producto).orderBy('fecha', 'desc').limit(1).get();
  }

}
