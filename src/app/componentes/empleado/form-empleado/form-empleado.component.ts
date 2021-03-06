import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertaService } from 'src/app/utilidades/alerta.service';
import { DbService } from 'src/app/utilidades/db.service';
import { ValidadorService } from 'src/app/utilidades/validador.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-empleado',
  templateUrl: './form-empleado.component.html',
  styleUrls: ['./form-empleado.component.css']
})
export class FormEmpleadoComponent implements OnInit {

  formEmpleado:FormGroup;

  constructor(private formBuilder: FormBuilder,
    private validadorService: ValidadorService,
    public alertaService: AlertaService,
    private db: DbService,
    private router: Router) { }

  ngOnInit(): void {
    this.formEmpleado=this.formBuilder.group({
      id:undefined,
      nombre:['',Validators.required],
      telefono:['', [
        Validators.required,
        Validators.pattern(/^\d{4}-\d{4}$/)
      ]],
      correo: ['', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]],
      dui:['', [
        Validators.required,
        Validators.pattern(/^\d{8}-\d{1}$/)
      ]],
      especialidad:['',Validators.required]
    })
  }

  formGroupToEmpleado(){
    return {
      nombre: this.formEmpleado.get('nombre').value,
      telefono: this.formEmpleado.get('telefono').value,
      correo: this.formEmpleado.get('correo').value,
      dui: this.formEmpleado.get('dui').value,
      especialidad:this.formEmpleado.get('especialidad').value,
      estado:"Activo"
    }
  }

  async onSubmit(){
    if(this.formEmpleado.invalid) return false;

    let response = await this.db
      .GetDocWith('telefono', this.formEmpleado.get('telefono').value, 'empleado');
    let response2 = await this.db
      .GetDocWith('correo', this.formEmpleado.get('correo').value, 'empleado');
    let response3 = await this.db
      .GetDocWith('dui', this.formEmpleado.get('dui').value, 'empleado');

    if(!response.empty||!response2.empty||!response3.empty){
      if(!response.empty){
        this.formEmpleado.get('telefono').setErrors({telefonoNoDisponible: true});
      }
      if(!response2.empty){
        this.formEmpleado.get('correo').setErrors({correoNoDisponible: true});
      }
      if(!response3.empty){
        this.formEmpleado.get('dui').setErrors({duiNoDisponible: true}); 
      }   
    }else{
      try{
        await this.db.Create(this.formGroupToEmpleado(), 'empleado');
        this.alertaService.openSuccessSnackBar('Empleado registrado exitosamente');
        this.router.navigate(['empleados/tabla']);
      }catch(rej){
        this.alertaService.openErrorSnackBar('Ups... algo salio mal al registrar el usuario.');
      }
    }
  }
  

}
