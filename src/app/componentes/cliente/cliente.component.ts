import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertaService } from 'src/app/utilidades/alerta.service';
import { DbService } from 'src/app/utilidades/db.service';
import { ValidadorService } from 'src/app/utilidades/validador.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  formcliente: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private validadorService: ValidadorService,
    public alertaService: AlertaService,
    private db: DbService,
    private router: Router) { }

  ngOnInit(): void {
    this.formcliente = this.formBuilder.group({
      id: undefined,
      nombre: ['', Validators.required],
      telefono: ['',[
       Validators.required,
       Validators.pattern(/^\d{4}-\d{4}$/)
    ]],
      correo: ['', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]],
      direccion: ['', Validators.required],
      mascota: ['', Validators.required],  
      dui: ['', [
        Validators.required,
        Validators.pattern(/^\d{8}-\d{1}$/)
     ]],  
        
    })
  }
  formGroupToUser(){
    return {
      nombre: this.formcliente.get('nombre').value,
      telefono: this.formcliente.get('telefono').value,
      correo: this.formcliente.get('correo').value,
      direccion: (this.formcliente.get('direccion').value),
      mascota: this.formcliente.get('mascota').value,
      dui: this.formcliente.get('dui').value,
     
    }
  }
  async onSubmit(){
    this.validadorService.verificarContrasenias(this.formcliente);
    if(this.formcliente.invalid) return false;
    try{
      await this.db.Create(this.formGroupToUser(), 'cliente');
      this.alertaService.openSuccessSnackBar('cliente registrado exitosamente');
      this.router.navigate(['cliente/tabla']);
    }catch(rej){
      this.alertaService
        .openErrorSnackBar('Ups... algo salio mal al registrar el cliente.');
    }
  }

}
