import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertaService } from 'src/app/utilidades/alerta.service';
import { DbService } from 'src/app/utilidades/db.service';
import { ValidadorService } from 'src/app/utilidades/validador.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  formServicios: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private validadorService: ValidadorService,
              public alertaService: AlertaService,
              private db: DbService,
              private router: Router) { }

  ngOnInit(): void {

    this.formServicios = this.formBuilder.group({
      id: undefined,
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      duracion: ['', Validators.required],
      precio: ['', Validators.required],
      empleado: ['', Validators.required],    
      estado:['Disponible', Validators.required],
    })
  }

  async onSubmit(){
    
    if(this.formServicios.invalid) return false;
    try{
      await this.db.Create(this.formGroupToUser(), 'servicio');
      this.alertaService.openSuccessSnackBar('servicio registrado exitosamente');
      this.router.navigate(['servicio/tabla']);
    }catch(rej){
      this.alertaService
        .openErrorSnackBar('Ups... algo salio mal al registrar el servicio.');
    }
  }

  formGroupToUser(){
    return {
      nombre: this.formServicios.get('nombre').value,
      descripcion: this.formServicios.get('descripcion').value,
      duracion: this.formServicios.get('duracion').value,
      precio: (this.formServicios.get('precio').value),
      empleado: this.formServicios.get('empleado').value,
      estado1: this.formServicios.get('estado1').value,
    }
  }

}
