import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AlertaService } from 'src/app/utilidades/alerta.service';
import { DbService } from 'src/app/utilidades/db.service';

class servic {
    id: string;
    nombre: string;
    empleado: string;
    precio: number;
}

@Component({
    selector: 'nueva-cita-dialog',
    templateUrl: 'nueva-cita-dialog.html',
  })
  export class NuevaCitaDialog {

    formGroup: FormGroup;
    formReady: boolean = false;
    servicios: servic[] = [];
    filteredOptions: Observable<servic[]>;
    quantityMessage: string = "";
  
    constructor(
      public dialogRef: MatDialogRef<NuevaCitaDialog>,
      private formBuilder: FormBuilder,
      public alertaService: AlertaService,
      private db: DbService) {
          
        this.formGroup = this.formBuilder.group({
            servicioDetail: ['', Validators.required],     
            precio: ['0.00', [
                Validators.required,
                Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/),
                Validators.min(0.01)]],
                empleado: ['', Validators.required],
               
        });
        this.PrepareForm();
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    async PrepareForm(){
        try{

            let response = await this.db.GetDocWith('estado', 'Disponible', 'servicio');
            if(response.size == 0){
                this.alertaService.openErrorSnackBar('No hay servicios disponibles');
                this.dialogRef.close();
            }

            response.docs.forEach(element => {
                this.servicios.push({
                    id: element.id,
                    nombre: element.data().nombre,
                    precio: element.data().precio,
                    empleado: element.data().empleado
                });
            });

            this.filteredOptions = this.formGroup.get('servicioDetail')
                .valueChanges.pipe(
                    startWith(''),
                    map(value => this._filter(value)));
            this.formReady = true;
        }catch(rej){

            this.alertaService
                .openErrorSnackBar('Ocurrio un error al abrir el formulario');
            this.dialogRef.close();
        }
    }

    private _filter(value: string): servic[]{
        const filterValue = value.toLowerCase();
        return this.servicios
            .filter(option => option.nombre.toLowerCase().includes(filterValue));
    }

    setPrecios(){
        
        let nombre = this.formGroup.get('servicioDetail').value;
        let servicio = this.servicios.filter(p => p.nombre == nombre);

        if(servicio.length == 0){
            this.formGroup.get('servicioDetail')
                .setErrors({servicioInexistente: true});
            return;
        }
        this.formGroup.get('precio').setValue(servicio[0].precio);
        this.formGroup.get('empleado').setValue(servicio[0].empleado);
    }

    sendAppointment(){
        let nombre = this.formGroup.get('servicioDetail').value;
        let servicio = this.servicios.filter(p => p.nombre == nombre);

        if(servicio.length == 0){
            this.formGroup.get('servicioDetail')
                .setErrors({servicioInexistente: true});
            return;
        }
        
        if(this.formGroup.invalid) return false;

        let precioTotal = this.formGroup.get('precio').value;

        this.dialogRef.close({
            servicio: servicio[0].id,
            serviciDetail: servicio[0].nombre,
            precio: this.formGroup.get('precio').value,
            empleado: servicio[0].empleado,
            precioTotal: precioTotal
        });

    }
  
}

@Component({
    selector: 'modificar-cita-dialog',
    templateUrl: 'modificar-cita-dialog.html',
  })
  export class ModificarCitaDialog {

    formReady: boolean = false;
    servicios: servic[] = [];
    filteredOptions: Observable<servic[]>;
    formGroup: FormGroup;
    quantityMessage: string = "";

    constructor(
        public dialogRef: MatDialogRef<ModificarCitaDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        public alertaService: AlertaService,
        private db: DbService) {

        this.PrepareForm();
        this.getServics();
    }
    
    PrepareForm(){

        this.formGroup = this.formBuilder.group({
            detalle: [this.data.detalle, Validators.required],
            empleado: [this.data.empleado, Validators.required],
            id: this.data.id,
            precio: [this.data.precio, [
                Validators.required,
                Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/),
                Validators.min(0.01)]]
        });

    }

    async getServics(){
        try{

            let response = await this.db.GetDocWith('estado1', 'Disponible', 'servicio');

            response.docs.forEach(element => {
                this.servicios.push({
                    id: element.id,
                    nombre: element.data().nombre,
                    precio: element.data().precio,
                    empleado: element.data().empleado
                });
            });

            this.filteredOptions = this.formGroup.get('detalle')
                .valueChanges.pipe(
                    startWith(''),
                    map(value => this._filter(value)));
            this.formReady = true;
        }catch(rej){

            this.alertaService
                .openErrorSnackBar('Ocurrio un error al abrir el formulario');
            this.dialogRef.close();
        }
    }

    private _filter(value: string): servic[]{
        const filterValue = value.toLowerCase();
        return this.servicios
            .filter(option => option.nombre.toLowerCase().includes(filterValue));
    }

    setPrecios(){
        
        let nombre = this.formGroup.get('detalle').value;
        let servicio = this.servicios.filter(p => p.nombre == nombre);

        if(servicio.length == 0){
            this.formGroup.get('detalle')
                .setErrors({servicioInexistente: true});
            return;
        }
        
        this.formGroup.get('precio').setValue(servicio[0].precio);
        this.formGroup.get('empleado').setValue(servicio[0].empleado);
        
        
    }

    sendSelll(){
        let nombre = this.formGroup.get('detalle').value;
        let servicio = this.servicios.filter(p => p.nombre == nombre);

        if(servicio.length == 0){
            this.formGroup.get('detalle')
                .setErrors({servicioInexistente: true});
            return;
        }
/*
        let cantidad = this.formGroup.get('cantidad').value;
        if(cantidad > producto[0].stock){
            this.formGroup.get('cantidad')
                .setErrors({cantidadInvalida: true});
            return;
        }
*/
        if(this.formGroup.invalid) return false;

        let precioTotal = this.formGroup.get('precio').value;

        this.dialogRef.close({
            id: servicio[0].id,
            detalle: servicio[0].nombre,
            empleado: servicio[0].empleado,
            precio: this.formGroup.get('precio').value,
            precioTotal: precioTotal
        });

    }

    onNoClick(): void {
        this.dialogRef.close();
      }

}

@Component({
    selector: 'eliminar-cita-dialog',
    templateUrl: 'eliminar-cita-dialog.html',
  })
  export class EliminarCitaDialog {

    constructor(
        public dialogRef: MatDialogRef<EliminarCitaDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
  }