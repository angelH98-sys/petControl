import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AlertaService } from 'src/app/utilidades/alerta.service';
import { DbService } from 'src/app/utilidades/db.service';

class product {
    id: string;
    nombre: string;
    precio: number;
    stock: number;
}

@Component({
    selector: 'nueva-venta-dialog',
    templateUrl: 'nueva-venta-dialog.html',
  })
  export class NuevaVentaDialog {

    formGroup: FormGroup;
    formReady: boolean = false;
    productos: product[] = [];
    filteredOptions: Observable<product[]>;
    quantityMessage: string = "";
  
    constructor(
      public dialogRef: MatDialogRef<NuevaVentaDialog>,
      private formBuilder: FormBuilder,
      public alertaService: AlertaService,
      private db: DbService) {
          
        this.formGroup = this.formBuilder.group({
            productoDetail: ['', Validators.required],
            precio: ['0.00', [Validators.required]],
            cantidad: ['1', [Validators.required, Validators.min(1)]]
        });
        this.PrepareForm();
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    async PrepareForm(){
        try{

            let response = await this.db.GetDocWith('estado', 'Disponible', 'productos');
            if(response.size == 0){
                this.alertaService.openErrorSnackBar('No hay productos disponibles en stock');
                this.dialogRef.close();
            }

            response.docs.forEach(element => {
                this.productos.push({
                    id: element.id,
                    nombre: element.data().nombre,
                    precio: element.data().precio,
                    stock: element.data().stock
                });
            });

            this.filteredOptions = this.formGroup.get('productoDetail')
                .valueChanges.pipe(
                    startWith(''),
                    map(value => this._filter(value)));
            this.formReady = true;
        }catch(rej){

            this.alertaService
                .openErrorSnackBar('Ocurrio un error al abrir el formulario');
            this.dialogRef.close();
        }
    }

    private _filter(value: string): product[]{
        const filterValue = value.toLowerCase();
        return this.productos
            .filter(option => option.nombre.toLowerCase().includes(filterValue));
    }

    setPrecio(){
        
        let nombre = this.formGroup.get('productoDetail').value;
        let producto = this.productos.filter(p => p.nombre == nombre);

        if(producto.length == 0){
            this.formGroup.get('productDetail')
                .setErrors({productoInexistente: true});
            return;
        }
        this.formGroup.get('precio').setValue(producto[0].precio);
        this.quantityMessage = `Stock: ${producto[0].stock} unidad(es)`;
    }

    sendSell(){
        let nombre = this.formGroup.get('productoDetail').value;
        let producto = this.productos.filter(p => p.nombre == nombre);

        if(producto.length == 0){
            this.formGroup.get('productoDetail')
                .setErrors({productoInexistente: true});
            return;
        }

        let cantidad = this.formGroup.get('cantidad').value;
        if(cantidad > producto[0].stock){
            this.formGroup.get('cantidad')
                .setErrors({cantidadInvalida: true});
            return;
        }

        if(this.formGroup.invalid) return false;

        let precioTotal = this.formGroup.get('precio').value * cantidad;

        this.dialogRef.close({
            producto: producto[0].id,
            productDetail: producto[0].nombre,
            cantidad: cantidad,
            precioUnitario: this.formGroup.get('precio').value,
            precioTotal: precioTotal
        });

    }
  
}