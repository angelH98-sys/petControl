import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AlertaService } from 'src/app/utilidades/alerta.service';
import { DbService } from 'src/app/utilidades/db.service';

class client {
    id: string;
    nombreDui: string;
    nombreMascota: string;
}

@Component({
    selector: 'nuevo-ticket-dialog',
    templateUrl: 'nuevo-ticket-dialog.html',
  })
  export class NuevoTicketDialog {

    formGroup: FormGroup;
    formReady: boolean = false;
    clientes: client[] = [];
    filteredOptions: Observable<client[]>;
  
    constructor(
      public dialogRef: MatDialogRef<NuevoTicketDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder,
      public alertaService: AlertaService,
      private db: DbService) {

        this.formGroup = this.formBuilder.group({
            clienteDetail: ['', Validators.required],
            fecha: new Date()
         });
        this.PrepareForm();
    }
  
    async PrepareForm(){

        try{

            let response = await this.db.GetAllFrom('cliente'); 
            response.subscribe(res => {
                res.forEach((single: any) => {

                    this.clientes.push({
                        id: single.payload.doc.id,
                        nombreDui: `${single.payload.doc.data().nombre} | ${single.payload.doc.data().dui}`,
                        nombreMascota: `${single.payload.doc.data().nombre} | ${single.payload.doc.data().mascota}`
                    });

                    if(this.clientes.length == 0){

                        this.alertaService
                    .openErrorSnackBar('No existen usuarios para crear ticket');
                        this.dialogRef.close();
                    }else{

                        this.filteredOptions = this.formGroup.get('clienteDetail')
                            .valueChanges.pipe(
                                startWith(''),
                                map(value => this._filter(value)));
                        this.formReady = true;
                    }
                });
            });
        }catch(rej){
            this.alertaService
                .openErrorSnackBar('Ocurrio un error al abrir el formulario');
                this.dialogRef.close();
        }
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    private _filter(value: string): client[]{
        const filterValue = value.toLowerCase();
        return this.clientes
            .filter(option => option.nombreDui.toLowerCase().includes(filterValue));
    }

    sendTicket(): void{
        let cliente = this.clientes
            .filter(c => c.nombreDui == this.formGroup.get('clienteDetail').value);
        
        if(cliente.length == 0){
            this.formGroup.get('clienteDetail')
                .setErrors({clienteInvalido: true});
        }

        if(this.formGroup.valid){
            this.dialogRef.close({
                cliente: cliente[0].id,
                clienteDetail: cliente[0].nombreMascota,
                fecha: this.formGroup.get('fecha').value,
                precioTotal: 0,
                estado: 'Borrador'
            });
        }
    }
  
}

@Component({
    selector: 'modificar-ticket-dialog',
    templateUrl: 'modificar-ticket-dialog.html',
  })
  export class ModificarTicketDialog {

    formGroup: FormGroup;
    formReady: boolean = false;
    clientes: client[] = [];
    filteredOptions: Observable<client[]>;
  
    constructor(
      public dialogRef: MatDialogRef<ModificarTicketDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder,
      public alertaService: AlertaService,
      private db: DbService) {

        this.PrepareForm();
        this.getCustomers();
    }

    PrepareForm(){
        this.formGroup = this.formBuilder.group({
            cliente: this.data.cliente,
            clienteDetail: [this.data.clienteDetail, Validators.required],
            fecha: new Date(this.data.fecha.seconds * 1000)
        });
    }

    async getCustomers(){

        try{

            let response = await this.db.GetAllFrom('cliente'); 
            response.subscribe(res => {
                res.forEach((single: any) => {

                    this.clientes.push({
                        id: single.payload.doc.id,
                        nombreDui: `${single.payload.doc.data().nombre} | ${single.payload.doc.data().dui}`,
                        nombreMascota: `${single.payload.doc.data().nombre} | ${single.payload.doc.data().mascota}`
                    });

                    if(this.clientes.length == 0){

                        this.alertaService
                    .openErrorSnackBar('No existen usuarios para crear ticket');
                        this.dialogRef.close();
                    }else{

                        this.filteredOptions = this.formGroup.get('clienteDetail')
                            .valueChanges.pipe(
                                startWith(''),
                                map(value => this._filter(value)));
                        this.formReady = true;
                    }
                });
            });
        }catch(rej){
            this.alertaService
                .openErrorSnackBar('Ocurrio un error al abrir el formulario');
                this.dialogRef.close();
        }
    }

    private _filter(value: string): client[]{
        const filterValue = value.toLowerCase();
        return this.clientes
            .filter(option => option.nombreDui.toLowerCase().includes(filterValue));
    }

    sendTicket(): void{
        let cliente = this.clientes
            .filter(c => c.nombreDui == this.formGroup.get('clienteDetail').value);
        
        if(cliente.length == 0){
            this.formGroup.get('clienteDetail')
                .setErrors({clienteInvalido: true});
        }

        if(this.formGroup.valid){
            this.dialogRef.close({
                cliente: cliente[0].id,
                clienteDetail: cliente[0].nombreMascota,
                fecha: this.formGroup.get('fecha').value
            });
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
      }

  }

@Component({
selector: 'efectuar-ticket-dialog',
templateUrl: 'efectuar-ticket-dialog.html',
})
  export class EfectuarTicketDialog {

    constructor(public dialogRef: MatDialogRef<EfectuarTicketDialog>){}

    onNoClick(): void {
        this.dialogRef.close();
      }
}