import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertaService } from 'src/app/utilidades/alerta.service';
import { DbService } from 'src/app/utilidades/db.service';
import { EliminarVentaDialog, ModificarVentaDialog, NuevaVentaDialog } from '../../ventas/modal-venta/venta-dialog';
import { ModificarTicketDialog } from '../modal-ticket/ticket-dialog';
import { EliminarCitaDialog, ModificarCitaDialog, NuevaCitaDialog } from '../../citas/modal-cita/cita-dialog';
import { Console } from 'console';
@Component({
  selector: 'app-detalle-ticket',
  templateUrl: './detalle-ticket.component.html',
  styleUrls: ['./detalle-ticket.component.css']
})
export class DetalleTicketComponent implements OnInit {

  id: string;

  ticket: any;
  ticketCharged: boolean = false;

  venta: any;
  ventaSource: any;
  ventaCharged: boolean;
  ventaMessage: string;
  ventaColumns: string[];

  cita: any;
  
  citaSource = new MatTableDataSource();
  citaCharged: boolean = false;
  citaMessage: string = "Cargando información";
  citaColumns: string[];

  windowWidth: any;


  constructor(
    private db: DbService,
    private route: ActivatedRoute,
    private router: Router,
    public alertaService: AlertaService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {

    this.windowWidth = window.innerWidth;
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id == undefined){
      this.router.navigate(['/tickets/tabla']);
    }

    this.getTicket();
    this.getVenta();
    this.getCita();
  }

  async getTicket(){
    try{

      await this.db.GetDocWithId(this.id, 'tickets').subscribe(res => {

        if(res.exists){

          let formatedDate = new Date(res.data().fecha.seconds * 1000);
          this.ticket = {
            id: res.id,
            cliente: res.data().cliente,
            clienteDetail: res.data().clienteDetail,
            estado: res.data().estado,
            fecha: res.data().fecha,
            fechaFormated: formatedDate.toLocaleDateString(),
            precioTotal: res.data().precioTotal
          }
          this.ticketCharged = true;
        }else{
          this.alertaService
            .openErrorSnackBar('Ocurrio un error al cargar el ticket')
          this.router.navigate(['/tickets/tabla']);
        }
      });
    }catch(rej){
      this.alertaService
        .openErrorSnackBar('Ocurrio un error al cargar el ticket')
      this.router.navigate(['/tickets/tabla']);
    }
  }

  async getVenta(){
    try{
      this.ventaMessage = "Cargando información";
      this.ventaSource = new MatTableDataSource();
      this.ventaCharged = false;

      let sell = await this.db.GetDocWith('ticket', this.id, 'ventas');

      if(!sell.empty){

        let productsInSell = await this.db.GetSellsFromTicket(sell.docs[0].id);
        productsInSell.subscribe(response => {
          
          if(!response.empty){

            let productos = [];
            response.docs.forEach(p => {
              productos.push({
                docId: p.id,
                cantidad: p.data().cantidad,
                detalle: p.data().detalle,
                precio: p.data().precio,
                id: p.data().id,
                precioTotal: p.data().precioTotal
              });
            });

            this.venta = {
              id: sell.docs[0].id,
              precioTotal: sell.docs[0].data().precioTotal,
              ticket: this.id,
              estado: sell.docs[0].data().estado,
              productos
            }
            
            this.ventaSource = new MatTableDataSource(this.venta.productos);
    
            if(this.venta.estado == "Borrador"){
              this.ventaColumns = ['detalle', 'precio', 'cantidad', 'precioTotal', 'actions'];
            }else{
              this.ventaColumns = ['detalle', 'precio', 'cantidad', 'precioTotal'];
            }
    
          }else{
            this.ventaMessage = "No existen ventas de productos dentro del ticket";
          }

        });

      }else{
        this.ventaMessage = "No existen ventas de productos dentro del ticket";
      }

      this.ventaCharged = true;

    }catch(rej){    
      this.alertaService
          .openErrorSnackBar('Ocurrio un error al cargar las ventas del ticket');
      this.router.navigate(['/tickets/tabla']);
    }

  }

