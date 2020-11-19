import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertaService } from 'src/app/utilidades/alerta.service';
import { DbService } from 'src/app/utilidades/db.service';
import { NuevaVentaDialog } from '../../ventas/modal-venta/venta-dialog';
import { NuevaCitaDialog } from '../../citas/modal-cita/cita-dialog';
import { EfectuarTicketDialog, NuevoTicketDialog } from '../modal-ticket/ticket-dialog';

@Component({
  selector: 'app-table-ticket',
  templateUrl: './table-ticket.component.html',
  styleUrls: ['./table-ticket.component.css']
})
export class TableTicketComponent implements OnInit {

  form: FormGroup = new FormGroup({
    startDate: new FormControl(new Date(), Validators.required),
    endDate: new FormControl(new Date, Validators.required)
  });

  filterString: string = "";
  panelOpenState = false;

  listaBorrador: any[];
  listaEfectuado: any[];
  listaPagado: any[];

  ticketsCharged: boolean = false;
  message: string;
  windowWidth: any;

  constructor(
    private dialog: MatDialog,
    private db: DbService,
    public alertaService: AlertaService
    ) { }

  ngOnInit(): void {

    let d = new Date();
    this.filterString = `Desde: ${d.toLocaleDateString()} | Hasta: ${d.toLocaleDateString()}`;
    this.windowWidth = window.innerWidth;
    this.getTickets();
  }

