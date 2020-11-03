import {Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertaService } from 'src/app/utilidades/alerta.service';

@Component({
    selector: 'modificar-usuario-dialog',
    templateUrl: 'modificar-usuario-dialog.html',
  })
  export class ModificarUsuarioDialog {

    formGroup: FormGroup;
  
    constructor(
      public dialogRef: MatDialogRef<ModificarUsuarioDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder,
      public alertaService: AlertaService) {

        this.formGroup = this.formBuilder.group({
            id: this.data.id,
            nombre: [this.data.nombre, Validators.required],
            usuario: [this.data.usuario, Validators.required],
            correo: [this.data.correo, [
                Validators.required,
                Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
            estado: [this.data.estado, Validators.required],
            permiso: [this.data.permiso, Validators.required]
        });
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }

  @Component({
    selector: 'deshabilitar-usuario-dialog',
    templateUrl: 'deshabilitar-usuario-dialog.html',
  })
  export class DeshabilitarUsuarioDialog {
  
    constructor(
      public dialogRef: MatDialogRef<DeshabilitarUsuarioDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }

  @Component({
    selector: 'habilitar-usuario-dialog',
    templateUrl: 'habilitar-usuario-dialog.html',
  })
  export class HabilitarUsuarioDialog {
  
    constructor(
      public dialogRef: MatDialogRef<HabilitarUsuarioDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }