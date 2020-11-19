import {Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertaService } from 'src/app/utilidades/alerta.service';

@Component({
    selector: 'modificar-servicios-dialog',
    templateUrl: 'modificar-servicios-dialog.html',
  })
  export class ModificarServiciosDialog {

    formGroup: FormGroup;
  
    constructor(
      public dialogRef: MatDialogRef<ModificarServiciosDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder,
      public alertaService: AlertaService) {

        this.formGroup = this.formBuilder.group({
            id: this.data.id,
            nombre: [this.data.nombre, Validators.required],
            descripcion: [this.data.descripcion, Validators.required],
            duracion: [this.data.duracion, Validators.required],
            precio: [this.data.precio, Validators.required],
            empleado: [this.data.empleado, Validators.required],
            estado1: [this.data.estado1, Validators.required],
        });
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }

  @Component({
    selector: 'eliminar-servicios-dialog',
    templateUrl: 'eliminar-servicios-dialog.html',
  })
  export class EliminarServiciosDialog {
  
    constructor(
      public dialogRef: MatDialogRef<ModificarServiciosDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }