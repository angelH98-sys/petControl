import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertaService } from 'src/app/utilidades/alerta.service';
import { DbService } from 'src/app/utilidades/db.service';
import { NuevaVentaDialog } from '../../ventas/modal-venta/venta-dialog';
import { NuevoTicketDialog } from '../modal-ticket/ticket-dialog';

@Component({
  selector: 'app-table-ticket',
  templateUrl: './table-ticket.component.html',
  styleUrls: ['./table-ticket.component.css']
})
export class TableTicketComponent implements OnInit {

  ticketList = [];
  ticketsCharged: boolean = false;
  message = "Cargando información";
  windowWidth: any;

  constructor(
    private dialog: MatDialog,
    private db: DbService,
    public alertaService: AlertaService
    ) { }

  ngOnInit(): void {

    this.windowWidth = window.innerWidth;
    this.getTickets();
  }

  async getTickets(){
    try{

      let response = await this.db.GetAllFrom('tickets');
      response.subscribe(res => {

        this.ticketList = [];
        let formatedDate: Date;
        res.forEach((single: any) => {
          
          formatedDate = new Date(single.payload.doc.data().fecha.seconds * 1000);
          this.ticketList.push({
            id: single.payload.doc.id,
            cliente: single.payload.doc.data().cliente,
            clienteDetail: single.payload.doc.data().clienteDetail,
            estado: single.payload.doc.data().estado,
            fecha: single.payload.doc.data().fecha,
            fechaFormated: formatedDate.toLocaleDateString(),
            precioTotal: single.payload.doc.data().precioTotal
          });
        });

        if(this.ticketList.length == 0){

          this.message = "No se encontraron tickets registrados";
        }
        this.ticketsCharged = true;
      });
    }catch(rej){

      this.alertaService
        .openErrorSnackBar('Ocurrio un problema al buscar los tickets');
    }
  }

  async newTicketDialog(){

    const dialogRef = this.dialog.open(NuevoTicketDialog, {
      width: '400px'
    });

    await dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){

        this.db.Create(result, 'tickets').then(() => {
          this.alertaService.openSuccessSnackBar('Ticket creado exitosamente');
          this.getTickets();
        }).catch(() => {
          this.alertaService
            .openErrorSnackBar('Ocurrio un error al crear el ticket');
        });
      }
    });
  }

  async newSellDialog(ticket: any){

    const dialogRef = this.dialog.open(NuevaVentaDialog, {
      width: '400px'
    });

    await dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){

        this.db.GetDocWith('ticket', ticket.id, 'ventas').then(res => {

          let productos = [];
          if(res.empty){

            productos.push({
              id: result.producto,
              detalle: result.productDetail,
              precio: result.precioUnitario,
              cantidad: result.cantidad,
              precioTotal: result.precioTotal
            });
            this.db.Create({
              productos: productos,
              precioTotal: result.precioTotal,
              ticket: ticket.id,
              estado: 'Borrador'
            }, 'ventas').then(() => {

              this.updateTicket(ticket, result.precioTotal);

            }).catch(() => {
              this.alertaService
                .openErrorSnackBar('Ocurrio un error al registrar venta');
            });
          }else{

            productos = res.docs[0].data().productos;
            productos.push({
              id: result.producto,
              detalle: result.productDetail,
              precio: result.precioUnitario,
              cantidad: result.cantidad,
              precioTotal: result.precioTotal
            });
            
            let total = res.docs[0].data().precioTotal + result.precioTotal;
            this.db.Update(res.docs[0].id, {
              productos: productos,
              precioTotal: total
            }, 'ventas').then(() => {

              this.updateTicket(ticket, result.precioTotal);

            }).catch(() => {
              this.alertaService
                .openErrorSnackBar('Ocurrio un error al registrar venta');
            });
          }

          }).catch((rej) => {
            console.log(rej);
            this.alertaService
              .openErrorSnackBar('Ocurrio un error al registrar venta');
          });
      
      }
    });
  }

  async updateTicket(ticket: any, precioTotal){
    try{

      precioTotal += ticket.precioTotal;
      await this.db.Update(ticket.id, {
        precioTotal: precioTotal
      }, 'tickets');
      this.getTickets();
      this.alertaService.openSuccessSnackBar('Venta registrada exitosamente');

    }catch(rej){
      this.alertaService
        .openErrorSnackBar('Ocurrio un error al actualizar el precio total del ticket');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = window.innerWidth;
  }

}
