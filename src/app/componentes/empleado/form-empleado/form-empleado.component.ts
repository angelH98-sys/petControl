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
      telefono:['',Validators.required],
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

}
