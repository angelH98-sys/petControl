import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor() { }

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

}
