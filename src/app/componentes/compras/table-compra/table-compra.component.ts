import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertaService } from 'src/app/utilidades/alerta.service';
import { CompraService } from 'src/app/utilidades/compra.service';
import { DbService } from 'src/app/utilidades/db.service';
import { AprobarCompraDialog, CancelarCompraDialog, ModificarCompraDialog, NuevaCompraDialog } from '../modal-compra/compra-dialog';

@Component({
  selector: 'app-table-compra',
  templateUrl: './table-compra.component.html',
  styleUrls: ['./table-compra.component.css']
})
export class TableCompraComponent implements OnInit {

  dataSource = new MatTableDataSource();
  message = "Cargando información";
  tableCharged = false;
  windowWidth: any;
  id: string;
  producto: string;

  constructor(
    private db: DbService,
    private alertaService: AlertaService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private dbCompras: CompraService) { }

  ngOnInit(): void {

    this.windowWidth = window.innerWidth;
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id == undefined){
      this.router.navigate(['/productos/tabla']);
    }
    this.getProducto();
    this.getCompras();
  }

  async aprobarCompra(compra: any){
    try{
      const dialogRef = this.dialog.open(AprobarCompraDialog, {
        width: '250px'
      });

      await dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.db.Update(compra.id, {
            estado: 'Efectuada'
          }, 'compras');
          let producto = this.db.GetDocWithId(this.id, 'productos');
          producto.subscribe(res => {
            let qty = res.data().stock + compra.cantidad;
            this.db.Update(this.id, {
              stock: qty,
              estado: 'Disponible'
            }, 'productos').then(() => {
              this.alertaService.openSuccessSnackBar('Compra efectuada exitosamente');
              this.getCompras();
            })
          })
        }
      });
    }catch(rej){
      this.alertaService.openErrorSnackBar('Ocurrio un error al intentar efecutar la compra');
    }
  }

  async cancelarCompra(compra: any){
    try{
      const dialogRef = this.dialog.open(CancelarCompraDialog, {
        width: '250px'
      });

      await dialogRef.afterClosed().subscribe(result => {
        if(result){

          this.db.Update(compra.id, {estado: 'Cancelado'}, 'compras').then(() => {
            this.alertaService.openSuccessSnackBar('Compra cancelada exitosamente');
            this.getCompras();
          });
        }
      });
    }catch(rej){

      this.alertaService.openErrorSnackBar('Ocurrio un error al cancelar la compra');
    }
  }
  
  async getCompras(){
    try{
      let response = await this.db.GetDocWith('producto', this.id, 'compras');
      if(response.size == 0){
        this.alertaService
          .openErrorSnackBar('El producto no contiene ninguna compra');
        this.router.navigate(['/productos/tabla']);
        return false;
      }
      let list = [];
      let fecha: Date;
      response.docs.forEach(element => {
        fecha = new Date(element.data().fecha.seconds * 1000);
        list.push({
          id: element.id,
          precioUnitario: element.data().precioUnitario,
          cantidad: element.data().cantidad,
          precioTotal: element.data().precioTotal,
          fecha: fecha.toLocaleDateString(),
          fechaTimeStamp: element.data().fecha,
          estado: element.data().estado
        });
      });
      this.dataSource = new MatTableDataSource(list);
      this.tableCharged = true;
    }catch(rej){
      this.alertaService
      .openErrorSnackBar('Ocurrio un problema al buscar las compras del producto');
      this.router.navigate(['/productos/tabla']);
    }
  }

  async modifyCompra(compra: any){
    try{

      const dialogRef = this.dialog.open(ModificarCompraDialog, {
        width: '250px',
        data: compra
      });

      await dialogRef.afterClosed().subscribe(result => {

         if(result != undefined && result != compra){
           let total = result.precioUnitario * result.cantidad;
           this.db.Update(compra.id, {
             precioUnitario: result.precioUnitario,
             cantidad: result.cantidad,
             precioTotal: total,
             fecha: result.fechaTimeStamp
           }, 'compras').then(() => {
             this.alertaService
              .openSuccessSnackBar('Compra actualizada exitosamente');
             this.getCompras();
           });
         }
      });
    }catch(rej){
      this.alertaService
        .openErrorSnackBar('Ocurrio un error al modificar la compra');
    }
  }

  async getProducto(){
    try{
      await this.db.GetDocWithId(this.id, 'productos').subscribe(res => {
        if(!res.exists){
          this.alertaService
            .openErrorSnackBar('No existe el producto seleccionado');
          this.router.navigate(['/productos/tabla']);
        }
        this.producto = res.data().nombre;
      })
    }catch(rej){
      this.alertaService
        .openErrorSnackBar('Ocurrio un error con el producto seleccionado');
        this.router.navigate(['/productos/tabla']);
    }
  }

  async newCompra(){

    try{
      let response = await this.dbCompras.getComprasOrderByFecha(this.id);
      let lastCompra = response.docs[0].data();
      let startData = {
        nombre: this.producto,
        producto: this.id,
        precioUnitario: lastCompra.precioUnitario,
        cantidad: lastCompra.cantidad
      }
      const dialogRef = this.dialog.open(NuevaCompraDialog, {
        width: '250px',
        data: startData
      });

      await dialogRef.afterClosed().subscribe(result => {
        if(result != undefined){

          let precioTotal = result.precioUnitario * result.cantidad;
          this.db.Create({
            producto: result.producto,
            precioUnitario: result.precioUnitario,
            cantidad: result.cantidad,
            precioTotal,
            fecha: result.fecha,
            estado: 'En cola'
          }, 'compras');
          this.alertaService.openSuccessSnackBar('Compra registrada exitosamente');
          this.getCompras();
        }
      });
    }catch(rej){
      
      this.alertaService
        .openErrorSnackBar('Ocurrio un problema al registrar la compra');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = window.innerWidth;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
