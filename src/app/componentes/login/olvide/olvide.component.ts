import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertaService } from 'src/app/utilidades/alerta.service';
import { DbService } from 'src/app/utilidades/db.service';
import { ValidadorService } from 'src/app/utilidades/validador.service';
import { sha256 } from 'js-sha256';
import { Router } from '@angular/router';

@Component({
  selector: 'app-olvide',
  templateUrl: './olvide.component.html',
  styleUrls: ['./olvide.component.css']
})
export class OlvideComponent implements OnInit {
  show:boolean=false;
  formolvide:FormGroup;

  constructor(private formBuilder: FormBuilder,
    private validadorService: ValidadorService,
    public alertaService: AlertaService,
    private db: DbService,
    private router: Router) { }

    ngOnInit(): void {
      this.formolvide=this.formBuilder.group({
        id:undefined,
        pregunta: ['', Validators.required],
        respuesta: ['', Validators.required],
      })
    }

    formGroupToUser(){
      return {
        
        pregunta: this.formolvide.get('pregunta').value,
        respuesta: this.formolvide.get('respuesta').value,
      }
    }
    
  

    async onSubmit(){
      if(this,this.formolvide.invalid) return false;

      let response = await this.db
      .GetDocWith('pregunta', this.formolvide.get('pregunta').value, 'usuario');

      let response2 = await this.db
      .GetDocWith('respuesta', sha256(this.formolvide.get('respuesta').value), 'usuario');

      if(!response.empty&&!response2.empty){//validar que se vaya a otra parte
        this.router.navigate(['login/actualizar']);
      }else{
        this.alertaService.openErrorSnackBar("La respuesta no es correcta")
        this.formolvide.reset()
      }
    }

    async ingresa(){
      this.show=true;
    }
}
