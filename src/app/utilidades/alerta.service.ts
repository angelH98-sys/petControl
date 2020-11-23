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
        case "matDatepickerParse": {
          return "Formato de fecha incorrecto";
        }
        case "required":{
          return "Campo requerido";
        }
        case "pattern":{
          return "Campo con formáto incorrecto";
        }
        case "contraseniasDiferentes":{
          return "No coinciden las constraseñas";
        }
        case "usuarioNoDisponible": {
          return "Usuario no disponible";
        }
        case "correoNoDisponible": {
          return "Correo no disponible";
        }
        case "min": {
          return "La cantidad indicada no es válida";
        }
        case "precioInvalido": {
          return "Precio de venta inválido";
        }
        case "productoNoDisponible": {
          return "Nombre de producto no disponible";
        }
        case "telefonoNoDisponible": {
          return "Telefono no disponible";
        }
        case "correoNoDisponible": {
          return "Correo no disponible";
        }
        case "duiNoDisponible": {
          return "DUI no disponible";
        }
        case "clienteInvalido": {
          return "No existe registro del cliente";
        }
        case "productoInexistente": {
          return "No existe registro de este producto";
        }
        case "cantidadInvalida": {
          return "La cantidad excede el stock del producto";
        }
        case "errorFiltroFechas": {
          return "Fecha inválida";
        }
        case "servicioInexistente": {
          return "No existe registro de este servicio";
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
