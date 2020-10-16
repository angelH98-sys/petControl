import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertaService } from 'src/app/utilidades/alerta.service';
import { DbService } from 'src/app/utilidades/db.service';
import { ValidadorService } from 'src/app/utilidades/validador.service';
import { sha256 } from 'js-sha256';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {

  formUsuario: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private validadorService: ValidadorService,
              public alertaService: AlertaService,
              private db: DbService,
              private router: Router) { }

  ngOnInit(): void {

    this.formUsuario = this.formBuilder.group({
      id: undefined,
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
      correo: ['', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]],
      contrasenia: ['', Validators.required],
      comprobacion: ['', Validators.required],
      pregunta: ['', Validators.required],  
      respuesta: ['', Validators.required],  
    })
  }

  async onSubmit(){
    
    this.validadorService.verificarContrasenias(this.formUsuario);
    await this.validadorService.usuarioDisponible(this.formUsuario);
    
    if(this.formUsuario.invalid) return false;
    try{
      await this.db.Create(this.formGroupToUser(), 'usuario');
      this.alertaService.openSuccessSnackBar('Usuario registrado exitosamente');
      this.router.navigate(['usuarios/tabla']);
    }catch(rej){
      this.alertaService
        .openErrorSnackBar('Ups... algo salio mal al registrar el usuario.');
    }
  }

  formGroupToUser(){
    return {
      nombre: this.formUsuario.get('nombre').value,
      usuario: this.formUsuario.get('usuario').value,
      correo: this.formUsuario.get('correo').value,
      contrasenia: sha256(this.formUsuario.get('contrasenia').value),
      pregunta: this.formUsuario.get('pregunta').value,
      respuesta: sha256(this.formUsuario.get('respuesta').value),
    }
  }

}
