import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BrowserStack } from 'protractor/built/driverProviders';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private firestore: AngularFirestore) { }

  Create(data: any, collection: string){
    return this.firestore.collection(collection).add(data);
  }

  GetAllFrom(collection: string){
    return this.firestore.collection(collection).snapshotChanges();
  }

  GetDocWith(name: string, value: string, collection: string){
    return this.firestore.collection(collection).ref
      .where(name, '==', value).get();
  }

  GetDocWithId(id: string, collection: string){
    return this.firestore.collection(collection).doc(id).get();
  }

  Update(id: string, data: any, collecton: string){
    return this.firestore.collection(collecton).doc(id).update(data);
  }

  EffectTicket(ticketId, ventaId, products: any){
    //https://firebase.google.com/docs/firestore/manage-data/transactions#batched-writes
    let batch = this.firestore.firestore.batch();
    
    products.forEach(element => {

      if(element.stock == 0){

        batch.update(
          this.firestore.firestore.collection('productos').doc(element.id),
          {"stock": element.stock, "estado": "Agotado"}
        );
      }else{
        
        batch.update(
          this.firestore.firestore.collection('productos').doc(element.id),
          {"stock": element.stock}
        );
      }

    });

    batch.update(
      this.firestore.firestore.collection('tickets').doc(ticketId),
      {"estado": "Efectuado"}
    );

    batch.update(
      this.firestore.firestore.collection('ventas').doc(ventaId),
      {"estado": "Efectuado"}
    )

    return batch.commit();
  }
  
  Delete(id: string, collection: string){
    return this.firestore.collection(collection).doc(id).delete();
  }
}