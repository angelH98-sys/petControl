import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertaService } from 'src/app/utilidades/alerta.service';
import { DbService } from 'src/app/utilidades/db.service';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit {

  form: FormGroup;
  buttonMessage: string = "Registrar producto";

  constructor(
    private formBuilder: FormBuilder,
    public alertaService: AlertaService,
    private db: DbService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: '',
      precioUnitario: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/),
        Validators.min(0.01)]],
      cantidad: ['', [
        Validators.required,
        Validators.min(1)]],
      fecha: new Date(),
      precioVenta: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]]
    })
  }

  async onSubmit() {
    
    if(this.form.get('fecha').value == '')
      this.form.get('fecha').setErrors({required: true});
    if(this.form.get('precioUnitario').value >
        this.form.get('precioVenta').value)
      this.form.get('precioVenta').setErrors({precioInvalido: true});

    let response = await this.db
      .GetDocWith('nombre', this.form.get('nombre').value, 'productos');

    if(!response.empty){
      this.form.get('nombre').setErrors({productoNoDisponible: true});
    }
    
    if(this.form.invalid) return false;
    this.buttonMessage = "Enviando información...";

    try{

      let productoResponse = await this.db.Create({
        nombre: this.form.get('nombre').value,
        descripcion: this.form.get('descripcion').value,
        precio: this.form.get('precioVenta').value,
        stock: 0,
        estado: 'Borrador'
      }, 'productos');

      let total = this.form.get('cantidad').value
        * this.form.get('precioUnitario').value;

      let compraResponse = await this.db.Create({
        producto: productoResponse.id,
        cantidad: this.form.get('cantidad').value,
        precioUnitario: this.form.get('precioUnitario').value,
        precioTotal: total,
        fecha: this.form.get('fecha').value,
        estado: 'Borrador'
      }, 'compras');
      
      this.alertaService.openSuccessSnackBar('Producto registrado exitosamente');
      this.router.navigate(['productos/tabla']);
    }catch(rej){
      this.alertaService
        .openErrorSnackBar('Ups... Ocurrio un error al registrar el producto');
      this.buttonMessage = "Registrar producto";
    }
  }

}
