import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertaService } from 'src/app/utilidades/alerta.service';

@Component({
    selector: 'nueva-compra-dialog',
    templateUrl: 'nueva-compra-dialog.html',
  })
  export class NuevaCompraDialog {

    formGroup: FormGroup;
    producto: string;
  
    constructor(
      public dialogRef: MatDialogRef<NuevaCompraDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder,
      public alertaService: AlertaService) {
        this.producto = this.data.nombre;
        this.formGroup = this.formBuilder.group({
            producto: this.data.producto,
            precioUnitario: [this.data.precioUnitario.toFixed(2), [
              Validators.required,
              Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/),
              Validators.min(0.01)]],
            cantidad: [this.data.cantidad, [
              Validators.required,
              Validators.min(1)
            ]],
            fecha: new Date()
        });
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }

  @Component({
    selector: 'aprobar-compra-dialog',
    templateUrl: 'aprobar-compra-dialog.html',
  })
  export class AprobarCompraDialog {
  
    constructor(
      public dialogRef: MatDialogRef<AprobarCompraDialog>) {
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

  }

  @Component({
    selector: 'modificar-compra-dialog',
    templateUrl: 'modificar-compra-dialog.html',
  })
  export class ModificarCompraDialog {

    formGroup: FormGroup;
  
    constructor(
      public dialogRef: MatDialogRef<NuevaCompraDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder,
      public alertaService: AlertaService) {
        
        this.formGroup = this.formBuilder.group({
            id: this.data.id,
            precioUnitario: [parseFloat(this.data.precioUnitario.toFixed(2)), [
              Validators.required,
              Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/),
              Validators.min(0.01)]],
            cantidad: [this.data.cantidad, [
              Validators.required,
              Validators.min(1)
            ]],
            precioTotal: this.data.precioTotal,
            fecha: this.data.fecha,
            fechaTimeStamp: new Date(this.data.fechaTimeStamp.seconds * 1000),
            estado: this.data.estado
        });
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }

  @Component({
    selector: 'cancelar-compra-dialog',
    templateUrl: 'cancelar-compra-dialog.html',
  })
  export class CancelarCompraDialog {
  
    constructor(
      public dialogRef: MatDialogRef<CancelarCompraDialog>) {
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

  }