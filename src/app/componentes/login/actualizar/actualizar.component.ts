import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertaService } from 'src/app/utilidades/alerta.service';
import { DbService } from 'src/app/utilidades/db.service';
import { ValidadorService } from 'src/app/utilidades/validador.service';
import { sha256 } from 'js-sha256';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

  formactualizar:FormGroup;

  constructor(private formBuilder: FormBuilder,
    private validadorService: ValidadorService,
    public alertaService: AlertaService,
    private db: DbService,
    private router: Router) { }

    ngOnInit(): void {
      this.formactualizar=this.formBuilder.group({
        id:undefined,
        usuario: ['', Validators.required],
        contrasenia: ['', Validators.required],
        confirmarContrasenia: ['', Validators.required],
      })
    }

    formGroupToUser(){
      return {
        usuario: this.formactualizar.get('usuario').value,
        contrasenia: sha256(this.formactualizar.get('contrasenia').value),
        confirmarContrasenia: sha256(this.formactualizar.get('contrasenia').value),
      }
    }

  async onSubmit(){
    
    //this.router.navigate(['login']);
    let response = await this.db
      .GetDocWith('usuario', this.formactualizar.get('usuario').value, 'usuario');
    
    try{
      if(!response.empty){
        this.db.Update(response.docs[0].id, {
          contrasenia:sha256(this.formactualizar.get('contrasenia').value),
        }, 'usuario');
        alert(this.formactualizar.get('contrasenia').value);
      }else{
        alert("No existe un usuario llamado asi")
      }
    }catch(rej){
      this.alertaService
            .openErrorSnackBar('Ups... Ocurrio un error al modificar el usuario');
    }
    
    
  }


}
