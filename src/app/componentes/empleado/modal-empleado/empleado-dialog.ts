import {Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertaService } from 'src/app/utilidades/alerta.service';

@Component({
    selector: 'modificar-empleado-dialog',
    templateUrl: 'modificar-empleado-dialog.html',
  })
  export class ModificarEmpleadoDialog {

    formGroup: FormGroup;
  
    constructor(
      public dialogRef: MatDialogRef<ModificarEmpleadoDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder,
      public alertaService: AlertaService) {

        this.formGroup = this.formBuilder.group({
            id: this.data.id,
            nombre: [this.data.nombre, Validators.required],
            telefono: [this.data.telefono, Validators.required],
            correo: [this.data.correo, [
                Validators.required,
                Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
            dui:[this.data.dui, Validators.required],
            especialidad:[this.data.especialidad, Validators.required],
        });
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }

  