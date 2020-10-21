import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertaService } from 'src/app/utilidades/alerta.service';
import { DbService } from 'src/app/utilidades/db.service';
import { ValidadorService } from 'src/app/utilidades/validador.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.css']
})
export class MascotaComponent implements OnInit {
  formmascotas: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private validadorService: ValidadorService,
    public alertaService: AlertaService,
    private db: DbService,
    private router: Router) { }

  ngOnInit(): void {
    this.formmascotas = this.formBuilder.group({
      id: undefined,
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      raza:['', Validators.required],
      fecha: ['', Validators.required],
      peso: ['', Validators.required],
      pedigree: ['', Validators.required],  
    })
  }
  async onSubmit(){
    if(this.formmascotas.invalid) return false;
    try{
      await this.db.Create(this.formGroupToUser(), 'nombre');
      this.alertaService.openSuccessSnackBar('mascota registrada exitosamente');
      this.router.navigate(['mascota/tabla']);
    }catch(rej){
      this.alertaService
        .openErrorSnackBar('Ups... algo salio mal al registrar la mascota.');
    }
  }
  formGroupToUser(){
    return {
      nombre: this.formmascotas.get('nombre').value,
      tipo: this.formmascotas.get('tipo').value,
      raza: this.formmascotas.get('raza').value,
      fecha:(this.formmascotas.get('fecha').value),
      peso: this.formmascotas.get('peso').value,
      pedigree:(this.formmascotas.get('pedigree').value),
    }
  }

}
