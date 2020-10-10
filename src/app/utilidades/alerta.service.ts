import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor(public snackBar: MatSnackBar) { }

  errorInput(input: FormControl) {
    for(let error in input.errors){
      switch(error){
        case "required":{
          return "Campo requerido";
        }
        case "pattern":{
          return "Campo con formáto incorrecto";
        }
        case "contraseniasDiferentes":{
          return "No coinciden las constraseñas";
        }
      }
    }
  }

  openErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['snackbar', 'errorsnackbar']
    });
  }

  openSuccessSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['snackbar', 'successsnackbar']
    });
  }
}
