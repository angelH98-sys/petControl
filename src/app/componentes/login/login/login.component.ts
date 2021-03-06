import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertaService } from 'src/app/utilidades/alerta.service';
import { DbService } from 'src/app/utilidades/db.service';
import { ValidadorService } from 'src/app/utilidades/validador.service';
import { sha256 } from 'js-sha256';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formlogin:FormGroup;

  constructor(private formBuilder: FormBuilder,
    private validadorService: ValidadorService,
    public alertaService: AlertaService,
    private db: DbService,
    private router: Router) { }

  ngOnInit(): void {
    this.formlogin=this.formBuilder.group({
      id:undefined,
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required],
    })
  }


  formGroupToUser(){
    return {
      
      usuario: this.formlogin.get('usuario').value,
      contrasenia: sha256(this.formlogin.get('contrasenia').value),
    }
  }
  

  async onSubmit(){
    
    if(this.formlogin.invalid) return false;

    let response = await this.db
      .GetDocWith('usuario', this.formlogin.get('usuario').value, 'usuario');

      let response2 = await this.db
      .GetDocWith('contrasenia', sha256(this.formlogin.get('contrasenia').value), 'usuario');

    if(!response.empty&&!response2.empty){//validar que se vaya a otra parte
      this.router.navigate(['tickets/tabla']);
    }else{
      this.alertaService.openErrorSnackBar("La contraseña es incorrecta")
     this.formlogin.reset()
    }
    
  }

  async olvide(){
    this.router.navigate(['login/olvide']);
  }

}