  async getCita(){
    try{

      let response = await this.db.GetDocWith('ticket', this.id, 'citas');

      if(!response.empty){
        this.cita = {
          id: response.docs[0].id,
          estado: response.docs[0].data().estado,
          precioTotal: response.docs[0].data().precioTotal,
          servicios: response.docs[0].data().servicios,
          ticket: response.docs[0].data().ticket,
        }
        this.citaSource = new MatTableDataSource(this.cita.servicios);

        if(this.cita.estado == "Borrador"){
          this.citaColumns = ['detalle', 'precio', 'empleado', 'actions'];
        }else{
          this.citaColumns = ['detalle', 'precio', 'empleado'];
        }
      
      }else{

        this.citaMessage = "No existen citas dentro del ticket";
      }
      this.citaCharged = true;
    }catch(e){

      this.alertaService
        .openErrorSnackBar('Ocurrio un error al cargar las ciatas del ticket');
      this.router.navigate(['/tickets/tabla']);
    }
  }

  async modifyTicket(){
    try{
      let startData = {
        cliente: this.ticket.cliente,
        clienteDetail: this.ticket.clienteDetail,
        fecha: this.ticket.fecha
      }
      const dialogRef = this.dialog.open(ModificarTicketDialog, {
        width: '400px',
        data: startData
      });

      await dialogRef.afterClosed().subscribe(result => {
        if(result != undefined && result != startData){

          this.ticket.cliente = result.cliente,
          this.ticket.clienteDetail = result.clienteDetail,
          this.ticket.fecha = result.fecha;
          this.ticket.fechaFormated = this.ticket.fecha.toLocaleDateString();
          
          this.db.Update(this.ticket.id, {
            cliente: this.ticket.cliente,
            clienteDetail: this.ticket.clienteDetail,
            fecha: this.ticket.fecha
          }, 'tickets').then(() => {

            this.alertaService
              .openSuccessSnackBar('Ticket modificado exitosamente');
          }).catch(() => {

            this.alertaService
              .openErrorSnackBar('Ocurrio un error al actualizar el ticket');
          });
        }
      });

    }catch(rej){

      this.alertaService
        .openErrorSnackBar('Ocurrio un error al abrir el formulario');
    }
  }

  async deleteSell(producto: any){
    try{

      const dialogRef = this.dialog.open(EliminarVentaDialog, {
        width: '400px',
        data: producto.detalle
      });

      await dialogRef.afterClosed().subscribe(result => {
        if(result){

          let index = this.venta.productos.indexOf(producto);

          this.venta.productos.splice(index, 1);
          this.venta.precioTotal -= producto.precioTotal;
          this.ticket.precioTotal -= producto.precioTotal;

          this.db.UpdateSell(
            this.ticket,
            {
              id: this.venta.id,
              precioTotal: this.venta.precioTotal
            },
            undefined,
            producto.docId
          ).then(() => {

            this.alertaService
              .openSuccessSnackBar('Producto eliminado del ticket');
            this.ventaSource = new MatTableDataSource(this.venta.productos);
          }).catch(() => {

            this.alertaService
              .openErrorSnackBar('Ocurrio un error al eliminar el producto del ticket');
          });
        }
      });

    }catch(rej){

      this.alertaService
        .openErrorSnackBar('Ocurrio un error al abrir el formulario');
    }
  }

  /*juan*/
  async deleteAppointment(servicio: any){
    try{

      const dialogRef = this.dialog.open(EliminarCitaDialog, {
        width: '400px',
        data: servicio.detalle
      });

      await dialogRef.afterClosed().subscribe(result => {
        if(result){
          let index = this.cita.servicios.indexOf(servicio);
          this.cita.servicios.splice(index, 1);
          
          this.cita.precioTotal -= servicio.precio;

          this.ticket.precioTotal -= servicio.precio;

          this.db.Update(this.cita.id, {
            servicios: this.cita.servicios,
            precioTotal: this.cita.precioTotal
          }, 'citas').then(() => {

            this.db.Update(this.ticket.id, {
              precioTotal: this.ticket.precioTotal
            }, 'tickets').then(() => {

              this.alertaService.openSuccessSnackBar('Servicio eliminado del ticket');
              this.citaSource = new MatTableDataSource(this.cita.servicios);
              
            }).catch(() => {
              this.alertaService
                .openErrorSnackBar('Ocurrio un error al eliminar el servicio del ticket');
            });
          }).catch(() => {

            this.alertaService
              .openErrorSnackBar('Ocurrio un error al eliminar el servicio del ticket');
          });
        }
      });

    }catch(rej){

      this.alertaService
        .openErrorSnackBar('Ocurrio un error al abrir el formulario');
    }
  }


