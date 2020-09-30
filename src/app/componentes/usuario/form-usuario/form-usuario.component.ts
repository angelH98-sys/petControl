import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {

  formUsuario: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.formUsuario = this.formBuilder.group({
      id: undefined,
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      contrasenia: ['', Validators.required],
      comprobacion: ['', Validators.required],
      pregunta: ['', Validators.required],  
      respuesta: ['', Validators.required],  
    })
  }

  onSubmit(){
    console.log(this.formUsuario);
  }

}
