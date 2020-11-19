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
        contrasenia: ['', Validators.required],
        confirmarContrasenia: ['', Validators.required],
      })
    }

    formGroupToUser(){
      return {
        
        contrasenia: this.formactualizar.get('usuario').value,
        confirmarContrasenia: sha256(this.formactualizar.get('contrasenia').value),
      }
    }

  async onSubmit(){
    
    this.router.navigate(['login']);
    
  }


}