  async modifySell(producto: any){

    try{
      let startData = {
        cantidad: producto.cantidad,
        detalle: producto.detalle,
        precio: producto.precio,
        id: producto.id,
        precioTotal: producto.precioTotal
      }
      const dialogRef = this.dialog.open(ModificarVentaDialog, {
        width: '400px',
        data: producto
      });

      await dialogRef.afterClosed().subscribe(result => {

        if(result != undefined && result != producto){

          let index = this.venta.productos.indexOf(producto);

          this.venta.precioTotal -= producto.precioTotal;
          this.venta.precioTotal += result.precioTotal;

          let obj = {
            cantidad: result.cantidad,
            detalle: result.detalle,
            precio: result.precio,
            id: result.id,
            precioTotal: result.precioTotal,
            docId: producto.id,
          }

          this.venta.productos[index] = obj;

          this.ticket.precioTotal -= producto.precioTotal;
          this.ticket.precioTotal += result.precioTotal;

          this.db.UpdateSell(
            this.ticket,
            {
              id: this.venta.id,
              precioTotal: this.venta.precioTotal
            },
            result,
            producto.docId
          ).then(() => {
              this.alertaService
                .openSuccessSnackBar('Venta modificada exitosamente');
              this.ventaSource = new MatTableDataSource(this.venta.productos);
          }).catch(() => {
              this.alertaService
                .openErrorSnackBar('Ocurrio un error al modificar la venta');
          });
          
        }
      });
    }catch(rej){

      this.alertaService
        .openErrorSnackBar('Ocurrio un error al abrir el formulario');
    }
  }

  /*JUAN */
 
async modifyAppointment (servicio: any){

  
  try{

    const dialogRef = this.dialog.open(ModificarCitaDialog, {
      width: '400px',
      data: servicio
    });

    await dialogRef.afterClosed().subscribe(result => {
      if(result != undefined && result != servicio){

        let index = this.cita.servicios.indexOf(servicio);

        this.cita.precioTotal -= servicio.precio;
        this.cita.precioTotal += result.precio;
        this.cita.servicios[index] = result;

        this.ticket.precioTotal -= servicio.precio;
        this.ticket.precioTotal += result.precio;

        this.db.Update(this.cita.id, {
            precioTotal: this.cita.precioTotal,
            servicios: this.cita.servicios
        }, 'citas').then(() => {

          this.db.Update(this.ticket.id, {
            precioTotal: this.ticket.precioTotal
          }, 'tickets').then(() => {
            
            this.alertaService
              .openSuccessSnackBar('Cita modificada exitosamente');
            this.citaSource = new MatTableDataSource(this.cita.servicios);
            
          }).catch(() => {

            this.alertaService
              .openErrorSnackBar('Ocurrio un error al actualizar el precio total del ticket');
          })
        }).catch(() => {

          this.alertaService
            .openErrorSnackBar('Ocurrio un error al modificar la cita');
        });
      }
    });
  }catch(rej){

    this.alertaService
      .openErrorSnackBar('Ocurrio un error al abrir el formulario');
  }
}



