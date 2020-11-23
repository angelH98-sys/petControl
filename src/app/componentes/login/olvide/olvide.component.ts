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
  show2:boolean=false;
  esconder:boolean=true;
  hide:boolean=true;
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
        pregunta: ['', Validators.required],
        respuesta: ['', Validators.required],
        contrasenia: ['', Validators.required],
        confirmarContrasenia: ['', Validators.required],
      })
    }

    formGroupToUser(){
      return {
        usuario: this.formolvide.get('usuario').value,
        pregunta: this.formolvide.get('pregunta').value,
        respuesta: this.formolvide.get('respuesta').value,
        contrasenia: sha256(this.formolvide.get('contrasenia').value),
        confirmarContrasenia: sha256(this.formolvide.get('contrasenia').value),
      }
    }
    
  

    async onSubmit(){
      

      let response = await this.db
      .GetDocWith('pregunta', this.formolvide.get('pregunta').value, 'usuario');

      let response2 = await this.db
      .GetDocWith('respuesta', sha256(this.formolvide.get('respuesta').value), 'usuario');

      if(!response.empty&&!response2.empty){//validar que se vaya a otra parte
        //this.router.navigate(['login/actualizar']);
       
        this.show2=true;
        this.esconder=false;
      }else{
        this.alertaService.openErrorSnackBar("La respuesta no es correcta")
        this.formolvide.controls["respuesta"].reset();
      }
    }

    async onSubmit2(){
    
    
      let response = await this.db
        .GetDocWith('usuario', this.formolvide.get('usuario').value, 'usuario');
      
      try{
        if(!response.empty){
          this.db.Update(response.docs[0].id, {
            contrasenia:sha256(this.formolvide.get('contrasenia').value),
          }, 'usuario');
          
          this.alertaService
              .openSuccessSnackBar('Contrseña modificada exitosamente');
              this.router.navigate(['login']);
        }else{
          this.alertaService
              .openErrorSnackBar('No existe ningun usuario con ese nombre');
        }
      }catch(rej){
        this.alertaService
              .openErrorSnackBar('Ups... Ocurrio un error al modificar el usuario');
      }
      
      
    }

    async ingresa(){

      //revision de el usuario
      let response = await this.db
      .GetDocWith('usuario', this.formolvide.get('usuario').value, 'usuario');
      if(!response.empty){
        //ingresar al input la pregunta de seguridad de el usuario
        this.show=true;
        this.hide=false;
        this.formolvide.controls["pregunta"].disable()

        this.formolvide.get('pregunta').setValue(response.docs[0].data().pregunta);
        
        
      }else{
        this.alertaService.openErrorSnackBar("El usuario no existe")
        

      }



      
    }
    

}
