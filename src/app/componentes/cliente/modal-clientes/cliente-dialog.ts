import {Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertaService } from 'src/app/utilidades/alerta.service';

@Component({
    selector: 'modificar-cliente-dialog',
    templateUrl: 'modificar-cliente-dialog.html',
  })
  export class ModificarClienteDialog {

    formGroup: FormGroup;
  
    constructor(
      public dialogRef: MatDialogRef<ModificarClienteDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder,
      public alertaService: AlertaService) {

        this.formGroup = this.formBuilder.group({
            id: this.data.id,
      nombre: [ this.data.nombre, Validators.required],
      telefono: [ this.data.telefono,[
       Validators.required,
       Validators.pattern(/^\d{4}-\d{4}$/)
    ]],
      correo: [ this.data.correo, [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]],
      direccion: [this.data.direccion , Validators.required],
      dui: [ this.data.dui, [
        Validators.required,
        Validators.pattern(/^\d{8}-\d{1}$/)
     ]],  
     mascota: [ this.data.mascota, Validators.required],  
        
    });

    }
    onNoClick(): void {
        this.dialogRef.close();
    }

  }
@Component({
    selector: 'eliminar-cliente-dialog',
    templateUrl: 'eliminar-cliente-dialog.html',
  })
  export class EliminarClienteDialog {
  
    constructor(
      public dialogRef: MatDialogRef<ModificarClienteDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
}



