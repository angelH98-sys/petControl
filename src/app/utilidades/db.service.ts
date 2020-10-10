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

  Update(id: string, data: any, collecton: string){
    return this.firestore.collection(collecton).doc(id).set(data);
  }
  
  Delete(id: string, collection: string){
    return this.firestore.collection(collection).doc(id).delete();
  }
}