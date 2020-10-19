import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertaService } from 'src/app/utilidades/alerta.service';
import { CompraService } from 'src/app/utilidades/compra.service';
import { DbService } from 'src/app/utilidades/db.service';
import { NuevaCompraDialog } from '../../compras/modal-compra/compra-dialog';
import { AprobarProductoDialog, ModificarProductoDialog } from '../modal-producto/producto-dialog';

@Component({
  selector: 'app-table-producto',
  templateUrl: './table-producto.component.html',
  styleUrls: ['./table-producto.component.css']
})
export class TableProductoComponent implements OnInit {

  dataSource = new MatTableDataSource();
  message = "Cargando información";
  tableCharged = false;
  windowWidth: any;

  constructor(
    private db: DbService,
    private dbCompras: CompraService,
    public alertaService: AlertaService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.windowWidth = window.innerWidth;
    this.getProductos();
  }

  async getProductos(){

    try{

      let response = await this.db.GetAllFrom('productos');
      response.subscribe(res => {
        let list = [];
        res.forEach((single: any) => {
          list.push({
            id: single.payload.doc.id,
            nombre: single.payload.doc.data().nombre,
            precio: single.payload.doc.data().precio, 
            stock: single.payload.doc.data().stock, 
            estado: single.payload.doc.data().estado,
            descripcion: single.payload.doc.data().descripcion
          });
        });
        if(list.length > 0){
          this.dataSource= new MatTableDataSource(list);
        }else{
          this.message = "No se encontraron productos registrados";
        }
        this.tableCharged = true;
      })
    }catch(rej){
      this.alertaService.openErrorSnackBar('Error al cargar los productos');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async modifyDialog(producto: any){
    const dialogRef = this.dialog.open(ModificarProductoDialog, {
      data: producto
    });

    await dialogRef.afterClosed().subscribe(result => {
      if(result != undefined && result != producto){
        try{
          if(producto.estado == "Agotado" || producto.estado == "Borrador"){
            this.db.Update(result.id, {
              nombre: result.nombre,
              precio: result.precio,
              descripcion: result.descripcion,
            }, 'productos');
          }else if(result.estado == "Disponible" ||
            result.estado == "Deshabilitado"){

              this.db.Update(result.id, {
                nombre: result.nombre,
                precio: result.precio,
                descripcion: result.descripcion,
                estado: result.estado
              }, 'productos');
          }else{
            this.alertaService
              .openErrorSnackBar('No fue posible modificar el producto');
            return false;
          }
          
          
          this.getProductos();
          this.alertaService
            .openSuccessSnackBar('Producto modificado exitosamente');
        }catch(rej){

          this.alertaService
            .openErrorSnackBar('No fue posible modificar el producto');
        }
      }
    });
  }

  async aprobarProducto(producto: any){
    try{

      const dialogRef = this.dialog.open(AprobarProductoDialog, {
        width: '500px',
        data: producto.nombre
      });

      await dialogRef.afterClosed().subscribe(result => {

        if(result){
          this.db.Update(producto.id, {
            estado: 'Agotado'
          }, 'productos');
    
          this.db.GetDocWith('producto', producto.id, 'compras').then(res => {
            this.db.Update(res.docs[0].id, {
              'estado': 'En cola'
            }, 'compras');
      
            this.alertaService.openSuccessSnackBar('Producto aprobado exitosamente');
            this.getProductos();
          })
        }
      })
    }catch(rej){
      this.alertaService.openErrorSnackBar('Ocurrio un error al aprobar el producto');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = window.innerWidth;
  }

}