  async getTickets(){

    this.message = "Cargando información";
    this.listaBorrador = [];
    this.listaEfectuado = [];
    this.listaPagado = [];

    try{
      let d1 = this.form.get('startDate').value;
      let d2 = this.form.get('endDate').value;

      d1.setHours(0,0,0);
      d2.setHours(23,59,0);

      let response = await this.db
        .GetTicketsFrom(d1, d2);
      
      let formatedDate: Date;
      let ticketObj;
      
      this.listaBorrador = [];
      this.listaEfectuado = [];
      this.listaPagado = [];
      
      response.docs.forEach(element => {

        formatedDate = new Date(element.data().fecha.seconds * 1000);
        ticketObj = {
          id: element.id,
          cliente: element.data().cliente,
          clienteDetail: element.data().clienteDetail,
          estado: element.data().estado,
          fecha: element.data().fecha,
          fechaFormated: formatedDate.toLocaleDateString(),
          precioTotal: element.data().precioTotal
        }

        switch(element.data().estado){
          case 'Borrador':{
            
            this.listaBorrador.push(ticketObj);
            break;
          }
          case 'Efectuado':{

            this.listaEfectuado.push(ticketObj);
            break;
          }
          case 'Pagado':{
            
            this.listaPagado.push(ticketObj);
            break;
          }
        }
      });

      this.ticketsCharged = true;
      this.message = "No se encontraron tickets registrados";
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

  async pagarTicket(ticket){
    try{

      this.db.GetDocWith('ticket', ticket.id, 'ventas').then(res => {

        this.db.PayTicket(ticket.id, res.docs[0].id).then(() => {

          let index = this.listaEfectuado.indexOf(ticket);
          this.listaEfectuado.splice(index, 1);

          ticket.estado = "Pagado";
          this.listaPagado.push(ticket);

          this.alertaService
            .openSuccessSnackBar('Ticket pagado exitosamente');
        }).catch(() => {

          this.alertaService
            .openErrorSnackBar('Error al pagar el ticket');
        });
      }).catch(() => {

        this.alertaService
          .openErrorSnackBar('Error al pagar el ticket');
      });
    }catch(rej){
      
      this.alertaService
        .openErrorSnackBar('Error al pagar el ticket');
    }
  }

  async efectuarTicket(ticket){

    try{

      const dialogRef = this.dialog.open(EfectuarTicketDialog, {
        width: '400px'
      });

      await dialogRef.afterClosed().subscribe(result => {

        if(result){
          this.db.GetDocWith('ticket', ticket.id, 'ventas').then(res => {
            if(!res.empty){

              this.PrepareProductos(res.docs[0].data().productos)
                .then((products: any) => {

                  if(products){
                    
                    this.db.EffectTicket(ticket.id, res.docs[0].id, products)
                      .then(() => {

                        let index = this.listaBorrador.indexOf(ticket);
                        ticket.estado = "Efectuado";
                        this.listaBorrador.splice(index, 1);
                        this.listaEfectuado.push(ticket);
                        
                        this.alertaService
                          .openSuccessSnackBar('Ticket efectuado exitosamente');
                      })
                      .catch(reject => {
                        
                        this.alertaService
                          .openErrorSnackBar('Ocurrio un error al efectuar el ticket');
                      });
                  }else{

                    this.alertaService
                      .openErrorSnackBar('No es posible efectuar el ticket');
                  }
                });
            }
            
          }).catch(() => {

            this.alertaService
              .openErrorSnackBar('Ocurrio un error al acceder a los productos del ticket');
          });

        }
      });
    }catch(rej){

      this.alertaService
        .openErrorSnackBar('Ocurrio un error al abrir el formulario');
    }
  }

  async PrepareProductos(productsInTicket: any){

    try{

      let response = 
        await this.db.GetDocWith('estado', 'Disponible', 'productos');

      if(response.empty) return false;

      let aux, stock, documents = [];
      productsInTicket.forEach(element => {
        
        aux = response.docs.filter(r => r.id == element.id);
        if(aux.length == 0) return false;

        stock = aux[0].data().stock;
        if(stock < element.cantidad) return false;

        stock -= element.cantidad;

        documents.push({
          id: element.id,
          stock: stock
        });
      });

      return documents;
    }catch(rej){
      console.log(rej);
      return false;
    }
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

            let sellObj = {
              productos: productos,
              precioTotal: result.precioTotal,
              ticket: ticket.id,
              estado: 'Borrador'
            }

            ticket.precioTotal += result.precioTotal;
            this.db.NewSell(ticket, sellObj).then(() => {

              this.alertaService
                .openSuccessSnackBar('Venta registrada exitosamente');
            }).catch(reject => {

              ticket.precioTotal -= result.precioTotal;
              this.alertaService
                .openErrorSnackBar('No fue posible registrar la venta');
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

            let precioTotal
              = res.docs[0].data().precioTotal + result.precioTotal;

            let ventaObj = {
              id: res.docs[0].id,
              productos: productos,
              precioTotal: precioTotal
            }

            ticket.precioTotal += result.precioTotal;

            this.db.UpdateSell(ticket, ventaObj).then(() => {

              this.alertaService
                .openSuccessSnackBar('Venta registrada exitosamente');
            }).catch(() => {

              this.alertaService
                .openErrorSnackBar('No fue posible registrar la venta');
              ticket.precioTotal -= result.precioTotal;
            });
            
          }

          }).catch((rej) => {
            this.alertaService
              .openErrorSnackBar('Ocurrio un error al registrar venta');
          });
      
      }
    });
  }

  onSubmit(){
    let d1 = this.form.get('startDate').value;
    let d2 = this.form.get('endDate').value;

    if(d1 > d2){
      this.form.get('endDate').setErrors({
        errorFiltroFechas: true
      });
    }else{
      this.getTickets();
      this.filterString = `Desde: ${d1.toLocaleDateString()} | Hasta: ${d2.toLocaleDateString()}`;
      this.panelOpenState = false;
    }
  }
  async newAppointmentDialog(ticket: any){

    const dialogRef = this.dialog.open(NuevaCitaDialog, {
      width: '400px'
    });

    await dialogRef.afterClosed().subscribe(result => {

      if(result != undefined){

        this.db.GetDocWith('ticket', ticket.id, 'citas').then(res => {

          let servicios = [];
          if(res.empty){

            servicios.push({
              id: result.servicio,
              detalle: result.serviciDetail,
              empleado: result.empleado,
              precio: result.precio
            });

            let servObj = {
              servicios: servicios,
              precioTotal: result.precio,
              ticket: ticket.id,
              estado: 'Borrador'
            }

            ticket.precioTotal += result.precio;
            this.db.NewService(ticket, servObj).then(() => {

              this.alertaService
                .openSuccessSnackBar('Cita registrada exitosamente');
            }).catch(reject => {

              ticket.precioTotal -= result.precio;
              this.alertaService
                .openErrorSnackBar('No fue posible registrar la venta');
            });
          }else{

            servicios = res.docs[0].data().servicios;
            servicios.push({
              id: result.servicio,
              detalle: result.serviciDetail,
              empleado: result.empleado,
              precio: result.precio
            });

            let precioTotal
              = res.docs[0].data().precioTotal + result.precio;

            let citaObj = {
              id: res.docs[0].id,
              servicios: servicios,
              precioTotal: precioTotal
            }

            ticket.precioTotal += result.precio;

            this.db.UpdateServ(ticket, citaObj).then(() => {

              this.alertaService
                .openSuccessSnackBar('Cita registrada exitosamente');
            }).catch(() => {

              this.alertaService
                .openErrorSnackBar('No fue posible registrar la cita');
              ticket.precioTotal -= result.precio;
            });
            
          }

          }).catch((rej) => {
            this.alertaService
              .openErrorSnackBar('Ocurrio un error al registrar cita');
          });
      
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = window.innerWidth;
  }

}

