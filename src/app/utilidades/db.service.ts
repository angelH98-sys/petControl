import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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
  
  Delete(id: string, collection: string){
    return this.firestore.collection(collection).doc(id).delete();
  }
}