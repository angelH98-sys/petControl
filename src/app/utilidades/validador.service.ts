import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertaService } from './alerta.service';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class ValidadorService {

  constructor(private db: DbService) { }

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

  async usuarioDisponible(form: FormGroup){
    let usuario = form.get('usuario').value;
    let correo = form.get('correo').value;

    let response = await this.db
      .GetDocWith('usuario', usuario, 'usuario');
    if(!response.empty){
      form.get('usuario').setErrors({usuarioNoDisponible: true});
      return false;
    }
    response = await this.db
      .GetDocWith('correo', correo, 'usuario');
    if(!response.empty){
      form.get('correo').setErrors({correoNoDisponible: true});
    }
    
  }
}
