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

  formolvide:FormGroup;

  constructor(private formBuilder: FormBuilder,
    private validadorService: ValidadorService,
    public alertaService: AlertaService,
    private db: DbService,
    private router: Router) { }

    ngOnInit(): void {
      this.formolvide=this.formBuilder.group({
        id:undefined,
        usuario: ['', Validators.required],
        contrasenia: ['', Validators.required],
      })
    }

    async onSubmit(){
    
      if(this.formolvide.invalid) return false;
  
      let response = await this.db
        .GetDocWith('usuario', this.formolvide.get('usuario').value, 'usuario');
  
        let response2 = await this.db
        .GetDocWith('contrasenia', sha256(this.formolvide.get('contrasenia').value), 'usuario');
  
      if(!response.empty&&!response2.empty){//validar que se vaya a otra parte
        console.log("el usuario se encuentra en la base de datos");
      }else{
        console.log("el usuario no se encuentra en la base de datos")
      }
      
    }

}
