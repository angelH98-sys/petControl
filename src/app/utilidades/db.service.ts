import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BrowserStack } from 'protractor/built/driverProviders';
import { start } from 'repl';

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

  GetTicketsFrom(startDate: Date, endDate: Date){
    
    return this.firestore.collection('tickets').ref
      .where('fecha', '>=', startDate).where('fecha', '<=', endDate).get();
  }

  async NewSell(ticket: any, sellObj: any){
    let batch = this.firestore.firestore.batch();

    let res = await this.firestore.collection('ventas').add({});

    batch.set(
      this.firestore.firestore.collection('ventas').doc(res.id),
      sellObj
    );

    batch.update(
      this.firestore.firestore.collection('tickets').doc(ticket.id),
      {
        precioTotal: ticket.precioTotal
      }
    );

    return batch.commit();
  }

async NewService(ticket: any, servObj: any){
  let batch = this.firestore.firestore.batch();

  let res = await this.firestore.collection('citas').add({});

  batch.set(
    this.firestore.firestore.collection('citas').doc(res.id),
    servObj
  );

  batch.update(
    this.firestore.firestore.collection('tickets').doc(ticket.id),
    {
      precioTotal: ticket.precioTotal
    }
  );

  return batch.commit();
}



  async UpdateSell(ticket: any, venta: any){

    let batch = this.firestore.firestore.batch();

    batch.update(
      this.firestore.firestore.collection('ventas').doc(venta.id),
      {
        productos: venta.productos,
        precioTotal: venta.precioTotal
      }
    );

    batch.update(
      this.firestore.firestore.collection('tickets').doc(ticket.id),
      {
        precioTotal: ticket.precioTotal
      }
    );
    
    return batch.commit();

  }

  /*JUAN */
  async UpdateServ(ticket: any, cita: any){

    let batch = this.firestore.firestore.batch();

    batch.update(
      this.firestore.firestore.collection('citas').doc(cita.id),
      {
        servicios: cita.servicios,
        precioTotal: cita.precioTotal
      }
    );

    batch.update(
      this.firestore.firestore.collection('tickets').doc(ticket.id),
      {
        precioTotal: ticket.precioTotal
      }
    );
    
    return batch.commit();

  }


  Update(id: string, data: any, collecton: string){
    return this.firestore.collection(collecton).doc(id).update(data);
  }

  PayTicket(ticketId, ventaId){
    
    let batch = this.firestore.firestore.batch();

    batch.update(
      this.firestore.firestore.collection('tickets').doc(ticketId),
      {
        estado: "Pagado"
      }
    )

    batch.update(
      this.firestore.firestore.collection('ventas').doc(ventaId),
      {
        estado: "Pagado"
      }
    )
    return batch.commit();
  }

  EffectTicket(ticketId, ventaId, citaId, products: any){
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

    if(ventaId != undefined){

      batch.update(
        this.firestore.firestore.collection('ventas').doc(ventaId),
        {"estado": "Efectuado"}
      )
    }

    if(citaId != undefined){

      batch.update(
        this.firestore.firestore.collection('citas').doc(citaId),
        {"estado": "Efectuado"}
      )
    }

    batch.update(
      this.firestore.firestore.collection('tickets').doc(ticketId),
      {"estado": "Efectuado"}
    );

    

    return batch.commit();
  }
  
  Delete(id: string, collection: string){
    return this.firestore.collection(collection).doc(id).delete();
  }
}