  async newSell(){
    try{

      const dialogRef = this.dialog.open(NuevaVentaDialog, {
        width: '400px'
      });

      await dialogRef.afterClosed().subscribe(result => {
        if(result != undefined){

          let producto = {
            id: result.producto,
            detalle: result.productDetail,
            precio: result.precioUnitario,
            cantidad: result.cantidad,
            precioTotal: result.precioTotal
          };

          if(this.venta != undefined){

            this.venta.precioTotal += result.precioTotal;
            this.ticket.precioTotal += result.precioTotal;

            this.db.UpdateSell(
              this.ticket,
              {
                id: this.venta.id,
                precioTotal: this.venta.precioTotal
              },
              producto,
              undefined
            ).then(() => {
              this.alertaService
                  .openSuccessSnackBar('Venta registrada exitosamente');
              this.getVenta();
            }).catch((e) => {
              console.log(e);
              this.alertaService
                .openErrorSnackBar('Ocurrio un problema al registrar la venta');
            });
  
          }else{

            this.ticket.precioTotal += result.precioTotal;
            this.db.NewSell(
              this.ticket,
              {
                precioTotal: producto.precioTotal,
                ticket: this.id,
                estado: 'Borrador'
              },
              producto
            ).then(() => {

              this.getVenta();
              this.alertaService
                .openSuccessSnackBar('Venta registrada exitosamente');
            }).catch(() => {
              this.alertaService
                .openErrorSnackBar('Ocurrio un error al registrar venta');
            });
            

            /*this.db.Create({
              productos: productos,
              precioTotal: result.precioTotal,
              ticket: this.id,
              estado: 'Borrador'
            }, 'ventas').then(() => {

              this.ticket.precioTotal += result.precioTotal;
              this.db.Update(this.id, {
                precioTotal: this.ticket.precioTotal
              }, 'tickets').then(() => {
                this.ticket.precioTotal += result.precioTotal;
                this.getVenta();
                this.alertaService
                  .openSuccessSnackBar('Venta registrada exitosamente');
              }).catch((reject) => {
                console.log(reject);
                this.alertaService
                  .openErrorSnackBar('Ocurrio un error al registrar venta');
              });
            }).catch(() => {
              this.alertaService
                .openErrorSnackBar('Ocurrio un error al registrar venta');
            });*/
          }
        }
      });
    }catch(rej){

      this.alertaService
        .openErrorSnackBar('Ocurrio un error al abrir el formulario');
    }
  }

  async newAppointment(){
    try{

      const dialogRef = this.dialog.open(NuevaCitaDialog, {
        width: '400px'
      });

      await dialogRef.afterClosed().subscribe(result => {
        if(result != undefined){
          
          if(this.cita != undefined){
            this.cita.servicios.push({
              id: result.servicio,
              detalle: result.serviciDetail,
              precio: result.precio,
              empleado:result.empleado
             
            });
            this.cita.precioTotal += result.precio;
            this.ticket.precioTotal += result.precio;
          
            this.db.Update(this.cita.id, {
              servicios: this.cita.servicios,
              precioTotal: this.cita.precioTotal
            }, 'citas').then(() => {

              this.citaSource = new MatTableDataSource(this.cita.servicios);

              this.db.Update(this.id,{
                precioTotal: this.ticket.precioTotal
              }, 'tickets').then(() => {
                
                this.alertaService
                  .openSuccessSnackBar('Cita registrada exitosamente');
              }).catch(() => {
                
                this.alertaService
                  .openErrorSnackBar('Ocurrio un problema al registrar la cita');
              });
            }).catch(() => {

              this.alertaService
                .openErrorSnackBar('Ocurrio un problema al registrar la cita');
            });
          }else{
            
            let servicios = [];
            servicios.push({
              id: result.servicio,
              detalle: result.serviciDetail,
              precio: result.precio,
              empleado: result.empleado,
             
            });

            this.db.Create({
              servicios: servicios,
              precioTotal: result.precio,
              ticket: this.id,
              estado: 'Borrador'
            }, 'citas').then(() => {

              this.ticket.precioTotal += result.precio;
              this.db.Update(this.id, {
                precioTotal: this.ticket.precioTotal
              }, 'tickets').then(() => {
                this.ticket.precioTotal += result.precio;
                this.getCita();
                this.alertaService
                  .openSuccessSnackBar('Cita registrada exitosamente');
              }).catch((reject) => {
                console.log(reject);
                this.alertaService
                  .openErrorSnackBar('Ocurrio un error al registrar cita');
              });
            }).catch(() => {
              this.alertaService
                .openErrorSnackBar('Ocurrio un error al registrar cita');
            });
          }
        }
      });
    }catch(rej){

      this.alertaService
        .openErrorSnackBar('Ocurrio un error al abrir el formulario');
    }
  }


  async updateTicket(ticket: any, precioTotal){
    try{

      precioTotal += ticket.precioTotal;
      await this.db.Update(ticket.id, {
        precioTotal: precioTotal
      }, 'tickets');
      this.getTicket();
      this.getVenta();
      this.alertaService.openSuccessSnackBar('Venta registrada exitosamente');

    }catch(rej){
      this.alertaService
        .openErrorSnackBar('Ocurrio un error al actualizar el precio total del ticket');
    }
  }

  applySellFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ventaSource.filter = filterValue.trim().toLowerCase();
  }

  applyAppointmentFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.citaSource.filter = filterValue.trim().toLowerCase();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = window.innerWidth;
  }

}
