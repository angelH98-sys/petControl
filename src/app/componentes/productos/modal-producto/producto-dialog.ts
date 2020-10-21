import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertaService } from 'src/app/utilidades/alerta.service';

@Component({
    selector: 'modificar-producto-dialog',
    templateUrl: 'modificar-producto-dialog.html',
  })
  export class ModificarProductoDialog {

    formGroup: FormGroup;
  
    constructor(
      public dialogRef: MatDialogRef<ModificarProductoDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder,
      public alertaService: AlertaService) {

        this.formGroup = this.formBuilder.group({
            id: this.data.id,
            nombre: [this.data.nombre, Validators.required],
            precio: [this.data.precio, [
                Validators.required,
                Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
            estado: [this.data.estado, Validators.required],
            descripcion: this.data.descripcion
        });
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

  }

  @Component({
    selector: 'aprobar-producto-dialog',
    templateUrl: 'aprobar-producto-dialog.html',
  })
  export class AprobarProductoDialog {

    formGroup: FormGroup;
  
    constructor(
      public dialogRef: MatDialogRef<AprobarProductoDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

  }