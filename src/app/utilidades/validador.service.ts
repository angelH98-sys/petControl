import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadorService {

  constructor() { }

  verificarContrasenias(formGroup: FormGroup){
    let contrasenia: string;
    contrasenia = formGroup.get('contrasenia').value;
    let comprobacion: string;
    comprobacion = formGroup.get('comprobacion').value;

    if(contrasenia.trim().length > 0 && 
        comprobacion.trim().length > 0 &&
        contrasenia != comprobacion){
          formGroup.get('comprobacion')
            .setErrors({contraseniasDiferentes: true});
        }
  }
}
